import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { DynamicSchema } from "@/components/seo/schema"
import { getSEO, generateMetadataFromSEO } from "@/lib/seo"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Generate metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("trade-show-calendar")
  return generateMetadataFromSEO(seo)
}

const upcomingShows = [
  {
    name: "CES 2026",
    date: "January 7-10, 2026",
    location: "Las Vegas, USA",
    industry: "Technology",
    attendees: "180,000+",
    deadline: "October 2025",
  },
  {
    name: "Mobile World Congress",
    date: "February 23-26, 2026",
    location: "Barcelona, Spain",
    industry: "Telecommunications",
    attendees: "100,000+",
    deadline: "November 2025",
  },
  {
    name: "SXSW",
    date: "March 13-22, 2026",
    location: "Austin, USA",
    industry: "Tech & Media",
    attendees: "400,000+",
    deadline: "December 2025",
  },
  {
    name: "Hannover Messe",
    date: "April 20-24, 2026",
    location: "Hannover, Germany",
    industry: "Industrial",
    attendees: "220,000+",
    deadline: "January 2026",
  },
  {
    name: "IMTS",
    date: "September 14-19, 2026",
    location: "Chicago, USA",
    industry: "Manufacturing",
    attendees: "130,000+",
    deadline: "June 2026",
  },
  {
    name: "Gitex Global",
    date: "October 13-17, 2026",
    location: "Dubai, UAE",
    industry: "Technology",
    attendees: "170,000+",
    deadline: "July 2026",
  },
  {
    name: "Medica",
    date: "November 16-19, 2026",
    location: "Dusseldorf, Germany",
    industry: "Healthcare",
    attendees: "120,000+",
    deadline: "August 2026",
  },
  {
    name: "ISE",
    date: "February 4-7, 2027",
    location: "Barcelona, Spain",
    industry: "AV & Integration",
    attendees: "80,000+",
    deadline: "October 2026",
  },
]

export default async function TradeShowCalendarPage() {
  const seo = await getSEO("trade-show-calendar")
  
  return (
    <main className="min-h-screen bg-background">
      <DynamicSchema seo={seo} />
      <Header />
      <PageHeader
        subtitle="Upcoming Events"
        title="Trade Show Calendar 2026"
        description="Plan ahead for the biggest trade shows and exhibitions worldwide. We recommend booking 3-6 months in advance for the best results."
      />
      
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="mb-12 p-6 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-foreground">
              <strong>Planning Tip:</strong> For custom exhibition stands, we recommend starting the design process 4-6 months before your event. Contact us early to ensure availability and the best possible outcome.
            </p>
          </div>

          <div className="space-y-6">
            {upcomingShows.map((show, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {show.industry}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-4">{show.name}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{show.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{show.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{show.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center gap-4">
                    <div className="text-left lg:text-right">
                      <p className="text-sm text-muted-foreground">Book by</p>
                      <p className="font-semibold text-foreground">{show.deadline}</p>
                    </div>
                    <Link href="/contact">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-secondary rounded-xl p-10 border border-border">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Don't See Your Event?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We design and build exhibition stands for events worldwide. Whether it's a major trade show or a regional conference, we've got you covered.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact Us About Your Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
