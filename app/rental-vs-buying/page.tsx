import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { FAQSchema, BreadcrumbSchema } from "@/components/structured-data"
import { DynamicSchema } from "@/components/seo/schema"
import { getSEO, generateMetadataFromSEO } from "@/lib/seo"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Generate metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("rental-vs-buying")
  return generateMetadataFromSEO(seo)
}

const rentalBenefits = [
  "Lower upfront investment",
  "No storage costs",
  "Fresh designs for each event",
  "Includes setup and dismantling",
  "Flexibility to change sizes",
  "No maintenance required",
  "Ideal for 1-3 events per year",
  "Access to latest trends",
]

const purchaseBenefits = [
  "Lower cost per event (4+ events)",
  "Complete brand ownership",
  "Available anytime needed",
  "Customized to exact specifications",
  "Build equity in your asset",
  "Consistent brand presence",
  "Can be modified over time",
  "Tax depreciation benefits",
]

const comparisonTable = [
  { feature: "Initial Investment", rental: "Low", purchase: "High" },
  { feature: "Cost Per Event (4+ events)", rental: "Higher", purchase: "Lower" },
  { feature: "Storage Requirements", rental: "None", purchase: "Required" },
  { feature: "Design Flexibility", rental: "Per Event", purchase: "Fixed" },
  { feature: "Setup & Dismantling", rental: "Included", purchase: "Additional" },
  { feature: "Maintenance", rental: "Included", purchase: "Your Responsibility" },
  { feature: "Brand Customization", rental: "Limited", purchase: "Complete" },
  { feature: "Ideal For", rental: "1-3 events/year", purchase: "4+ events/year" },
]

const rentalFaqs = [
  {
    question: "Should I rent or buy an exhibition stand?",
    answer: "It depends on how often you exhibit. Rental is ideal for 1-3 events per year, offering lower upfront costs and flexibility. Purchasing becomes more cost-effective at 4+ events annually and provides complete brand ownership."
  },
  {
    question: "How much does exhibition stand rental cost?",
    answer: "Rental costs vary based on size and complexity. Basic rental stands start around $5,000-10,000 per event, while premium custom rentals can range from $15,000-50,000+. All rentals include setup and dismantling."
  },
  {
    question: "What's included in exhibition stand rental?",
    answer: "Our rental packages include design consultation, stand fabrication, delivery, professional setup and dismantling, and storage between events. Maintenance and modifications are also included."
  },
  {
    question: "Can I customize a rental exhibition stand?",
    answer: "Yes, rental stands can be customized with your branding, graphics, and messaging. However, structural customization is limited compared to purchased stands. For highly unique designs, purchasing may be preferable."
  }
]

export default async function RentalVsBuyingPage() {
  const seo = await getSEO("rental-vs-buying")
  
  return (
    <>
      <DynamicSchema seo={seo} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://verluxstands.com" },
        { name: "Rental vs Buying", url: "https://verluxstands.com/rental-vs-buying" }
      ]} />
      <FAQSchema faqs={rentalFaqs} />
      <main className="min-h-screen bg-background">
        <Header />
        <PageHeader
          subtitle="Making the Right Choice"
          title="Rental vs Buying: Which Is Right for You?"
          description="Both options have their merits. Let us help you make an informed decision based on your specific needs, budget, and exhibition frequency."
        />
        
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            {/* Benefits Comparison */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {/* Rental Card */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="bg-secondary p-6 border-b border-border">
                  <h2 className="font-serif text-2xl font-bold">Stand Rental</h2>
                  <p className="text-muted-foreground mt-2">Flexibility and convenience</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {rentalBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block mt-8">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Enquire About Rental
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Purchase Card */}
              <div className="bg-card border-2 border-primary rounded-xl overflow-hidden relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Popular Choice
                </div>
                <div className="bg-primary/10 p-6 border-b border-primary/20">
                  <h2 className="font-serif text-2xl font-bold">Stand Purchase</h2>
                  <p className="text-muted-foreground mt-2">Long-term investment</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {purchaseBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block mt-8">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Enquire About Purchase
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mb-20">
              <h2 className="font-serif text-3xl font-bold text-center mb-10">Side-by-Side Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                      <th className="text-center p-4 font-semibold text-foreground">Rental</th>
                      <th className="text-center p-4 font-semibold text-foreground">Purchase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, index) => (
                      <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="p-4 text-foreground">{row.feature}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.rental}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.purchase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Decision Guide */}
            <div className="bg-secondary rounded-xl p-8 md:p-12 border border-border">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-center">
                Still Not Sure? Let Us Help
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Choose Rental If:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-1" />
                      <span>You exhibit at 1-3 events per year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-1" />
                      <span>You want different designs for different shows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-1" />
                      <span>You have limited storage space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-1" />
                      <span>You prefer predictable, all-inclusive pricing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Choose Purchase If:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-1" />
                      <span>You exhibit at 4+ events per year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-1" />
                      <span>Brand consistency is critical</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-1" />
                      <span>You need highly customized features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-1" />
                      <span>You want to build long-term asset value</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Get a Personalized Recommendation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
