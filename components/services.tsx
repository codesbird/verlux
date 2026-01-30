import { Lightbulb, Palette, Hammer, Truck, Users, Award } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "Concept Development",
    description: "We transform your vision into innovative stand concepts that align perfectly with your brand identity and marketing goals.",
  },
  {
    icon: Palette,
    title: "3D Design & Visualization",
    description: "Experience your stand before it's built with photorealistic 3D renders and immersive virtual walkthroughs.",
  },
  {
    icon: Hammer,
    title: "Custom Fabrication",
    description: "Our skilled craftsmen bring designs to life using premium materials and cutting-edge manufacturing techniques.",
  },
  {
    icon: Truck,
    title: "Logistics & Installation",
    description: "Seamless delivery and professional on-site installation, ensuring your stand is ready to impress.",
  },
  {
    icon: Users,
    title: "Project Management",
    description: "Dedicated project managers coordinate every detail, keeping you informed and stress-free throughout.",
  },
  {
    icon: Award,
    title: "Post-Event Support",
    description: "From dismantling to storage solutions, we handle everything after the show ends.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Our Services</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
            End-to-End Exhibition Solutions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From initial concept to final installation, we provide comprehensive services 
            to ensure your exhibition presence exceeds expectations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
