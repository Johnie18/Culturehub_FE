"use client"
import { useState, useEffect } from "react"
import { AppSidebar } from "@/app/dashboard/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import useAuth from "./hooks/page"
import { SkeletonCard } from "./components/skeleton"

export default function Page({ children }: { children: React.ReactNode }) {
  const authLoading = useAuth();
  const [seconds, setSeconds] = useState(0);
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
    if(authLoading){
      return(
    <div className="min-h-screen flex items-center justify-center">
        <SkeletonCard/>
    </div>
    );
  }
  return (
<SidebarProvider>
  <AppSidebar />

  <SidebarInset className="flex flex-col bg-gray-100 min-h-screen">
<header className="sticky top-0 z-50 bg-blue-200 flex h-16 items-center px-4">
  {/* Left controls */}
  <div className="flex items-center gap-2">
    <SidebarTrigger className="-ml-1" />
    <Separator orientation="vertical" className="h-4 mx-2" />
  </div>

  <div className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
    WELCOME TO ADMIN DASHBOARD
  </div>
</header>

    <main className="flex-1 p-4 bg-gray-100">
      {children}
    </main>
  </SidebarInset>
</SidebarProvider>

  )
}
