import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { DynamicSchema } from "@/components/seo/schema"
import { getSEO, generateMetadataFromSEO } from "@/lib/seo"
import { CheckCircle2, Users, Award, Globe, Leaf } from "lucide-react"

// Generate metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("about")
  return generateMetadataFromSEO(seo)
}

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "30+", label: "Countries Served" },
]

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We pursue perfection in every detail, from design concept to final installation.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as an extension of your team, ensuring seamless communication throughout.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "With partners worldwide, we deliver consistent quality across all major markets.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to eco-friendly materials and practices that minimize environmental impact.",
  },
]

const team = [
  { name: "Alexander Wright", role: "Founder & CEO", image: "/images/stand-1.jpg" },
  { name: "Sophie Chen", role: "Creative Director", image: "/images/stand-2.jpg" },
  { name: "Marcus Johnson", role: "Head of Operations", image: "/images/stand-3.jpg" },
]

export default async function AboutPage() {
  const seo = await getSEO("about")
  
  return (
    <main className="min-h-screen bg-background">
      <DynamicSchema seo={seo} />
      <Header />
      <PageHeader
        subtitle="Our Story"
        title="Crafting Exhibition Excellence Since 2009"
        description="For over 15 years, Verlux Stands has been at the forefront of exhibition design and fabrication, creating unforgettable brand experiences worldwide."
      />
      
      {/* Stats Section */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/hero-stand.jpg"
                  alt="Verlux workshop"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Where Vision Meets Craftsmanship
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Founded in 2009 by Alexander Wright, Verlux Stands began as a small design studio 
                  with a bold vision: to transform how brands present themselves at trade shows and exhibitions.
                </p>
                <p>
                  What started in a modest workshop has grown into an internationally recognized 
                  exhibition design company, serving Fortune 500 companies and innovative startups alike.
                </p>
                <p>
                  Our team of architects, designers, and craftsmen share a common passion for creating 
                  spaces that don't just display products—they tell stories, evoke emotions, and forge connections.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {["Award-winning design team", "In-house manufacturing facility", "Global logistics network", "Sustainable practices"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Our Values</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Our Leadership</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Meet the Team
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
