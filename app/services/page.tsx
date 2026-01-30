import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ServiceSchema, BreadcrumbSchema } from "@/components/structured-data"
import { DynamicSchema } from "@/components/seo/schema"
import { getSEO, generateMetadataFromSEO } from "@/lib/seo"
import { Lightbulb, Palette, Hammer, Truck, Users, Award, Settings, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Generate metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("services")
  return generateMetadataFromSEO(seo)
}

const services = [
  {
    icon: Lightbulb,
    title: "Concept Development",
    description: "We transform your vision into innovative stand concepts that align perfectly with your brand identity and marketing goals. Our creative team works closely with you to understand your objectives and develop unique solutions.",
  },
  {
    icon: Palette,
    title: "3D Design & Visualization",
    description: "Experience your stand before it's built with photorealistic 3D renders and immersive virtual walkthroughs. Make informed decisions with accurate visualizations of your exhibition space.",
  },
  {
    icon: Hammer,
    title: "Custom Fabrication",
    description: "Our skilled craftsmen bring designs to life using premium materials and cutting-edge manufacturing techniques. Every detail is crafted to perfection in our state-of-the-art facility.",
  },
  {
    icon: Truck,
    title: "Logistics & Installation",
    description: "Seamless delivery and professional on-site installation, ensuring your stand is ready to impress. We handle all transportation, setup, and coordination with venue management.",
  },
  {
    icon: Users,
    title: "Project Management",
    description: "Dedicated project managers coordinate every detail, keeping you informed and stress-free throughout. From timeline management to budget control, we've got you covered.",
  },
  {
    icon: Award,
    title: "Post-Event Support",
    description: "From dismantling to storage solutions, we handle everything after the show ends. We also provide maintenance and refurbishment services for future events.",
  },
  {
    icon: Settings,
    title: "Modular Systems",
    description: "Flexible modular stand systems that can be reconfigured for different events and spaces. Cost-effective solutions without compromising on visual impact.",
  },
  {
    icon: Zap,
    title: "AV & Technology Integration",
    description: "Seamless integration of audiovisual equipment, interactive displays, and digital signage to create engaging visitor experiences.",
  },
  {
    icon: Globe,
    title: "International Services",
    description: "Global reach with local expertise. We deliver exhibition solutions worldwide with partners in major trade show destinations.",
  },
]

export default async function ServicesPage() {
  const seo = await getSEO("services")
  
  return (
    <>
      <DynamicSchema seo={seo} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://verluxstands.com" },
        { name: "Services", url: "https://verluxstands.com/services" }
      ]} />
      <ServiceSchema 
        serviceName="Exhibition Stand Design & Build" 
        description="Complete exhibition stand services including concept development, 3D design, custom fabrication, logistics and installation worldwide."
      />
      <main className="min-h-screen bg-background">
        <Header />
        <PageHeader
          subtitle="What We Offer"
          title="End-to-End Exhibition Solutions"
          description="From initial concept to final installation, we provide comprehensive services to ensure your exhibition presence exceeds expectations."
        />
        
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    {service.icon && <service.icon className="w-7 h-7 text-primary" />}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-6">Ready to create your perfect exhibition stand?</p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
