"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Search,
  Settings,
  LogOut,
  PlusCircle,
  MapPin,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Pages",
    href: "/admin/dashboard/pages",
    icon: FileText,
  },
  {
    title: "Create Page",
    href: "/admin/dashboard/create",
    icon: PlusCircle,
  },
  {
    title: "SEO Editor",
    href: "/admin/dashboard/seo",
    icon: Search,
  },
  {
    title: "Page Builder",
    href: "/admin/dashboard/builder",
    icon: Layers,
  },
  {
    title: "Sitemap",
    href: "/admin/dashboard/sitemap",
    icon: MapPin,
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { signOut, user } = useAuth()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">V</span>
          </div>
          <span className="font-serif text-lg text-foreground">Verlux CMS</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="mb-3 px-3">
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
