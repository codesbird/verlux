import Image from "next/image"
import { PageConfig, PageComponent } from "@/lib/types/seo"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { Portfolio } from "@/components/portfolio"
import { Process } from "@/components/process"
import { CTA } from "@/components/cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Gallery component for showcasing images
function Gallery() {
  const images = [
    { src: "/images/stand-1.jpg", alt: "Exhibition Stand 1" },
    { src: "/images/stand-2.jpg", alt: "Exhibition Stand 2" },
    { src: "/images/stand-3.jpg", alt: "Exhibition Stand 3" },
    { src: "/images/hero-stand.jpg", alt: "Featured Stand" },
  ]

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Our Work</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Featured Projects Gallery
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-xl ${index === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <div className={`relative ${index === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface PageRendererProps {
  config: PageConfig
}

function renderComponent(component: PageComponent) {
  switch (component.type) {
    case "hero":
      return <Hero key={component.id} />
    case "services":
      return <Services key={component.id} />
    case "about":
      return <About key={component.id} />
    case "testimonials":
      return <Testimonials key={component.id} />
    case "portfolio":
      return <Portfolio key={component.id} />
    case "process":
      return <Process key={component.id} />
    case "cta":
      return <CTA key={component.id} />
    case "gallery":
      return <Gallery key={component.id} />
    case "faq":
      // Return FAQ component if available, or fallback
      return (
        <section key={component.id} className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center">
              FAQ section - customize in Page Builder
            </p>
          </div>
        </section>
      )
    case "contact-form":
      return (
        <section key={component.id} className="py-20 bg-secondary">
          <div className="container mx-auto px-6 max-w-xl">
            <h2 className="font-serif text-3xl font-bold text-center mb-8">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Contact form - Visit our contact page for full form
            </p>
            <div className="text-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      )
    case "custom":
      return (
        <section key={component.id} className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <p className="text-muted-foreground text-center">
              Custom component placeholder
            </p>
          </div>
        </section>
      )
    default:
      return null
  }
}

export function PageRenderer({ config }: PageRendererProps) {
  // Sort components by order
  const sortedComponents = [...config.components].sort((a, b) => a.order - b.order)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      {sortedComponents.map((component) => renderComponent(component))}
      <Footer />
    </main>
  )
}
