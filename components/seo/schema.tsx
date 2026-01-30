import { SEOPageData, SchemaType } from "@/lib/types/seo"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://verluxstands.com"

interface SchemaProps {
  seo: SEOPageData
}

function generateLocalBusinessSchema(customData: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: "Verlux Stands",
    description: "Premium exhibition stand design and build company",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    image: `${baseUrl}/images/hero-stand.jpg`,
    telephone: "+44 20 7123 4567",
    email: "info@verluxstands.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Exhibition Way",
      addressLocality: "London",
      postalCode: "EC1A 1BB",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5074,
      longitude: -0.1278,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
    ...customData,
  }
}

function generateOrganizationSchema(customData: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Verlux Stands",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/verluxstands",
      "https://www.instagram.com/verluxstands",
      "https://twitter.com/verluxstands",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44 20 7123 4567",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    ...customData,
  }
}

function generateServiceSchema(customData: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: customData.serviceName || "Exhibition Stand Design & Build",
    description: customData.serviceDescription || "Complete exhibition stand services including concept development, 3D design, custom fabrication, logistics and installation worldwide.",
    provider: {
      "@type": "Organization",
      name: "Verlux Stands",
      url: baseUrl,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceType: "Exhibition Stand Services",
    ...customData,
  }
}

function generateProductSchema(customData: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: customData.productName || "Custom Exhibition Stand",
    description: customData.productDescription || "Bespoke exhibition stand designed and built to your specifications.",
    brand: {
      "@type": "Brand",
      name: "Verlux Stands",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
    ...customData,
  }
}

function generateFAQSchema(faqs: Array<{ question: string; answer: string }> = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

function generateBreadcrumbSchema(items: Array<{ name: string; url: string }> = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

function getSchemaByType(type: SchemaType, customData: Record<string, unknown> = {}) {
  switch (type) {
    case "LocalBusiness":
      return generateLocalBusinessSchema(customData)
    case "Organization":
      return generateOrganizationSchema(customData)
    case "Service":
      return generateServiceSchema(customData)
    case "Product":
      return generateProductSchema(customData)
    case "FAQPage":
      return generateFAQSchema(customData.faqs as Array<{ question: string; answer: string }>)
    case "BreadcrumbList":
      return generateBreadcrumbSchema(customData.items as Array<{ name: string; url: string }>)
    default:
      return generateOrganizationSchema(customData)
  }
}

export function DynamicSchema({ seo }: SchemaProps) {
  const schema = getSchemaByType(seo.schemaType, seo.schemaData)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Export individual schema generators for direct use
export {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generateServiceSchema,
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  getSchemaByType,
}
