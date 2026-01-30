"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { SEOPageData } from "@/lib/types/seo"
import { Loader2, ExternalLink, RefreshCw, Globe, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"

export default function SitemapPage() {
  const [pages, setPages] = useState<SEOPageData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://verluxstands.com"

  useEffect(() => {
    fetchPages()
  }, [])

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

  async function handleRefresh() {
    setRefreshing(true)
    await fetchPages()
    setRefreshing(false)
    toast.success("Sitemap data refreshed")
  }

  const indexedPages = pages.filter((p) => p.index)
  const noIndexPages = pages.filter((p) => !p.index)

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-foreground">Sitemap</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your sitemap for search engines
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="border-border"
            >
              {refreshing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh
            </Button>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <ExternalLink className="w-4 h-4 mr-2" />
                View sitemap.xml
              </Button>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">
                  {loading ? "..." : pages.length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Indexed Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-foreground">
                  {loading ? "..." : indexedPages.length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">NoIndex Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-foreground">
                  {loading ? "..." : noIndexPages.length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Indexed Pages */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Indexed Pages ({indexedPages.length})
            </CardTitle>
            <CardDescription>
              These pages are included in your sitemap.xml and will be crawled by search engines
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : indexedPages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No indexed pages found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">URL</TableHead>
                    <TableHead className="text-muted-foreground">Title</TableHead>
                    <TableHead className="text-muted-foreground">Schema</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indexedPages.map((page) => (
                    <TableRow key={page.slug} className="border-border">
                      <TableCell className="font-mono text-sm">
                        <a
                          href={`${baseUrl}/${page.slug === "home" ? "" : page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {baseUrl}/{page.slug === "home" ? "" : page.slug}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {page.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-border">
                          {page.schemaType || "None"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Index
                          </Badge>
                          {page.follow && (
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              Follow
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* NoIndex Pages */}
        {noIndexPages.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <XCircle className="w-5 h-5 text-yellow-500" />
                NoIndex Pages ({noIndexPages.length})
              </CardTitle>
              <CardDescription>
                These pages are excluded from your sitemap and search engine indexing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">URL</TableHead>
                    <TableHead className="text-muted-foreground">Title</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {noIndexPages.map((page) => (
                    <TableRow key={page.slug} className="border-border">
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {baseUrl}/{page.slug === "home" ? "" : page.slug}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {page.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">NoIndex</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Sitemap Preview */}
        <Card className="bg-card border-border mt-6">
          <CardHeader>
            <CardTitle className="text-foreground">Sitemap XML Preview</CardTitle>
            <CardDescription>
              A preview of what your sitemap.xml will look like
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary rounded-lg p-4 overflow-x-auto text-sm text-muted-foreground font-mono">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexedPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}/${page.slug === "home" ? "" : page.slug}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.slug === "home" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`}
            </pre>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
