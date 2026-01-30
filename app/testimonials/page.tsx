import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ReviewSchema, BreadcrumbSchema } from "@/components/structured-data"
import { DynamicSchema } from "@/components/seo/schema"
import { getSEO, generateMetadataFromSEO } from "@/lib/seo"
import { Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Generate metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("testimonials")
  return generateMetadataFromSEO(seo)
}

const testimonials = [
  {
    quote: "Verlux exceeded all our expectations. The stand they created for CES was absolutely stunning and generated incredible buzz. We saw a 40% increase in booth traffic compared to previous years.",
    author: "Sarah Mitchell",
    role: "Marketing Director",
    company: "TechVision Inc.",
    rating: 5,
  },
  {
    quote: "Professional, creative, and incredibly responsive. They managed every detail flawlessly and delivered on time, even when we made last-minute changes.",
    author: "James Rodriguez",
    role: "Brand Manager",
    company: "Luxe Automotive",
    rating: 5,
  },
  {
    quote: "The ROI from our Verlux stand was phenomenal. We generated 3x more leads than our previous exhibitions. Their design truly set us apart from competitors.",
    author: "Emma Chen",
    role: "CEO",
    company: "Innovate Labs",
    rating: 5,
  },
  {
    quote: "Working with Verlux was a seamless experience from start to finish. Their attention to detail and commitment to quality is unmatched in the industry.",
    author: "Michael Thompson",
    role: "Events Director",
    company: "Global Healthcare",
    rating: 5,
  },
  {
    quote: "We've worked with many exhibition companies over the years, but Verlux stands out for their creativity and reliability. They're now our exclusive partner.",
    author: "Lisa Park",
    role: "VP Marketing",
    company: "Fashion Forward",
    rating: 5,
  },
  {
    quote: "The sustainable materials and eco-friendly approach was exactly what we needed for our brand. The stand looked amazing and aligned perfectly with our values.",
    author: "David Green",
    role: "Sustainability Officer",
    company: "EcoTech Solutions",
    rating: 5,
  },
  {
    quote: "Verlux transformed our trade show presence completely. The interactive elements they integrated brought our products to life in ways we never imagined.",
    author: "Rachel Adams",
    role: "Product Manager",
    company: "NextGen Electronics",
    rating: 5,
  },
  {
    quote: "From concept to execution, Verlux demonstrated exceptional expertise. They understood our brand instantly and delivered a stand that truly represented us.",
    author: "Thomas Wright",
    role: "Creative Director",
    company: "Design Studio Co.",
    rating: 5,
  },
  {
    quote: "The team at Verlux went above and beyond. When we faced unexpected challenges at the venue, they handled everything professionally without any delays.",
    author: "Jennifer Lee",
    role: "Operations Manager",
    company: "MedTech International",
    rating: 5,
  },
]

export default async function TestimonialsPage() {
  const seo = await getSEO("testimonials")
  const reviewsForSchema = testimonials.map(t => ({
    author: t.author,
    rating: t.rating,
    reviewBody: t.quote
  }))

  return (
    <>
      <DynamicSchema seo={seo} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://verluxstands.com" },
        { name: "Testimonials", url: "https://verluxstands.com/testimonials" }
      ]} />
      <ReviewSchema reviews={reviewsForSchema} />
      <main className="min-h-screen bg-background">
        <Header />
        <PageHeader
          subtitle="Client Stories"
          title="Trusted by Industry Leaders"
          description="Don't just take our word for it. Here's what our clients have to say about working with Verlux Stands."
        />
        
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors relative"
                >
                  <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-foreground leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="border-t border-border pt-6">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-6">Ready to join our list of satisfied clients?</p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Your Project
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
