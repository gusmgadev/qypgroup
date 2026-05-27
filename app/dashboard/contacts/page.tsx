import { getAllContacts } from "@/lib/db/contacts"
import ContactsList from "@/components/dashboard/contacts-list"
import { theme } from "@/lib/theme"

export const dynamic = "force-dynamic"

export default async function ContactsPage() {
  const contacts = await getAllContacts()

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            color: theme.colors.dark,
            fontSize: theme.fontSizes.xl,
            fontWeight: theme.fontWeights.bold,
            margin: 0,
          }}
        >
          Contactos
        </h1>
        <p style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm, margin: "4px 0 0" }}>
          {contacts.length} contacto{contacts.length !== 1 ? "s" : ""} registrado{contacts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ContactsList contacts={contacts} />
    </div>
  )
}
