import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const features = [
  "Award-winning design team",
  "In-house manufacturing facility",
  "Global logistics network",
  "Sustainable materials & practices",
]

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/stand-2.jpg"
                alt="Our workshop"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-4 md:right-8 bg-card border border-border rounded-xl p-6 shadow-2xl">
              <p className="font-serif text-4xl font-bold text-primary mb-1">98%</p>
              <p className="text-sm text-muted-foreground">Client Satisfaction Rate</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">About Verlux</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
              Crafting Exhibition Excellence Since 2009
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              For over 15 years, Verlux Stands has been at the forefront of exhibition design 
              and fabrication. We combine artistic vision with engineering precision to create 
              stands that don't just display — they inspire.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our team of architects, designers, and craftsmen work collaboratively to transform 
              your brand story into immersive spatial experiences that leave lasting impressions.
            </p>

            {/* Features List */}
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
