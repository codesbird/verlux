export type SchemaType = "LocalBusiness" | "Product" | "Service" | "Organization" | "FAQPage" | "BreadcrumbList"

export interface SEOPageData {
  id?: string
  slug: string
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  index: boolean
  follow: boolean
  schemaType: SchemaType
  schemaData: Record<string, unknown>
  lastUpdated: Date | null
  createdAt?: Date | null
}

export interface PageConfig {
  id?: string
  slug: string
  layout: "landing" | "service" | "city" | "blog" | "custom"
  components: PageComponent[]
  isPublished: boolean
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface PageComponent {
  id: string
  type: "hero" | "cta" | "testimonials" | "services" | "gallery" | "about" | "process" | "portfolio" | "contact-form" | "faq" | "custom"
  props?: Record<string, unknown>
  order: number
}

export const defaultSEOData: Omit<SEOPageData, "slug"> = {
  title: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
  description: "Award-winning exhibition stand design and build company. Custom trade show booths, modular displays & bespoke exhibition solutions worldwide.",
  keywords: ["exhibition stands", "trade show booths", "exhibition stand design"],
  canonical: "",
  ogTitle: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
  ogDescription: "Award-winning exhibition stand design and build company.",
  ogImage: "/images/hero-stand.jpg",
  twitterTitle: "Verlux Stands | Premium Exhibition Stand Design & Build",
  twitterDescription: "Award-winning exhibition stand design and build company.",
  index: true,
  follow: true,
  schemaType: "Organization",
  schemaData: {},
  lastUpdated: null,
}

const baseUrl = "https://verluxstands.com"

// Default SEO pages for fallback when Firebase Admin is not configured
export const defaultSEOPages: SEOPageData[] = [
  {
    slug: "home",
    title: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
    description: "Award-winning exhibition stand design and build company. Custom trade show booths, modular displays & bespoke exhibition solutions worldwide.",
    keywords: ["exhibition stands", "trade show booths", "exhibition design", "custom stands"],
    canonical: baseUrl,
    ogTitle: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
    ogDescription: "Award-winning exhibition stand design and build company.",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "Verlux Stands | Premium Exhibition Stand Design & Build",
    twitterDescription: "Award-winning exhibition stand design and build company.",
    index: true,
    follow: true,
    schemaType: "Organization",
    schemaData: {},
    lastUpdated: null,
  },
  {
    slug: "about",
    title: "About Verlux Stands | 15+ Years of Exhibition Excellence",
    description: "Verlux Stands has been crafting exhibition excellence since 2009. 500+ projects, 30+ countries, 98% client satisfaction.",
    keywords: ["about Verlux Stands", "exhibition stand company", "trade show booth builder"],
    canonical: `${baseUrl}/about`,
    ogTitle: "About Verlux Stands | 15+ Years of Exhibition Excellence",
    ogDescription: "Award-winning exhibition stand company since 2009.",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "About Verlux Stands",
    twitterDescription: "Award-winning exhibition stand company since 2009.",
    index: true,
    follow: true,
    schemaType: "Organization",
    schemaData: {},
    lastUpdated: null,
  },
  {
    slug: "services",
    title: "Exhibition Stand Services | Design, Build & Installation",
    description: "Complete exhibition stand services: concept development, 3D design, custom fabrication, logistics & installation.",
    keywords: ["exhibition stand services", "trade show booth design", "stand fabrication"],
    canonical: `${baseUrl}/services`,
    ogTitle: "Exhibition Stand Services | Verlux Stands",
    ogDescription: "Complete exhibition stand services from concept to installation.",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "Exhibition Stand Services",
    twitterDescription: "Complete exhibition stand services from concept to installation.",
    index: true,
    follow: true,
    schemaType: "Service",
    schemaData: {},
    lastUpdated: null,
  },
  {
    slug: "portfolio",
    title: "Exhibition Stand Portfolio | Award-Winning Projects",
    description: "Browse our portfolio of 500+ exhibition stands across technology, automotive, healthcare, fashion & more.",
    keywords: ["exhibition stand portfolio", "trade show booth examples", "exhibition design case studies"],
    canonical: `${baseUrl}/portfolio`,
    ogTitle: "Exhibition Stand Portfolio | Verlux Stands",
    ogDescription: "Browse 500+ award-winning exhibition stand projects.",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "Exhibition Stand Portfolio",
    twitterDescription: "Browse 500+ award-winning exhibition stand projects.",
    index: true,
    follow: true,
    schemaType: "Organization",
    schemaData: {},
    lastUpdated: null,
  },
  {
    slug: "contact",
    title: "Contact Us | Get a Free Exhibition Stand Quote",
    description: "Contact Verlux Stands for a free consultation and quote. Response within 24 hours.",
    keywords: ["contact Verlux Stands", "exhibition stand quote", "trade show booth enquiry"],
    canonical: `${baseUrl}/contact`,
    ogTitle: "Contact Us | Verlux Stands",
    ogDescription: "Get a free exhibition stand consultation and quote.",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "Contact Verlux Stands",
    twitterDescription: "Get a free exhibition stand consultation and quote.",
    index: true,
    follow: true,
    schemaType: "LocalBusiness",
    schemaData: {},
    lastUpdated: null,
  },
  {
    slug: "testimonials",
    title: "Client Testimonials & Reviews | Exhibition Stand Success Stories",
    description: "Read verified reviews from Fortune 500 companies and innovative startups. 98% client satisfaction rate.",
    keywords: ["exhibition stand reviews", "trade show booth testimonials", "Verlux Stands reviews"],
    canonical: `${baseUrl}/testimonials`,
    ogTitle: "Client Testimonials | Verlux Stands",
    ogDescription: "Read verified reviews from leading brands.",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "Client Testimonials",
    twitterDescription: "Read verified reviews from leading brands.",
    index: true,
    follow: true,
    schemaType: "Organization",
    schemaData: {},
    lastUpdated: null,
  },
  {
    slug: "trade-show-calendar",
    title: "Trade Show Calendar 2026 | Major Exhibitions & Events Worldwide",
    description: "Plan your exhibition presence with our 2026 trade show calendar. CES, Mobile World Congress, Hannover Messe & more.",
    keywords: ["trade show calendar 2026", "exhibition calendar", "upcoming trade shows"],
    canonical: `${baseUrl}/trade-show-calendar`,
    ogTitle: "Trade Show Calendar 2026 | Verlux Stands",
    ogDescription: "Explore major trade shows and exhibitions worldwide.",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "Trade Show Calendar 2026",
    twitterDescription: "Explore major trade shows and exhibitions worldwide.",
    index: true,
    follow: true,
    schemaType: "Organization",
    schemaData: {},
    lastUpdated: null,
  },
  {
    slug: "rental-vs-buying",
    title: "Exhibition Stand Rental vs Buying | Complete Comparison Guide",
    description: "Should you rent or buy an exhibition stand? Compare costs, benefits & ROI.",
    keywords: ["exhibition stand rental", "buy vs rent trade show booth", "exhibition stand hire"],
    canonical: `${baseUrl}/rental-vs-buying`,
    ogTitle: "Exhibition Stand Rental vs Buying | Verlux Stands",
    ogDescription: "Complete comparison guide: Should you rent or buy an exhibition stand?",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "Exhibition Stand Rental vs Buying",
    twitterDescription: "Complete comparison guide for exhibition stands.",
    index: true,
    follow: true,
    schemaType: "FAQPage",
    schemaData: {},
    lastUpdated: null,
  },
  {
    slug: "major-cities",
    title: "Exhibition Stand Services by Location | London, Frankfurt, Las Vegas & More",
    description: "Verlux Stands delivers exhibition solutions in 30+ countries. Local expertise, global standards.",
    keywords: ["exhibition stands London", "trade show booths Frankfurt", "exhibition builders Las Vegas"],
    canonical: `${baseUrl}/major-cities`,
    ogTitle: "Exhibition Stand Services Worldwide | Verlux Stands",
    ogDescription: "Exhibition stand design & build in 30+ countries.",
    ogImage: "/images/hero-stand.jpg",
    twitterTitle: "Exhibition Stand Services Worldwide",
    twitterDescription: "Exhibition stand design & build in 30+ countries.",
    index: true,
    follow: true,
    schemaType: "Organization",
    schemaData: {},
    lastUpdated: null,
  },
]
