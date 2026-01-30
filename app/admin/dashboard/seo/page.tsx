"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { SEOPageData, SchemaType, defaultSEOData } from "@/lib/types/seo"
import { updateSEOPage } from "@/lib/actions/seo-actions"
import {
  Loader2,
  Save,
  AlertCircle,
  CheckCircle,
  Search,
  Eye,
  Globe,
  Share2,
  Code,
} from "lucide-react"
import { toast } from "sonner"

function SEOEditorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const slugParam = searchParams.get("slug")

  const [pages, setPages] = useState<SEOPageData[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string>(slugParam || "")
  const [formData, setFormData] = useState<SEOPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [seoScore, setSeoScore] = useState(0)
  const [seoIssues, setSeoIssues] = useState<{ errors: string[]; warnings: string[] }>({
    errors: [],
    warnings: [],
  })

  useEffect(() => {
    fetchPages()
  }, [])

  useEffect(() => {
    if (slugParam && pages.length > 0) {
      loadPageData(slugParam)
    }
  }, [slugParam, pages])

  useEffect(() => {
    if (formData) {
      validateSEO(formData)
    }
  }, [formData])

  async function fetchPages() {
    try {
      const snapshot = await getDocs(collection(db, "seo_pages"))
      const pagesData = snapshot.docs.map((doc) => ({
        ...(doc.data() as SEOPageData),
        id: doc.id,
      }))
      setPages(pagesData)
    } catch (error) {
      console.error("Error fetching pages:", error)
      toast.error("Failed to load pages")
    } finally {
      setLoading(false)
    }
  }

  async function loadPageData(slug: string) {
    try {
      const docRef = doc(db, "seo_pages", slug)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setFormData({ ...(docSnap.data() as SEOPageData), id: docSnap.id })
      } else {
        toast.error("Page not found")
        setFormData(null)
      }
    } catch (error) {
      console.error("Error loading page:", error)
      toast.error("Failed to load page data")
    }
  }

  function handleSelectPage(slug: string) {
    setSelectedSlug(slug)
    router.push(`/admin/dashboard/seo?slug=${slug}`)
    loadPageData(slug)
  }

  function validateSEO(data: SEOPageData) {
    const errors: string[] = []
    const warnings: string[] = []
    let score = 100

    if (!data.title) {
      errors.push("Title is required")
      score -= 20
    } else if (data.title.length < 30) {
      warnings.push(`Title is too short (${data.title.length}/50-60 chars)`)
      score -= 5
    } else if (data.title.length > 60) {
      warnings.push(`Title is too long (${data.title.length}/50-60 chars)`)
      score -= 5
    }

    if (!data.description) {
      errors.push("Description is required")
      score -= 20
    } else if (data.description.length < 120) {
      warnings.push(`Description is too short (${data.description.length}/150-160 chars)`)
      score -= 5
    } else if (data.description.length > 160) {
      warnings.push(`Description is too long (${data.description.length}/150-160 chars)`)
      score -= 5
    }

    if (!data.keywords || data.keywords.length === 0) {
      warnings.push("No keywords defined")
      score -= 5
    }

    if (!data.canonical) {
      warnings.push("No canonical URL defined")
      score -= 5
    }

    if (!data.ogImage) {
      warnings.push("OpenGraph image is missing")
      score -= 5
    }

    if (!data.schemaType) {
      warnings.push("Schema type is not defined")
      score -= 5
    }

    setSeoScore(Math.max(0, score))
    setSeoIssues({ errors, warnings })
  }

  async function handleSave() {
    if (!formData) return

    setSaving(true)
    try {
      const result = await updateSEOPage(formData.slug, formData)
      if (result.success) {
        toast.success("SEO settings saved successfully")
      } else {
        toast.error(result.error || "Failed to save")
      }
    } catch (error) {
      console.error("Error saving:", error)
      toast.error("Failed to save SEO settings")
    } finally {
      setSaving(false)
    }
  }

  function updateField(field: keyof SEOPageData, value: unknown) {
    if (formData) {
      setFormData({ ...formData, [field]: value })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <main className="ml-64 p-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-foreground">SEO Editor</h1>
            <p className="text-muted-foreground mt-1">
              Edit SEO settings for your pages
            </p>
          </div>
          {formData && (
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Page Selector */}
          <Card className="bg-card border-border lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">Select Page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
              {pages.map((page) => (
                <button
                  key={page.slug}
                  onClick={() => handleSelectPage(page.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedSlug === page.slug
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  /{page.slug === "home" ? "" : page.slug}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Editor */}
          <div className="lg:col-span-3 space-y-6">
            {!formData ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a page to edit its SEO settings</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* SEO Score Card */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground">SEO Score</CardTitle>
                      <Badge
                        variant={seoScore >= 80 ? "default" : seoScore >= 60 ? "secondary" : "destructive"}
                        className={
                          seoScore >= 80
                            ? "bg-green-500/20 text-green-400"
                            : seoScore >= 60
                            ? "bg-yellow-500/20 text-yellow-400"
                            : ""
                        }
                      >
                        {seoScore}/100
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={seoScore} className="h-2 mb-4" />
                    {seoIssues.errors.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {seoIssues.errors.map((error, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-destructive">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                          </div>
                        ))}
                      </div>
                    )}
                    {seoIssues.warnings.length > 0 && (
                      <div className="space-y-2">
                        {seoIssues.warnings.map((warning, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-yellow-500">
                            <AlertCircle className="w-4 h-4" />
                            {warning}
                          </div>
                        ))}
                      </div>
                    )}
                    {seoIssues.errors.length === 0 && seoIssues.warnings.length === 0 && (
                      <div className="flex items-center gap-2 text-sm text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        All SEO checks passed!
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Editor Tabs */}
                <Tabs defaultValue="basic" className="space-y-4">
                  <TabsList className="bg-secondary">
                    <TabsTrigger value="basic" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="social" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Social
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="gap-2">
                      <Globe className="w-4 h-4" />
                      Advanced
                    </TabsTrigger>
                    <TabsTrigger value="schema" className="gap-2">
                      <Code className="w-4 h-4" />
                      Schema
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Basic SEO</CardTitle>
                        <CardDescription>Title, description, and keywords</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-foreground">
                            Title ({formData.title?.length || 0}/60)
                          </Label>
                          <Input
                            id="title"
                            value={formData.title || ""}
                            onChange={(e) => updateField("title", e.target.value)}
                            placeholder="Page title for search engines"
                            className="bg-secondary border-border"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-foreground">
                            Description ({formData.description?.length || 0}/160)
                          </Label>
                          <Textarea
                            id="description"
                            value={formData.description || ""}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Meta description for search results"
                            className="bg-secondary border-border min-h-[100px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="keywords" className="text-foreground">
                            Keywords (comma-separated)
                          </Label>
                          <Input
                            id="keywords"
                            value={formData.keywords?.join(", ") || ""}
                            onChange={(e) =>
                              updateField(
                                "keywords",
                                e.target.value.split(",").map((k) => k.trim()).filter(Boolean)
                              )
                            }
                            placeholder="keyword1, keyword2, keyword3"
                            className="bg-secondary border-border"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="canonical" className="text-foreground">
                            Canonical URL
                          </Label>
                          <Input
                            id="canonical"
                            value={formData.canonical || ""}
                            onChange={(e) => updateField("canonical", e.target.value)}
                            placeholder="https://verluxstands.com/page"
                            className="bg-secondary border-border"
                          />
                        </div>

                        {/* Google Preview */}
                        <div className="pt-4 border-t border-border">
                          <Label className="text-foreground mb-3 block">Google Preview</Label>
                          <div className="bg-secondary rounded-lg p-4">
                            <p className="text-blue-400 text-lg hover:underline cursor-pointer truncate">
                              {formData.title || "Page Title"}
                            </p>
                            <p className="text-green-600 text-sm">
                              {formData.canonical || `https://verluxstands.com/${formData.slug}`}
                            </p>
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                              {formData.description || "Page description will appear here..."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="social">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Social Media</CardTitle>
                        <CardDescription>OpenGraph and Twitter card settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="ogTitle" className="text-foreground">
                            OpenGraph Title
                          </Label>
                          <Input
                            id="ogTitle"
                            value={formData.ogTitle || ""}
                            onChange={(e) => updateField("ogTitle", e.target.value)}
                            placeholder="Title for social sharing"
                            className="bg-secondary border-border"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ogDescription" className="text-foreground">
                            OpenGraph Description
                          </Label>
                          <Textarea
                            id="ogDescription"
                            value={formData.ogDescription || ""}
                            onChange={(e) => updateField("ogDescription", e.target.value)}
                            placeholder="Description for social sharing"
                            className="bg-secondary border-border"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ogImage" className="text-foreground">
                            OpenGraph Image URL
                          </Label>
                          <Input
                            id="ogImage"
                            value={formData.ogImage || ""}
                            onChange={(e) => updateField("ogImage", e.target.value)}
                            placeholder="/images/og-image.jpg or https://..."
                            className="bg-secondary border-border"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitterTitle" className="text-foreground">
                            Twitter Title
                          </Label>
                          <Input
                            id="twitterTitle"
                            value={formData.twitterTitle || ""}
                            onChange={(e) => updateField("twitterTitle", e.target.value)}
                            placeholder="Title for Twitter cards"
                            className="bg-secondary border-border"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitterDescription" className="text-foreground">
                            Twitter Description
                          </Label>
                          <Textarea
                            id="twitterDescription"
                            value={formData.twitterDescription || ""}
                            onChange={(e) => updateField("twitterDescription", e.target.value)}
                            placeholder="Description for Twitter cards"
                            className="bg-secondary border-border"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="advanced">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Advanced Settings</CardTitle>
                        <CardDescription>Indexing and crawling directives</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Allow Indexing</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow search engines to index this page
                            </p>
                          </div>
                          <Switch
                            checked={formData.index}
                            onCheckedChange={(checked) => updateField("index", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Allow Following</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow search engines to follow links on this page
                            </p>
                          </div>
                          <Switch
                            checked={formData.follow}
                            onCheckedChange={(checked) => updateField("follow", checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="schema">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Structured Data</CardTitle>
                        <CardDescription>Schema.org markup for rich results</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="schemaType" className="text-foreground">
                            Schema Type
                          </Label>
                          <Select
                            value={formData.schemaType || ""}
                            onValueChange={(value) => updateField("schemaType", value as SchemaType)}
                          >
                            <SelectTrigger className="bg-secondary border-border">
                              <SelectValue placeholder="Select schema type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LocalBusiness">LocalBusiness</SelectItem>
                              <SelectItem value="Organization">Organization</SelectItem>
                              <SelectItem value="Service">Service</SelectItem>
                              <SelectItem value="Product">Product</SelectItem>
                              <SelectItem value="FAQPage">FAQPage</SelectItem>
                              <SelectItem value="BreadcrumbList">BreadcrumbList</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="schemaData" className="text-foreground">
                            Custom Schema Data (JSON)
                          </Label>
                          <Textarea
                            id="schemaData"
                            value={JSON.stringify(formData.schemaData || {}, null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value)
                                updateField("schemaData", parsed)
                              } catch {
                                // Invalid JSON, don't update
                              }
                            }}
                            placeholder="{}"
                            className="bg-secondary border-border font-mono min-h-[200px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SEOEditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <main className="ml-64 p-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
      </div>
    }>
      <SEOEditorContent />
    </Suspense>
  )
}
