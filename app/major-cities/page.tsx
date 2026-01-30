import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { DynamicSchema } from "@/components/seo/schema"
import { getSEO, generateMetadataFromSEO } from "@/lib/seo"
import { MapPin, Building2, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Generate metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("major-cities")
  return generateMetadataFromSEO(seo)
}

const cities = [
  {
    city: "London",
    country: "United Kingdom",
    venues: ["ExCeL London", "Olympia", "Business Design Centre"],
    projects: 120,
    description: "Our headquarters and largest market. We know every major venue in London inside out.",
  },
  {
    city: "Frankfurt",
    country: "Germany",
    venues: ["Messe Frankfurt", "Festhalle", "Congress Center"],
    projects: 85,
    description: "The heart of European trade fairs. Our German team delivers excellence at every show.",
  },
  {
    city: "Las Vegas",
    country: "USA",
    venues: ["Las Vegas Convention Center", "Venetian Expo", "Mandalay Bay"],
    projects: 95,
    description: "From CES to MAGIC, we've built award-winning stands across Sin City's venues.",
  },
  {
    city: "Barcelona",
    country: "Spain",
    venues: ["Fira Barcelona", "CCIB", "Palau de Congressos"],
    projects: 60,
    description: "Home to Mobile World Congress and ISE. A creative hub for innovative stand design.",
  },
  {
    city: "Dubai",
    country: "UAE",
    venues: ["Dubai World Trade Centre", "DWTC", "Dubai Expo City"],
    projects: 75,
    description: "The gateway to Middle Eastern markets. Luxury and innovation meet in our Dubai projects.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    venues: ["Marina Bay Sands", "Suntec Singapore", "Singapore Expo"],
    projects: 45,
    description: "Your partner for Asia-Pacific exhibitions. Local expertise with global standards.",
  },
  {
    city: "Paris",
    country: "France",
    venues: ["Paris Expo", "Paris Nord Villepinte", "Palais des Congrès"],
    projects: 55,
    description: "Elegance and sophistication define our Parisian installations.",
  },
  {
    city: "Chicago",
    country: "USA",
    venues: ["McCormick Place", "Navy Pier", "Rosemont Convention Center"],
    projects: 40,
    description: "America's largest convention center is where we create some of our biggest stands.",
  },
]

const regions = [
  { name: "Europe", countries: "UK, Germany, France, Spain, Italy, Netherlands, Switzerland" },
  { name: "North America", countries: "USA, Canada, Mexico" },
  { name: "Middle East", countries: "UAE, Saudi Arabia, Qatar, Kuwait" },
  { name: "Asia Pacific", countries: "Singapore, Hong Kong, Japan, Australia" },
]

export default async function MajorCitiesPage() {
  const seo = await getSEO("major-cities")
  
  return (
    <main className="min-h-screen bg-background">
      <DynamicSchema seo={seo} />
      <Header />
      <PageHeader
        subtitle="Global Presence"
        title="We Deliver Worldwide"
        description="With partners and teams across the globe, Verlux Stands brings your exhibition vision to life in major cities worldwide."
      />
      
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          {/* Regions Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {regions.map((region, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="font-serif text-xl font-bold text-primary mb-2">{region.name}</h3>
                <p className="text-sm text-muted-foreground">{region.countries}</p>
              </div>
            ))}
          </div>

          {/* Cities Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {cities.map((location, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold">{location.city}</h3>
                      <p className="text-muted-foreground">{location.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-2xl font-bold text-primary">{location.projects}+</p>
                      <p className="text-sm text-muted-foreground">Projects</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{location.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium text-foreground mb-2">Key Venues:</p>
                    <div className="flex flex-wrap gap-2">
                      {location.venues.map((venue, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-secondary text-sm text-muted-foreground rounded-full"
                        >
                          {venue}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-border hover:bg-secondary hover:text-foreground bg-transparent">
                      Enquire for {location.city}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center bg-secondary rounded-xl p-10 border border-border">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Don't See Your City?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We work with trusted partners worldwide and can deliver exhibition stands to virtually any destination. Contact us to discuss your requirements.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact Us About Your Location
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
