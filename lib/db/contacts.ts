import { supabaseAdmin } from "../supabase"

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

  const orParts: string[] = []
  if (email) orParts.push(`email.eq.${email}`)
  if (phone) orParts.push(`phone.eq.${phone}`)

  let contact: Contact | null = null

  if (orParts.length > 0) {
    // 1) Buscar en contacts por email o teléfono
    const { data: contactMatch } = await supabaseAdmin
      .from("contacts")
      .select("*")
      .or(orParts.join(","))
      .limit(1)
      .maybeSingle()
    contact = contactMatch

    // 2) Si no encontró en contacts, buscar en mensajes previos
    if (!contact) {
      const { data: msgMatch } = await supabaseAdmin
        .from("contact_messages")
        .select("contact_id")
        .or(orParts.join(","))
        .limit(1)
        .maybeSingle()

      if (msgMatch?.contact_id) {
        const { data: contactFromMsg } = await supabaseAdmin
          .from("contacts")
          .select("*")
          .eq("id", msgMatch.contact_id)
          .single()
        contact = contactFromMsg
      }
    }
  }

  let isNew = false

  if (contact) {
    // Actualizar nombre/empresa y completar email/teléfono si faltaban
    const updates: Partial<Contact> = { name }
    if (email && !contact.email) updates.email = email
    if (phone && !contact.phone) updates.phone = phone
    if (company) updates.company = company

    const { data, error } = await supabaseAdmin
      .from("contacts")
      .update(updates)
      .eq("id", contact.id)
      .select()
      .single()
    if (error) throw error
    contact = data
  } else {
    const { data, error } = await supabaseAdmin
      .from("contacts")
      .insert({ name, email: email ?? null, phone: phone ?? null, company: company ?? null })
      .select()
      .single()
    if (error) throw error
    contact = data
    isNew = true
  }

  const { error: msgError } = await supabaseAdmin
    .from("contact_messages")
    .insert({
      contact_id: contact.id,
      message,
      origin,
      name: name ?? null,
      email: email ?? null,
      phone: phone ?? null,
      company: company ?? null,
    })
  if (msgError) throw msgError

  return { contact, isNew }
}

export async function getAllContacts(): Promise<ContactWithMessages[]> {
  const { data, error } = await supabaseAdmin
    .from("contacts")
    .select("*, messages:contact_messages(*)")
    .order("updated_at", { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getContactById(id: string): Promise<ContactWithMessages | null> {
  const { data, error } = await supabaseAdmin
    .from("contacts")
    .select("*, messages:contact_messages(*)")
    .eq("id", id)
    .single()
  if (error) return null
  return data
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("contacts").delete().eq("id", id)
  if (error) throw error
}

export async function deleteMessage(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("contact_messages").delete().eq("id", id)
  if (error) throw error
}
