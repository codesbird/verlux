import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Tech Summit 2024",
    category: "Technology",
    image: "/images/stand-1.jpg",
    size: "large",
  },
  {
    title: "Luxe Automotive",
    category: "Automotive",
    image: "/images/stand-2.jpg",
    size: "small",
  },
  {
    title: "Fashion Forward",
    category: "Fashion & Beauty",
    image: "/images/stand-3.jpg",
    size: "small",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-xl mb-6 md:mb-0">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Featured Work</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">
              Stands That Define Excellence
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Large Featured Project */}
          <div className="md:row-span-2 group relative overflow-hidden rounded-xl">
            <div className="aspect-[4/5] relative">
              <Image
                src={projects[0].image || "/placeholder.svg"}
                alt={projects[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                {projects[0].category}
              </p>
              <h3 className="font-serif text-3xl font-bold mb-4">{projects[0].title}</h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium group/link"
              >
                View Case Study
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Smaller Projects */}
          {projects.slice(1).map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl">
              <div className="aspect-[16/10] relative">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h3 className="font-serif text-2xl font-bold mb-3">{project.title}</h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium group/link"
                >
                  View Case Study
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
