import { NextRequest, NextResponse } from "next/server"
import { deleteCandidate } from "../../../../lib/db/candidates"

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await deleteCandidate(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[candidates/DELETE]", err)
    return NextResponse.json({ error: "Error al eliminar el candidato" }, { status: 500 })
  }
}
