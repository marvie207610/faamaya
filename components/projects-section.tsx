import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProjectsSection() {
  const projects = [
    {
      title: "Galaxy Zoo",
      description: "Help astronomers classify galaxies by their shapes and features.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Astronomy",
    },
    {
      title: "Snapshot Serengeti",
      description: "Identify animals in camera trap images from the Serengeti.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Ecology",
    },
    {
      title: "Transcribe Bentham",
      description: "Help transcribe the papers of philosopher Jeremy Bentham.",
      image: "/placeholder.svg?height=200&width=300",
      category: "History",
    },
    {
      title: "Planet Hunters",
      description: "Search for planets around other stars in data from NASA.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Astronomy",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-slate-800 mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore some of our most popular research projects and start contributing to real scientific discoveries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">{project.category}</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Classifying</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
