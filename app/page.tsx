import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Services } from "@/components/landing/services"
import { Process } from "@/components/landing/process"
import { TrabajosSection } from "@/components/landing/trabajos"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"
import { CenterScroll } from "@/components/landing/center-scroll"
import { getVisibleProjects } from "@/lib/db/projects"

export const dynamic = "force-dynamic"

export default async function Home() {
  const projects = await getVisibleProjects().catch(() => [])

  return (
    <main className="min-h-screen bg-black">
      <CenterScroll />
      <Navbar />
      <Hero />
      <Services />
      <Process />
<TrabajosSection projects={projects} />
      <Contact />
      <Footer />
    </main>
  )
}