import { NextRequest, NextResponse } from "next/server"
import { upsertContact } from "@/lib/db/contacts"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, message } = body

    if (!name || !message) {
      return NextResponse.json({ error: "Nombre y mensaje son requeridos" }, { status: 400 })
    }
    if (!email && !phone) {
      return NextResponse.json({ error: "Ingresá al menos email o teléfono" }, { status: 400 })
    }

    const { contact, isNew } = await upsertContact({
      name: name.trim(),
      email: email?.trim() || undefined,
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      message: message.trim(),
      origin: "landing",
    })

    return NextResponse.json({ ok: true, contactId: contact.id, isNew })
  } catch (err) {
    console.error("[contact/POST]", err)
    return NextResponse.json({ error: "Error al guardar el contacto" }, { status: 500 })
  }
}
