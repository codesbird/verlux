"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { SEOPageData } from "@/lib/types/seo"
import { deleteSEOPage } from "@/lib/actions/seo-actions"
import { Search, ExternalLink, Edit, Trash2, Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function PagesListPage() {
  const [pages, setPages] = useState<SEOPageData[]>([])
  const [filteredPages, setFilteredPages] = useState<SEOPageData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)

  useEffect(() => {
    fetchPages()
  }, [])

  useEffect(() => {
    const filtered = pages.filter(
      (page) =>
        page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPages(filtered)
  }, [searchQuery, pages])

  async function fetchPages() {
    try {
      const snapshot = await getDocs(collection(db, "seo_pages"))
      const pagesData = snapshot.docs.map((doc) => ({
        ...(doc.data() as SEOPageData),
        id: doc.id,
      }))
      setPages(pagesData)
      setFilteredPages(pagesData)
    } catch (error) {
      console.error("Error fetching pages:", error)
      toast.error("Failed to load pages")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(slug: string) {
    setDeletingSlug(slug)
    try {
      const result = await deleteSEOPage(slug)
      if (result.success) {
        setPages((prev) => prev.filter((p) => p.slug !== slug))
        toast.success("Page deleted successfully")
      } else {
        toast.error(result.error || "Failed to delete page")
      }
    } catch (error) {
      console.error("Error deleting page:", error)
      toast.error("Failed to delete page")
    } finally {
      setDeletingSlug(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-foreground">Pages</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your website pages and their SEO settings
            </p>
          </div>
          <Link href="/admin/dashboard/create">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Page
            </Button>
          </Link>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">All Pages ({filteredPages.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary border-border"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : filteredPages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pages found</p>
                <Link href="/admin/dashboard/create">
                  <Button variant="outline" className="mt-4">
                    Create your first page
                  </Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Slug</TableHead>
                    <TableHead className="text-muted-foreground">Title</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Schema</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPages.map((page) => (
                    <TableRow key={page.slug} className="border-border">
                      <TableCell className="font-medium text-foreground">
                        /{page.slug === "home" ? "" : page.slug}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {page.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge
                            variant={page.index ? "default" : "secondary"}
                            className={page.index ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                          >
                            {page.index ? "Index" : "NoIndex"}
                          </Badge>
                          <Badge
                            variant={page.follow ? "default" : "secondary"}
                            className={page.follow ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : ""}
                          >
                            {page.follow ? "Follow" : "NoFollow"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-border">
                          {page.schemaType || "None"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/${page.slug === "home" ? "" : page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                          <Link href={`/admin/dashboard/seo?slug=${page.slug}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-card border-border">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-foreground">Delete Page</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete &quot;/{page.slug}&quot;? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(page.slug)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  disabled={deletingSlug === page.slug}
                                >
                                  {deletingSlug === page.slug ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    "Delete"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
