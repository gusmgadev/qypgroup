import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Services } from "@/components/landing/services"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"
import { CenterScroll } from "@/components/landing/center-scroll"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CenterScroll />
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}