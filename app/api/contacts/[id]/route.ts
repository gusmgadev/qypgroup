import { NextRequest, NextResponse } from "next/server"
import { deleteContact } from "@/lib/db/contacts"

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await deleteContact(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contacts/DELETE]", err)
    return NextResponse.json({ error: "Error al eliminar el contacto" }, { status: 500 })
  }
}
