import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
            <span className="text-sm font-medium text-primary tracking-wide">Let's Create Something Amazing</span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">
            Ready to Transform Your <span className="text-primary italic">Exhibition</span> Presence?
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Get in touch with our team to discuss your next project. 
            We'd love to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide group">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-medium tracking-wide bg-transparent">
                View Our Services
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">Trusted by leading brands:</p>
            <div className="flex items-center gap-8 text-muted-foreground/60">
              <span className="font-semibold text-lg">MICROSOFT</span>
              <span className="font-semibold text-lg">SAMSUNG</span>
              <span className="font-semibold text-lg">BMW</span>
              <span className="font-semibold text-lg">NIKE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
