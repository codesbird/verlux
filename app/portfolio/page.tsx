import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { DynamicSchema } from "@/components/seo/schema"
import { getSEO, generateMetadataFromSEO } from "@/lib/seo"
import { ArrowUpRight } from "lucide-react"

// Generate metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("portfolio")
  return generateMetadataFromSEO(seo)
}

const projects = [
  {
    title: "Tech Summit 2024",
    category: "Technology",
    image: "/images/stand-1.jpg",
    client: "TechVision Inc.",
    location: "Las Vegas, USA",
    size: "120 sqm",
  },
  {
    title: "Luxe Automotive Showcase",
    category: "Automotive",
    image: "/images/stand-2.jpg",
    client: "Luxe Motors",
    location: "Frankfurt, Germany",
    size: "200 sqm",
  },
  {
    title: "Fashion Forward Exhibition",
    category: "Fashion & Beauty",
    image: "/images/stand-3.jpg",
    client: "Style Co.",
    location: "Milan, Italy",
    size: "80 sqm",
  },
  {
    title: "Healthcare Innovation",
    category: "Healthcare",
    image: "/images/hero-stand.jpg",
    client: "MedTech Solutions",
    location: "Boston, USA",
    size: "150 sqm",
  },
  {
    title: "Food & Beverage Expo",
    category: "Food Industry",
    image: "/images/stand-1.jpg",
    client: "Global Foods Ltd",
    location: "Paris, France",
    size: "100 sqm",
  },
  {
    title: "Sustainable Living",
    category: "Environment",
    image: "/images/stand-2.jpg",
    client: "EcoWorld",
    location: "Amsterdam, Netherlands",
    size: "90 sqm",
  },
]

export default async function PortfolioPage() {
  const seo = await getSEO("portfolio")
  
  return (
    <main className="min-h-screen bg-background">
      <DynamicSchema seo={seo} />
      <Header />
      <PageHeader
        subtitle="Our Work"
        title="Stands That Define Excellence"
        description="Browse our portfolio of award-winning exhibition stands created for brands across industries worldwide."
      />
      
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                    >
                      View Case Study
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h3 className="font-serif text-xl font-semibold mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>{project.client}</span>
                  <span>{project.location}</span>
                  <span>{project.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
