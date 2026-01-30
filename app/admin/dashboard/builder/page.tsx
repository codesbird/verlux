"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { PageConfig, PageComponent } from "@/lib/types/seo"
import { updatePageConfig } from "@/lib/actions/seo-actions"
import {
  Loader2,
  Save,
  GripVertical,
  Plus,
  Trash2,
  Eye,
  Layers,
  Layout,
  Megaphone,
  Users,
  Briefcase,
  Settings,
  MessageSquare,
  HelpCircle,
  Mail,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

const componentMeta: Record<string, { icon: typeof Layers; label: string; description: string }> = {
  hero: { icon: Layout, label: "Hero Section", description: "Main banner with headline and CTA" },
  services: { icon: Briefcase, label: "Services Grid", description: "Display services in a grid layout" },
  about: { icon: Users, label: "About Section", description: "Company information and values" },
  testimonials: { icon: MessageSquare, label: "Testimonials", description: "Client reviews and feedback" },
  portfolio: { icon: Layers, label: "Portfolio Gallery", description: "Showcase past projects" },
  gallery: { icon: Layers, label: "Image Gallery", description: "Photo grid showcase" },
  process: { icon: Settings, label: "Process Steps", description: "How it works section" },
  cta: { icon: Megaphone, label: "Call to Action", description: "Conversion-focused section" },
  faq: { icon: HelpCircle, label: "FAQ Section", description: "Frequently asked questions" },
  "contact-form": { icon: Mail, label: "Contact Form", description: "Lead capture form" },
  custom: { icon: Sparkles, label: "Custom Block", description: "Custom HTML/component" },
}

function SortableComponent({
  component,
  onRemove,
}: {
  component: PageComponent
  onRemove: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: component.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const meta = componentMeta[component.type] || componentMeta.custom
  const Icon = meta.icon

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-secondary rounded-lg border border-border group"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-foreground">{meta.label}</p>
        <p className="text-sm text-muted-foreground">{meta.description}</p>
      </div>
      <Badge variant="outline" className="border-border">
        Order: {component.order + 1}
      </Badge>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(component.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

function PageBuilderContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const slugParam = searchParams.get("slug")

  const [pages, setPages] = useState<PageConfig[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string>(slugParam || "")
  const [pageConfig, setPageConfig] = useState<PageConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    fetchPages()
  }, [])

  useEffect(() => {
    if (slugParam) {
      loadPageConfig(slugParam)
    }
  }, [slugParam])

  async function fetchPages() {
    try {
      const snapshot = await getDocs(collection(db, "page_configs"))
      const pagesData = snapshot.docs.map((doc) => ({
        ...(doc.data() as PageConfig),
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

  async function loadPageConfig(slug: string) {
    try {
      const docRef = doc(db, "page_configs", slug)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data() as PageConfig
        // Ensure components have proper IDs
        const components = (data.components || []).map((c, i) => ({
          ...c,
          id: c.id || `${c.type}-${Date.now()}-${i}`,
          order: c.order ?? i,
        }))
        setPageConfig({ ...data, id: docSnap.id, components })
      } else {
        toast.error("Page config not found")
        setPageConfig(null)
      }
    } catch (error) {
      console.error("Error loading page config:", error)
      toast.error("Failed to load page config")
    }
  }

  function handleSelectPage(slug: string) {
    setSelectedSlug(slug)
    router.push(`/admin/dashboard/builder?slug=${slug}`)
    loadPageConfig(slug)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id && pageConfig) {
      const oldIndex = pageConfig.components.findIndex((c) => c.id === active.id)
      const newIndex = pageConfig.components.findIndex((c) => c.id === over.id)

      const newComponents = arrayMove(pageConfig.components, oldIndex, newIndex).map((c, i) => ({
        ...c,
        order: i,
      }))

      setPageConfig({ ...pageConfig, components: newComponents })
    }
  }

  function addComponent(type: PageComponent["type"]) {
    if (!pageConfig) return

    const newComponent: PageComponent = {
      id: `${type}-${Date.now()}`,
      type,
      order: pageConfig.components.length,
    }

    setPageConfig({
      ...pageConfig,
      components: [...pageConfig.components, newComponent],
    })
  }

  function removeComponent(id: string) {
    if (!pageConfig) return

    const newComponents = pageConfig.components
      .filter((c) => c.id !== id)
      .map((c, i) => ({ ...c, order: i }))

    setPageConfig({ ...pageConfig, components: newComponents })
  }

  async function handleSave() {
    if (!pageConfig) return

    setSaving(true)
    try {
      const result = await updatePageConfig(pageConfig.slug, {
        components: pageConfig.components,
        layout: pageConfig.layout,
        isPublished: pageConfig.isPublished,
      })

      if (result.success) {
        toast.success("Page config saved successfully")
      } else {
        toast.error(result.error || "Failed to save")
      }
    } catch (error) {
      console.error("Error saving:", error)
      toast.error("Failed to save page config")
    } finally {
      setSaving(false)
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
            <h1 className="text-3xl font-serif text-foreground">Page Builder</h1>
            <p className="text-muted-foreground mt-1">
              Drag and drop components to build your page layout
            </p>
          </div>
          <div className="flex gap-3">
            {pageConfig && (
              <>
                <a
                  href={`/${pageConfig.slug === "home" ? "" : pageConfig.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-border">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </a>
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
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Page Selector */}
          <Card className="bg-card border-border lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">Select Page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
              {pages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No pages found. Create a page first.</p>
              ) : (
                pages.map((page) => (
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
                ))
              )}
            </CardContent>
          </Card>

          {/* Builder Area */}
          <div className="lg:col-span-3 space-y-6">
            {!pageConfig ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Layers className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a page to edit its layout</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Layout Settings */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Layout Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground mb-2 block">Layout Type</label>
                        <Select
                          value={pageConfig.layout}
                          onValueChange={(value) =>
                            setPageConfig({ ...pageConfig, layout: value as PageConfig["layout"] })
                          }
                        >
                          <SelectTrigger className="bg-secondary border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="landing">Landing Page</SelectItem>
                            <SelectItem value="service">Service Page</SelectItem>
                            <SelectItem value="city">City/Location Page</SelectItem>
                            <SelectItem value="blog">Blog Post</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Status</label>
                        <Badge
                          variant={pageConfig.isPublished ? "default" : "secondary"}
                          className={pageConfig.isPublished ? "bg-green-500/20 text-green-400" : ""}
                        >
                          {pageConfig.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Components */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Page Components</CardTitle>
                    <CardDescription>Drag to reorder, click to configure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pageConfig.components.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                        <p className="text-muted-foreground mb-4">No components added yet</p>
                        <p className="text-sm text-muted-foreground">
                          Add components from the panel below
                        </p>
                      </div>
                    ) : (
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={pageConfig.components.map((c) => c.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-3">
                            {pageConfig.components
                              .sort((a, b) => a.order - b.order)
                              .map((component) => (
                                <SortableComponent
                                  key={component.id}
                                  component={component}
                                  onRemove={removeComponent}
                                />
                              ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    )}
                  </CardContent>
                </Card>

                {/* Add Components */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Add Component</CardTitle>
                    <CardDescription>Click a component to add it to the page</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.entries(componentMeta).map(([type, meta]) => {
                        const Icon = meta.icon
                        return (
                          <button
                            key={type}
                            onClick={() => addComponent(type as PageComponent["type"])}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-colors text-left"
                          >
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{meta.label}</p>
                            </div>
                            <Plus className="w-4 h-4 text-muted-foreground ml-auto" />
                          </button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function PageBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <AdminSidebar />
          <main className="ml-64 p-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </main>
        </div>
      }
    >
      <PageBuilderContent />
    </Suspense>
  )
}
