import { getAllCandidates } from "@/lib/db/candidates"
import CandidatesList from "@/components/dashboard/candidates-list"
import { theme } from "@/lib/theme"

export const dynamic = "force-dynamic"

export default async function CandidatosPage() {
  const candidates = await getAllCandidates()

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
          Candidatos
        </h1>
        <p style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm, margin: "4px 0 0" }}>
          {candidates.length} candidato{candidates.length !== 1 ? "s" : ""} registrado{candidates.length !== 1 ? "s" : ""}
        </p>
      </div>

      <CandidatesList candidates={candidates} />
    </div>
  )
}
