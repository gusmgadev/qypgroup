import { NextRequest, NextResponse } from "next/server"
import { deleteMessage } from "@/lib/db/contacts"

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string; messageId: string }> }) {
  try {
    const { messageId } = await params
    await deleteMessage(messageId)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contacts/messages/DELETE]", err)
    return NextResponse.json({ error: "Error al eliminar el mensaje" }, { status: 500 })
  }
}
