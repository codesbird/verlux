import React from "react"
import { Metadata } from "next"
import { getSEO, generateMetadataFromSEO } from "@/lib/seo"

// Generate metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("contact")
  return generateMetadataFromSEO(seo)
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
