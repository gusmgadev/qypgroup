"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Phone, Mail, ChevronDown, ChevronUp, MessageSquare, Building2, Trash2 } from "lucide-react"
import { theme } from "@/lib/theme"
import type { ContactWithMessages, ContactMessage } from "@/lib/db/contacts"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function DeleteButton({ onConfirm, small = false }: { onConfirm: () => Promise<void>; small?: boolean }) {
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()

  if (confirming) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <button
          onClick={() => startTransition(async () => { await onConfirm(); setConfirming(false) })}
          disabled={pending}
          style={{
            padding: small ? "2px 8px" : "3px 10px",
            fontSize: "11px",
            fontWeight: 600,
            background: theme.colors.error,
            color: "#fff",
            border: "none",
            borderRadius: "99px",
            cursor: "pointer",
            fontFamily: theme.fonts.primary,
          }}
        >
          {pending ? "..." : "Sí, eliminar"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          style={{
            padding: small ? "2px 8px" : "3px 10px",
            fontSize: "11px",
            background: "none",
            color: theme.colors.textMuted,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: "99px",
            cursor: "pointer",
            fontFamily: theme.fonts.primary,
          }}
        >
          Cancelar
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title="Eliminar"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        color: theme.colors.textMuted,
        display: "flex",
        alignItems: "center",
        opacity: 0.6,
      }}
    >
      <Trash2 size={small ? 13 : 15} />
    </button>
  )
}

function MessageCard({
  msg,
  contactId,
  onDeleted,
}: {
  msg: ContactMessage
  contactId: string
  onDeleted: (id: string) => void
}) {
  const handleDelete = async () => {
    const res = await fetch(`/api/contacts/${contactId}/messages/${msg.id}`, { method: "DELETE" })
    if (res.ok) onDeleted(msg.id)
  }

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.sm,
        padding: "10px 14px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <p style={{ margin: "0 0 8px", color: theme.colors.text, fontSize: theme.fontSizes.sm, flex: 1 }}>
          {msg.message}
        </p>
        <DeleteButton onConfirm={handleDelete} small />
      </div>

      {(msg.name || msg.company || msg.email || msg.phone) && (
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            padding: "6px 10px",
            marginBottom: "8px",
            backgroundColor: theme.colors.background,
            borderRadius: theme.radii.sm,
            fontSize: "11px",
            color: theme.colors.textMuted,
          }}
        >
          {msg.name    && <span><strong>Nombre:</strong> {msg.name}</span>}
          {msg.company && <span><strong>Empresa:</strong> {msg.company}</span>}
          {msg.email   && <span><strong>Email:</strong> {msg.email}</span>}
          {msg.phone   && <span><strong>Tel:</strong> {msg.phone}</span>}
        </div>
      )}
      <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: "11px" }}>
        {formatDate(msg.created_at)}
        {msg.origin && msg.origin !== "landing" && (
          <span style={{ marginLeft: "8px", opacity: 0.7 }}>· {msg.origin}</span>
        )}
      </p>
    </div>
  )
}

function ContactRow({
  contact,
  onDeleted,
}: {
  contact: ContactWithMessages
  onDeleted: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(contact.messages ?? [])

  const handleDeleteContact = async () => {
    const res = await fetch(`/api/contacts/${contact.id}`, { method: "DELETE" })
    if (res.ok) onDeleted(contact.id)
  }

  const handleMessageDeleted = (msgId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== msgId))
  }

  const sorted = messages.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div
      style={{
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.md,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Fila principal */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr auto auto auto",
          alignItems: "center",
          gap: "16px",
          padding: "14px 20px",
        }}
      >
        {/* Nombre */}
        <div>
          <p style={{ margin: 0, fontWeight: theme.fontWeights.bold, color: theme.colors.text, fontSize: theme.fontSizes.sm }}>
            {contact.name}
          </p>
          <p style={{ margin: "2px 0 0", color: theme.colors.textMuted, fontSize: "11px" }}>
            {formatDate(contact.created_at)}
          </p>
        </div>

        {/* Empresa */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Building2 size={13} style={{ color: theme.colors.textMuted, flexShrink: 0 }} />
          <span style={{ color: theme.colors.text, fontSize: theme.fontSizes.sm }}>
            {contact.company ?? <span style={{ color: theme.colors.textMuted }}>—</span>}
          </span>
        </div>

        {/* Email */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Mail size={13} style={{ color: theme.colors.textMuted, flexShrink: 0 }} />
          {contact.email ? (
            <a href={`mailto:${contact.email}`} style={{ color: theme.colors.text, fontSize: theme.fontSizes.sm, textDecoration: "none" }}>
              {contact.email}
            </a>
          ) : (
            <span style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>—</span>
          )}
        </div>

        {/* Teléfono */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Phone size={13} style={{ color: theme.colors.textMuted, flexShrink: 0 }} />
          {contact.phone ? (
            <a href={`tel:${contact.phone}`} style={{ color: theme.colors.text, fontSize: theme.fontSizes.sm, textDecoration: "none" }}>
              {contact.phone}
            </a>
          ) : (
            <span style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>—</span>
          )}
        </div>

        {/* Badge mensajes */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "3px 10px",
            borderRadius: "99px",
            backgroundColor: messages.length > 0 ? "rgba(232,105,26,0.10)" : "rgba(0,0,0,0.05)",
            color: messages.length > 0 ? theme.colors.accent : theme.colors.textMuted,
            fontSize: "12px",
            fontWeight: theme.fontWeights.medium,
            whiteSpace: "nowrap",
          }}
        >
          <MessageSquare size={12} />
          {messages.length} mensaje{messages.length !== 1 ? "s" : ""}
        </div>

        {/* Eliminar contacto */}
        <DeleteButton onConfirm={handleDeleteContact} />

        {/* Toggle mensajes */}
        <button
          onClick={() => setOpen((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: theme.colors.textMuted, display: "flex", alignItems: "center" }}
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Mensajes expandidos */}
      {open && (
        <div
          style={{
            borderTop: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.background,
            padding: "16px 20px",
          }}
        >
          {sorted.length === 0 ? (
            <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>
              Sin mensajes registrados.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {sorted.map((msg) => (
                <MessageCard
                  key={msg.id}
                  msg={msg}
                  contactId={contact.id}
                  onDeleted={handleMessageDeleted}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ContactsList({ contacts }: { contacts: ContactWithMessages[] }) {
  const [list, setList] = useState(contacts)
  const router = useRouter()

  const handleContactDeleted = (id: string) => {
    setList((prev) => prev.filter((c) => c.id !== id))
    router.refresh()
  }

  if (list.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: theme.colors.textMuted,
          fontSize: theme.fontSizes.sm,
          border: `1px dashed ${theme.colors.border}`,
          borderRadius: theme.radii.md,
        }}
      >
        Todavía no hay contactos registrados.
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr auto auto auto",
          gap: "16px",
          padding: "8px 20px",
          marginBottom: "6px",
        }}
      >
        {["Nombre", "Empresa", "Email", "Teléfono", "Mensajes", "", ""].map((col, i) => (
          <span
            key={i}
            style={{
              color: theme.colors.textMuted,
              fontSize: "11px",
              fontWeight: theme.fontWeights.medium,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {col}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {list.map((contact) => (
          <ContactRow key={contact.id} contact={contact} onDeleted={handleContactDeleted} />
        ))}
      </div>
    </div>
  )
}
