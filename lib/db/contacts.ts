import { sql } from "../db"

export type Contact = {
  id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  created_at: string
  updated_at: string
}

export type ContactMessage = {
  id: string
  contact_id: string
  message: string
  origin: string
  name: string | null
  email: string | null
  phone: string | null
  company: string | null
  created_at: string
}

export type ContactWithMessages = Contact & { messages: ContactMessage[] }

export async function upsertContact(params: {
  name: string
  email?: string
  phone?: string
  company?: string
  message: string
  origin?: string
}): Promise<{ contact: Contact; isNew: boolean }> {
  const { name, email, phone, company, message, origin = "landing" } = params

  let contact: Contact | null = null

  if (email || phone) {
    const contactRows = await sql`
      SELECT * FROM contacts
      WHERE (${email ?? null}::text IS NOT NULL AND email = ${email ?? null}::text)
         OR (${phone ?? null}::text IS NOT NULL AND phone = ${phone ?? null}::text)
      LIMIT 1
    `
    contact = (contactRows[0] as Contact) ?? null

    if (!contact) {
      const msgRows = await sql`
        SELECT contact_id FROM contact_messages
        WHERE (${email ?? null}::text IS NOT NULL AND email = ${email ?? null}::text)
           OR (${phone ?? null}::text IS NOT NULL AND phone = ${phone ?? null}::text)
        LIMIT 1
      `
      if (msgRows[0]?.contact_id) {
        const fromMsgRows = await sql`SELECT * FROM contacts WHERE id = ${msgRows[0].contact_id} LIMIT 1`
        contact = (fromMsgRows[0] as Contact) ?? null
      }
    }
  }

  let isNew = false

  if (contact) {
    const updated = await sql`
      UPDATE contacts SET
        name = ${name},
        email = COALESCE(${email ?? null}::text, email),
        phone = COALESCE(${phone ?? null}::text, phone),
        company = COALESCE(${company ?? null}::text, company),
        updated_at = NOW()
      WHERE id = ${contact.id}
      RETURNING *
    `
    contact = updated[0] as Contact
  } else {
    const inserted = await sql`
      INSERT INTO contacts (name, email, phone, company)
      VALUES (${name}, ${email ?? null}, ${phone ?? null}, ${company ?? null})
      RETURNING *
    `
    contact = inserted[0] as Contact
    isNew = true
  }

  if (!contact) throw new Error("Failed to create or retrieve contact")

  await sql`
    INSERT INTO contact_messages (contact_id, message, origin, name, email, phone, company)
    VALUES (
      ${contact.id}, ${message}, ${origin},
      ${name ?? null}, ${email ?? null}, ${phone ?? null}, ${company ?? null}
    )
  `

  return { contact, isNew }
}

export async function getAllContacts(): Promise<ContactWithMessages[]> {
  const rows = await sql`
    SELECT c.*,
      COALESCE(
        json_agg(m ORDER BY m.created_at) FILTER (WHERE m.id IS NOT NULL),
        '[]'
      ) AS messages
    FROM contacts c
    LEFT JOIN contact_messages m ON m.contact_id = c.id
    GROUP BY c.id
    ORDER BY c.updated_at DESC
  `
  return rows as ContactWithMessages[]
}

export async function getContactById(id: string): Promise<ContactWithMessages | null> {
  const rows = await sql`
    SELECT c.*,
      COALESCE(
        json_agg(m ORDER BY m.created_at) FILTER (WHERE m.id IS NOT NULL),
        '[]'
      ) AS messages
    FROM contacts c
    LEFT JOIN contact_messages m ON m.contact_id = c.id
    WHERE c.id = ${id}
    GROUP BY c.id
  `
  return (rows[0] as ContactWithMessages) ?? null
}

export async function deleteContact(id: string): Promise<void> {
  await sql`DELETE FROM contacts WHERE id = ${id}`
}

export async function deleteMessage(id: string): Promise<void> {
  await sql`DELETE FROM contact_messages WHERE id = ${id}`
}
