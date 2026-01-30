"use client"

import React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthProvider, useAuth } from "@/lib/auth-context"

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [user, loading, pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!user && pathname !== "/admin/login") {
    return null
  }

  return <>{children}</>
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminAuthGuard>
        {children}
      </AdminAuthGuard>
    </AuthProvider>
  )
}
