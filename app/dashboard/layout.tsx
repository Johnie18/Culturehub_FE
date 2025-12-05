"use client"
import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import useAuth from "./hooks/page"

export default function Page({ children }: { children: React.ReactNode }) {
useAuth();

  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    // Only run on client
    setCurrentTime(new Date())

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // If still server-rendered, show nothing to avoid hydration mismatch
  if (!currentTime) return null

  const formattedTime = currentTime.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset className="bg-gray-100">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* Current Date & Time */}
            <div className="ml-2 text-sm font-medium">{formattedTime}</div>
          </div>
        </header>

        <div className="flex-1 flex-col gap-4 p-4 pt-0 bg-gray-100">
          <div className="bg-gray-50 min-h-full flex-1 rounded-xl md:min-h-min" />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
