"use server"

import { adminDb } from "@/lib/firebase-admin"
import { SEOPageData, PageConfig } from "@/lib/types/seo"
import { revalidatePath, revalidateTag } from "next/cache"

// SEO Page Actions
export async function createSEOPage(data: SEOPageData) {
  try {
    const slug = data.slug.replace(/^\//, "")
    const docRef = adminDb.collection("seo_pages").doc(slug)
    
    await docRef.set({
      ...data,
      slug,
      createdAt: new Date(),
      lastUpdated: new Date(),
    })

    revalidatePath(`/${slug}`)
    revalidateTag("seo-pages", "max")
    
    return { success: true, id: slug }
  } catch (error) {
    console.error("Error creating SEO page:", error)
    return { success: false, error: "Failed to create SEO page" }
  }
}

export async function updateSEOPage(slug: string, data: Partial<SEOPageData>) {
  try {
    const normalizedSlug = slug.replace(/^\//, "")
    const docRef = adminDb.collection("seo_pages").doc(normalizedSlug)
    
    await docRef.update({
      ...data,
      lastUpdated: new Date(),
    })

    revalidatePath(`/${normalizedSlug}`)
    revalidateTag("seo-pages", "max")
    
    return { success: true }
  } catch (error) {
    console.error("Error updating SEO page:", error)
    return { success: false, error: "Failed to update SEO page" }
  }
}

export async function deleteSEOPage(slug: string) {
  try {
    const normalizedSlug = slug.replace(/^\//, "")
    await adminDb.collection("seo_pages").doc(normalizedSlug).delete()

    revalidatePath(`/${normalizedSlug}`)
    revalidateTag("seo-pages", "max")
    
    return { success: true }
  } catch (error) {
    console.error("Error deleting SEO page:", error)
    return { success: false, error: "Failed to delete SEO page" }
  }
}

export async function getSEOPageBySlug(slug: string): Promise<SEOPageData | null> {
  try {
    const normalizedSlug = slug.replace(/^\//, "") || "home"
    const doc = await adminDb.collection("seo_pages").doc(normalizedSlug).get()
    
    if (doc.exists) {
      return { ...(doc.data() as SEOPageData), id: doc.id }
    }
    return null
  } catch (error) {
    console.error("Error fetching SEO page:", error)
    return null
  }
}

export async function getAllSEOPagesAction(): Promise<SEOPageData[]> {
  try {
    const snapshot = await adminDb.collection("seo_pages").get()
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as SEOPageData),
      id: doc.id,
    }))
  } catch (error) {
    console.error("Error fetching all SEO pages:", error)
    return []
  }
}

// Page Config Actions (for Page Builder)
export async function createPageConfig(data: PageConfig) {
  try {
    const slug = data.slug.replace(/^\//, "")
    const docRef = adminDb.collection("page_configs").doc(slug)
    
    await docRef.set({
      ...data,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath(`/${slug}`)
    
    return { success: true, id: slug }
  } catch (error) {
    console.error("Error creating page config:", error)
    return { success: false, error: "Failed to create page config" }
  }
}

export async function updatePageConfig(slug: string, data: Partial<PageConfig>) {
  try {
    const normalizedSlug = slug.replace(/^\//, "")
    const docRef = adminDb.collection("page_configs").doc(normalizedSlug)
    
    await docRef.update({
      ...data,
      updatedAt: new Date(),
    })

    revalidatePath(`/${normalizedSlug}`)
    
    return { success: true }
  } catch (error) {
    console.error("Error updating page config:", error)
    return { success: false, error: "Failed to update page config" }
  }
}

export async function deletePageConfig(slug: string) {
  try {
    const normalizedSlug = slug.replace(/^\//, "")
    await adminDb.collection("page_configs").doc(normalizedSlug).delete()

    revalidatePath(`/${normalizedSlug}`)
    
    return { success: true }
  } catch (error) {
    console.error("Error deleting page config:", error)
    return { success: false, error: "Failed to delete page config" }
  }
}

export async function getPageConfigBySlug(slug: string): Promise<PageConfig | null> {
  try {
    const normalizedSlug = slug.replace(/^\//, "") || "home"
    const doc = await adminDb.collection("page_configs").doc(normalizedSlug).get()
    
    if (doc.exists) {
      return { ...(doc.data() as PageConfig), id: doc.id }
    }
    return null
  } catch (error) {
    console.error("Error fetching page config:", error)
    return null
  }
}

export async function getAllPageConfigs(): Promise<PageConfig[]> {
  try {
    const snapshot = await adminDb.collection("page_configs").get()
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as PageConfig),
      id: doc.id,
    }))
  } catch (error) {
    console.error("Error fetching all page configs:", error)
    return []
  }
}

// Seed initial SEO data for existing pages
export async function seedInitialSEOData() {
  const pages = [
    {
      slug: "home",
      title: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
      description: "Award-winning exhibition stand design and build company. Custom trade show booths, modular displays & bespoke exhibition solutions worldwide. 15+ years experience, 500+ projects delivered.",
      keywords: ["exhibition stands", "trade show booths", "exhibition stand design", "custom exhibition stands"],
      canonical: "https://verluxstands.com",
      ogTitle: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
      ogDescription: "Award-winning exhibition stand design company creating custom trade show booths and bespoke exhibition solutions worldwide.",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "Verlux Stands | Premium Exhibition Stand Design & Build",
      twitterDescription: "Award-winning exhibition stand design company.",
      index: true,
      follow: true,
      schemaType: "LocalBusiness" as const,
      schemaData: {},
    },
    {
      slug: "services",
      title: "Exhibition Stand Services | Design, Build & Installation",
      description: "Complete exhibition stand services: concept development, 3D design, custom fabrication, logistics & installation. End-to-end trade show booth solutions for businesses worldwide.",
      keywords: ["exhibition stand services", "trade show booth design", "stand fabrication", "exhibition installation"],
      canonical: "https://verluxstands.com/services",
      ogTitle: "Exhibition Stand Services | Verlux Stands",
      ogDescription: "Complete exhibition stand services from concept to installation.",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "Exhibition Stand Services | Verlux Stands",
      twitterDescription: "Complete exhibition stand services from concept to installation.",
      index: true,
      follow: true,
      schemaType: "Service" as const,
      schemaData: {},
    },
    {
      slug: "portfolio",
      title: "Exhibition Stand Portfolio | Award-Winning Projects & Case Studies",
      description: "Browse our portfolio of 500+ exhibition stands across technology, automotive, healthcare, fashion & more. Award-winning designs from Las Vegas to Frankfurt, Milan to Dubai.",
      keywords: ["exhibition stand portfolio", "trade show booth examples", "exhibition design case studies"],
      canonical: "https://verluxstands.com/portfolio",
      ogTitle: "Exhibition Stand Portfolio | Verlux Stands",
      ogDescription: "Browse 500+ award-winning exhibition stand projects from around the world.",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "Exhibition Stand Portfolio | Verlux Stands",
      twitterDescription: "Browse 500+ award-winning exhibition stand projects.",
      index: true,
      follow: true,
      schemaType: "Organization" as const,
      schemaData: {},
    },
    {
      slug: "about",
      title: "About Verlux Stands | 15+ Years of Exhibition Excellence",
      description: "Verlux Stands has been crafting exhibition excellence since 2009. 500+ projects, 30+ countries, 98% client satisfaction. Meet our team of architects, designers & craftsmen.",
      keywords: ["about Verlux Stands", "exhibition stand company", "trade show booth builder"],
      canonical: "https://verluxstands.com/about",
      ogTitle: "About Verlux Stands | 15+ Years of Exhibition Excellence",
      ogDescription: "Award-winning exhibition stand company since 2009.",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "About Verlux Stands",
      twitterDescription: "Award-winning exhibition stand company since 2009.",
      index: true,
      follow: true,
      schemaType: "Organization" as const,
      schemaData: {},
    },
    {
      slug: "contact",
      title: "Contact Verlux Stands | Get a Free Exhibition Stand Quote",
      description: "Contact our exhibition stand experts for a free consultation. Get quotes for custom trade show booths, modular displays & bespoke exhibition solutions. Response within 24 hours.",
      keywords: ["contact Verlux Stands", "exhibition stand quote", "trade show booth inquiry"],
      canonical: "https://verluxstands.com/contact",
      ogTitle: "Contact Verlux Stands | Get a Free Quote",
      ogDescription: "Contact our exhibition stand experts for a free consultation.",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "Contact Verlux Stands",
      twitterDescription: "Contact our exhibition stand experts for a free consultation.",
      index: true,
      follow: true,
      schemaType: "LocalBusiness" as const,
      schemaData: {},
    },
    {
      slug: "testimonials",
      title: "Client Testimonials & Reviews | Exhibition Stand Success Stories",
      description: "Read verified reviews from Fortune 500 companies and innovative startups. 98% client satisfaction rate. Discover why leading brands trust Verlux Stands.",
      keywords: ["exhibition stand reviews", "trade show booth testimonials", "Verlux Stands reviews"],
      canonical: "https://verluxstands.com/testimonials",
      ogTitle: "Client Testimonials | Verlux Stands",
      ogDescription: "Read verified reviews from leading brands. 98% client satisfaction.",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "Client Testimonials | Verlux Stands",
      twitterDescription: "Read verified reviews from leading brands.",
      index: true,
      follow: true,
      schemaType: "Organization" as const,
      schemaData: {},
    },
    {
      slug: "trade-show-calendar",
      title: "Trade Show Calendar 2026 | Major Exhibitions & Events Worldwide",
      description: "Plan your exhibition presence with our 2026 trade show calendar. CES, Mobile World Congress, Hannover Messe, Gitex & more.",
      keywords: ["trade show calendar 2026", "exhibition calendar", "upcoming trade shows"],
      canonical: "https://verluxstands.com/trade-show-calendar",
      ogTitle: "Trade Show Calendar 2026 | Verlux Stands",
      ogDescription: "Explore major trade shows and exhibitions worldwide.",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "Trade Show Calendar 2026",
      twitterDescription: "Explore major trade shows and exhibitions worldwide.",
      index: true,
      follow: true,
      schemaType: "Organization" as const,
      schemaData: {},
    },
    {
      slug: "rental-vs-buying",
      title: "Exhibition Stand Rental vs Buying | Complete Comparison Guide",
      description: "Should you rent or buy an exhibition stand? Compare costs, benefits & ROI. Expert advice from Verlux Stands.",
      keywords: ["exhibition stand rental", "buy vs rent trade show booth", "exhibition stand hire"],
      canonical: "https://verluxstands.com/rental-vs-buying",
      ogTitle: "Exhibition Stand Rental vs Buying | Verlux Stands",
      ogDescription: "Complete comparison guide: Should you rent or buy an exhibition stand?",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "Rental vs Buying | Verlux Stands",
      twitterDescription: "Complete comparison guide for exhibition stands.",
      index: true,
      follow: true,
      schemaType: "FAQPage" as const,
      schemaData: {
        faqs: [
          { question: "Should I rent or buy an exhibition stand?", answer: "It depends on how often you exhibit. Rental is ideal for 1-3 events per year." },
          { question: "How much does exhibition stand rental cost?", answer: "Rental costs vary based on size and complexity, starting around $5,000-10,000 per event." },
        ],
      },
    },
    {
      slug: "major-cities",
      title: "Exhibition Stand Services by Location | London, Frankfurt, Las Vegas & More",
      description: "Verlux Stands delivers exhibition solutions in 30+ countries. London, Frankfurt, Las Vegas, Dubai, Singapore, Barcelona, Paris & Chicago.",
      keywords: ["exhibition stands London", "trade show booths Frankfurt", "exhibition builders Las Vegas"],
      canonical: "https://verluxstands.com/major-cities",
      ogTitle: "Exhibition Stand Services Worldwide | Verlux Stands",
      ogDescription: "Exhibition stand design & build in 30+ countries.",
      ogImage: "/images/hero-stand.jpg",
      twitterTitle: "Global Locations | Verlux Stands",
      twitterDescription: "Exhibition stand services in 30+ countries.",
      index: true,
      follow: true,
      schemaType: "Organization" as const,
      schemaData: {},
    },
  ]

  try {
    const batch = adminDb.batch()
    
    for (const page of pages) {
      const docRef = adminDb.collection("seo_pages").doc(page.slug)
      batch.set(docRef, {
        ...page,
        createdAt: new Date(),
        lastUpdated: new Date(),
      })
    }

    await batch.commit()
    return { success: true, message: `Seeded ${pages.length} pages` }
  } catch (error) {
    console.error("Error seeding SEO data:", error)
    return { success: false, error: "Failed to seed SEO data" }
  }
}
