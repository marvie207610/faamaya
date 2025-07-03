import Header from "@/components/header"
import Hero from "@/components/hero"
import ProjectsSection from "@/components/projects-section"
import StatsSection from "@/components/stats-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
