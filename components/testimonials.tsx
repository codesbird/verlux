import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Verlux exceeded all our expectations. The stand they created for CES was absolutely stunning and generated incredible buzz.",
    author: "Sarah Mitchell",
    role: "Marketing Director",
    company: "TechVision Inc.",
  },
  {
    quote: "Professional, creative, and incredibly responsive. They managed every detail flawlessly and delivered on time.",
    author: "James Rodriguez",
    role: "Brand Manager",
    company: "Luxe Automotive",
  },
  {
    quote: "The ROI from our Verlux stand was phenomenal. We generated 3x more leads than our previous exhibitions.",
    author: "Emma Chen",
    role: "CEO",
    company: "Innovate Labs",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Client Stories</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-foreground text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
