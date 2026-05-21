import { redirect } from "next/navigation"
import { auth } from "../../auth"
import DashboardSidebar from "../../components/dashboard/sidebar"
import { SessionProvider } from "next-auth/react"
import { theme } from "../../lib/theme"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/auth/signin")

  return (
    <SessionProvider>
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: theme.fonts.primary }}>
        <DashboardSidebar />
        <main
          style={{
            marginLeft: theme.dashboard.sidebarWidth,
            flex: 1,
            backgroundColor: theme.colors.background,
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
