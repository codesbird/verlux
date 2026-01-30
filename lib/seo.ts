import { adminDatabase, isAdminInitialized } from "./firebase-admin"
import { SEOPageData, defaultSEOData, defaultSEOPages } from "./types/seo"
import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://verluxstands.com"

// Cache for SEO data to reduce database reads
const seoCache = new Map<string, { data: SEOPageData; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function getSEO(slug: string): Promise<SEOPageData> {
  // Normalize slug
  const normalizedSlug = slug === "/" ? "home" : slug.replace(/^\//, "")
  
  // Check cache first
  const cached = seoCache.get(normalizedSlug)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  // If Firebase Admin is not initialized, return default SEO data
  if (!isAdminInitialized || !adminDatabase) {
    // Check if we have default SEO data for this slug
    const defaultPage = defaultSEOPages.find(p => p.slug === normalizedSlug)
    if (defaultPage) {
      return defaultPage
    }
    return {
      ...defaultSEOData,
      slug: normalizedSlug,
      canonical: `${baseUrl}/${normalizedSlug === "home" ? "" : normalizedSlug}`,
    }
  }

  try {
    const ref = adminDatabase.ref(`seo_pages/${normalizedSlug}`)
    const snapshot = await ref.get()

    if (snapshot.exists()) {
      const data = snapshot.val() as SEOPageData
      const seoData = {
        ...data,
        id: normalizedSlug,
        lastUpdated: data.lastUpdated || null,
      }
      
      // Update cache
      seoCache.set(normalizedSlug, { data: seoData, timestamp: Date.now() })
      return seoData
    }
  } catch (error) {
    console.error(`Error fetching SEO for slug "${normalizedSlug}":`, error)
  }

  // Return default SEO data if not found
  const defaultPage = defaultSEOPages.find(p => p.slug === normalizedSlug)
  if (defaultPage) {
    return defaultPage
  }
  return {
    ...defaultSEOData,
    slug: normalizedSlug,
    canonical: `${baseUrl}/${normalizedSlug === "home" ? "" : normalizedSlug}`,
  }
}

export async function getAllSEOPages(): Promise<SEOPageData[]> {
  // If Firebase Admin is not initialized, return default pages
  if (!isAdminInitialized || !adminDatabase) {
    return defaultSEOPages
  }

  try {
    const ref = adminDatabase.ref("seo_pages")
    const snapshot = await ref.get()
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data).map(([key, value]) => ({
        ...(value as SEOPageData),
        id: key,
      }))
    }
    return defaultSEOPages
  } catch (error) {
    console.error("Error fetching all SEO pages:", error)
    return defaultSEOPages
  }
}

export async function getIndexableSEOPages(): Promise<SEOPageData[]> {
  // If Firebase Admin is not initialized, return default indexable pages
  if (!isAdminInitialized || !adminDatabase) {
    return defaultSEOPages.filter(p => p.index)
  }

  try {
    const ref = adminDatabase.ref("seo_pages")
    const snapshot = await ref.orderByChild("index").equalTo(true).get()
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data).map(([key, value]) => ({
        ...(value as SEOPageData),
        id: key,
      }))
    }
    return defaultSEOPages.filter(p => p.index)
  } catch (error) {
    console.error("Error fetching indexable SEO pages:", error)
    return defaultSEOPages.filter(p => p.index)
  }
}

export function generateMetadataFromSEO(seo: SEOPageData): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical || `${baseUrl}/${seo.slug === "home" ? "" : seo.slug}`,
    },
    robots: {
      index: seo.index,
      follow: seo.follow,
      googleBot: {
        index: seo.index,
        follow: seo.follow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonical || `${baseUrl}/${seo.slug === "home" ? "" : seo.slug}`,
      siteName: "Verlux Stands",
      images: seo.ogImage
        ? [
            {
              url: seo.ogImage.startsWith("http") ? seo.ogImage : `${baseUrl}${seo.ogImage}`,
              width: 1200,
              height: 630,
              alt: seo.ogTitle || seo.title,
            },
          ]
        : [],
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || seo.title,
      description: seo.twitterDescription || seo.description,
      images: seo.ogImage
        ? [seo.ogImage.startsWith("http") ? seo.ogImage : `${baseUrl}${seo.ogImage}`]
        : [],
    },
  }
}

// SEO Validation utilities for admin dashboard
export function validateSEO(seo: SEOPageData): {
  errors: string[]
  warnings: string[]
  score: number
} {
  const errors: string[] = []
  const warnings: string[] = []
  let score = 100

  // Title validation
  if (!seo.title) {
    errors.push("Title is required")
    score -= 20
  } else if (seo.title.length < 30) {
    warnings.push("Title is too short (recommended: 50-60 characters)")
    score -= 5
  } else if (seo.title.length > 60) {
    warnings.push("Title is too long (recommended: 50-60 characters)")
    score -= 5
  }

  // Description validation
  if (!seo.description) {
    errors.push("Description is required")
    score -= 20
  } else if (seo.description.length < 120) {
    warnings.push("Description is too short (recommended: 150-160 characters)")
    score -= 5
  } else if (seo.description.length > 160) {
    warnings.push("Description is too long (recommended: 150-160 characters)")
    score -= 5
  }

  // Keywords validation
  if (!seo.keywords || seo.keywords.length === 0) {
    warnings.push("No keywords defined")
    score -= 5
  } else if (seo.keywords.length < 3) {
    warnings.push("Consider adding more keywords (recommended: 5-10)")
    score -= 2
  }

  // Canonical validation
  if (!seo.canonical) {
    warnings.push("No canonical URL defined")
    score -= 5
  }

  // OpenGraph validation
  if (!seo.ogTitle) {
    warnings.push("OpenGraph title is missing")
    score -= 3
  }
  if (!seo.ogDescription) {
    warnings.push("OpenGraph description is missing")
    score -= 3
  }
  if (!seo.ogImage) {
    warnings.push("OpenGraph image is missing")
    score -= 5
  }

  // Schema validation
  if (!seo.schemaType) {
    warnings.push("Schema type is not defined")
    score -= 5
  }

  return {
    errors,
    warnings,
    score: Math.max(0, score),
  }
}
