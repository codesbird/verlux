export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Verlux Stands",
    "alternateName": "Verlux Exhibition Stands",
    "url": "https://verluxstands.com",
    "logo": "https://verluxstands.com/images/logo.png",
    "description": "Award-winning exhibition stand design and build company. Custom trade show booths, modular displays & bespoke exhibition solutions worldwide.",
    "foundingDate": "2009",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 50,
      "maxValue": 100
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Exhibition Way",
      "addressLocality": "London",
      "postalCode": "EC1V 9NR",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-20-1234-5678",
      "contactType": "customer service",
      "email": "hello@verluxstands.com",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/verluxstands",
      "https://www.instagram.com/verluxstands",
      "https://www.facebook.com/verluxstands"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "serviceArea": [
      {
        "@type": "Place",
        "name": "United Kingdom"
      },
      {
        "@type": "Place",
        "name": "Germany"
      },
      {
        "@type": "Place",
        "name": "United States"
      },
      {
        "@type": "Place",
        "name": "United Arab Emirates"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Verlux Stands",
    "image": "https://verluxstands.com/images/hero-stand.jpg",
    "@id": "https://verluxstands.com",
    "url": "https://verluxstands.com",
    "telephone": "+44-20-1234-5678",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Exhibition Way",
      "addressLocality": "London",
      "postalCode": "EC1V 9NR",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5074,
      "longitude": -0.1278
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema({ serviceName, description }: { serviceName: string; description: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "Organization",
      "name": "Verlux Stands",
      "url": "https://verluxstands.com"
    },
    "description": description,
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ReviewSchema({ reviews }: { reviews: { author: string; rating: number; reviewBody: string }[] }) {
  const aggregateRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Verlux Exhibition Stand Services",
    "description": "Custom exhibition stand design and build services",
    "brand": {
      "@type": "Brand",
      "name": "Verlux Stands"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.toFixed(1),
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
