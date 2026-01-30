import { MetadataRoute } from "next"
import { getIndexableSEOPages } from "@/lib/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://verluxstands.com"

  try {
    // Fetch all indexable pages from Firestore
    const seoPages = await getIndexableSEOPages()

    if (seoPages.length > 0) {
      // Generate sitemap from CMS data
      return seoPages.map((page) => {
        const url = page.slug === "home" ? baseUrl : `${baseUrl}/${page.slug}`
        const lastModified = page.lastUpdated 
          ? new Date(page.lastUpdated instanceof Date ? page.lastUpdated : (page.lastUpdated as { toDate?: () => Date }).toDate?.() || new Date())
          : new Date()
        
        // Determine priority based on page type
        let priority = 0.8
        if (page.slug === "home") priority = 1.0
        else if (["services", "portfolio", "contact"].includes(page.slug)) priority = 0.9
        else if (["about", "testimonials"].includes(page.slug)) priority = 0.8
        else priority = 0.7

        return {
          url,
          lastModified,
          changeFrequency: page.slug === "home" ? "weekly" : "monthly" as const,
          priority,
        }
      })
    }
  } catch (error) {
    console.error("Error fetching SEO pages for sitemap:", error)
  }

  // Fallback to static sitemap if Firestore fails or has no data
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rental-vs-buying`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trade-show-calendar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/major-cities`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
