import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-stand.jpg"
          alt="Premium exhibition stand"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary tracking-wide">Premium Exhibition Design</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-balance">
            Create{" "}
            <span className="text-primary italic">Unforgettable</span>
            <br />
            Brand Experiences
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            We design and build bespoke exhibition stands that captivate audiences 
            and elevate your brand presence at every event.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide group">
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-medium tracking-wide group bg-transparent">
                <Play className="mr-2 w-4 h-4" />
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            <div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary">15+</p>
              <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary">40+</p>
              <p className="text-sm text-muted-foreground mt-1">Countries Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}
