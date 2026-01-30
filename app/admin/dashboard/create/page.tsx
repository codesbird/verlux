"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SEOPageData, SchemaType, defaultSEOData, PageConfig } from "@/lib/types/seo"
import { createSEOPage, createPageConfig } from "@/lib/actions/seo-actions"
import { Loader2, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { toast } from "sonner"

const layoutOptions = [
  { value: "landing", label: "Landing Page", description: "Full-featured landing page with multiple sections" },
  { value: "service", label: "Service Page", description: "Focused on a single service offering" },
  { value: "city", label: "City/Location Page", description: "Local SEO optimized page for a specific city" },
  { value: "blog", label: "Blog Post", description: "Article-style content page" },
  { value: "custom", label: "Custom Page", description: "Build your own layout with components" },
]

const componentOptions = [
  { id: "hero", label: "Hero Section", description: "Main banner with headline and CTA" },
  { id: "services", label: "Services Grid", description: "Display services in a grid layout" },
  { id: "about", label: "About Section", description: "Company information and values" },
  { id: "testimonials", label: "Testimonials", description: "Client reviews and feedback" },
  { id: "portfolio", label: "Portfolio Gallery", description: "Showcase past projects" },
  { id: "gallery", label: "Image Gallery", description: "Photo grid showcase" },
  { id: "process", label: "Process Steps", description: "How it works section" },
  { id: "cta", label: "Call to Action", description: "Conversion-focused section" },
  { id: "faq", label: "FAQ Section", description: "Frequently asked questions" },
  { id: "contact-form", label: "Contact Form", description: "Lead capture form" },
]

export default function CreatePagePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)

  // Step 1: Basic Info
  const [slug, setSlug] = useState("")
  const [layout, setLayout] = useState<PageConfig["layout"]>("landing")
  const [selectedComponents, setSelectedComponents] = useState<string[]>(["hero", "services", "cta"])

  // Step 2: SEO
  const [seoData, setSeoData] = useState<Partial<SEOPageData>>({
    ...defaultSEOData,
    index: true,
    follow: true,
    schemaType: "Organization",
  })

  function updateSEO(field: keyof SEOPageData, value: unknown) {
    setSeoData((prev) => ({ ...prev, [field]: value }))
  }

  function toggleComponent(componentId: string) {
    setSelectedComponents((prev) =>
      prev.includes(componentId)
        ? prev.filter((c) => c !== componentId)
        : [...prev, componentId]
    )
  }

  async function handleCreate() {
    if (!slug.trim()) {
      toast.error("Please enter a page slug")
      return
    }

    setSaving(true)
    try {
      const normalizedSlug = slug.toLowerCase().replace(/^\//, "").replace(/\s+/g, "-")
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://verluxstands.com"

      // Create SEO page entry
      const seoResult = await createSEOPage({
        ...defaultSEOData,
        ...seoData,
        slug: normalizedSlug,
        canonical: seoData.canonical || `${baseUrl}/${normalizedSlug}`,
        lastUpdated: null,
      } as SEOPageData)

      if (!seoResult.success) {
        throw new Error(seoResult.error)
      }

      // Create page config entry
      const configResult = await createPageConfig({
        slug: normalizedSlug,
        layout,
        components: selectedComponents.map((id, index) => ({
          id: `${id}-${Date.now()}`,
          type: id as PageConfig["components"][0]["type"],
          order: index,
        })),
        isPublished: true,
      })

      if (!configResult.success) {
        throw new Error(configResult.error)
      }

      toast.success("Page created successfully!")
      router.push("/admin/dashboard/pages")
    } catch (error) {
      console.error("Error creating page:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create page")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-foreground">Create New Page</h1>
          <p className="text-muted-foreground mt-1">
            Step {step} of 2: {step === 1 ? "Page Setup" : "SEO Settings"}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
              {step > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <span>Page Setup</span>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
              2
            </div>
            <span>SEO Settings</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Basic Information</CardTitle>
                <CardDescription>Enter the page URL and select a layout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-foreground">Page Slug</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">verluxstands.com/</span>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                      placeholder="my-new-page"
                      className="bg-secondary border-border flex-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use lowercase letters, numbers, and hyphens only
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Layout Type</Label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {layoutOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setLayout(option.value as PageConfig["layout"])}
                        className={`p-4 rounded-lg border text-left transition-colors ${
                          layout === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium text-foreground">{option.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Components</CardTitle>
                <CardDescription>Select which components to include on this page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {componentOptions.map((component) => (
                    <button
                      key={component.id}
                      type="button"
                      onClick={() => toggleComponent(component.id)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        selectedComponents.includes(component.id)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{component.label}</p>
                        {selectedComponents.includes(component.id) && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!slug.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Next: SEO Settings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">SEO Settings</CardTitle>
                <CardDescription>Configure search engine optimization for this page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">
                    Title ({seoData.title?.length || 0}/60)
                  </Label>
                  <Input
                    id="title"
                    value={seoData.title || ""}
                    onChange={(e) => updateSEO("title", e.target.value)}
                    placeholder="Page title for search engines"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Description ({seoData.description?.length || 0}/160)
                  </Label>
                  <Textarea
                    id="description"
                    value={seoData.description || ""}
                    onChange={(e) => updateSEO("description", e.target.value)}
                    placeholder="Meta description for search results"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-foreground">
                    Keywords (comma-separated)
                  </Label>
                  <Input
                    id="keywords"
                    value={seoData.keywords?.join(", ") || ""}
                    onChange={(e) =>
                      updateSEO(
                        "keywords",
                        e.target.value.split(",").map((k) => k.trim()).filter(Boolean)
                      )
                    }
                    placeholder="keyword1, keyword2, keyword3"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ogImage" className="text-foreground">
                      OpenGraph Image
                    </Label>
                    <Input
                      id="ogImage"
                      value={seoData.ogImage || ""}
                      onChange={(e) => updateSEO("ogImage", e.target.value)}
                      placeholder="/images/og-image.jpg"
                      className="bg-secondary border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schemaType" className="text-foreground">
                      Schema Type
                    </Label>
                    <Select
                      value={seoData.schemaType || "Organization"}
                      onValueChange={(value) => updateSEO("schemaType", value as SchemaType)}
                    >
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LocalBusiness">LocalBusiness</SelectItem>
                        <SelectItem value="Organization">Organization</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="FAQPage">FAQPage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <Label className="text-foreground">Allow Indexing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow search engines to index this page
                    </p>
                  </div>
                  <Switch
                    checked={seoData.index ?? true}
                    onCheckedChange={(checked) => updateSEO("index", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Allow Following</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow search engines to follow links
                    </p>
                  </div>
                  <Switch
                    checked={seoData.follow ?? true}
                    onCheckedChange={(checked) => updateSEO("follow", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-border"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleCreate}
                disabled={saving || !slug.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Create Page
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
