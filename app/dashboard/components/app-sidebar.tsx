"use client"

import * as React from "react"
import {
  CalendarCheck,
  CalendarRange,
  ClipboardListIcon,
  CookingPot,
  Home,
  icons,
  MessageSquareQuote,
  Route,
  Shield,
  SquareTerminal,
  UserCheck,
  UserCheck2Icon,
  UtensilsCrossedIcon,
} from "lucide-react"

import { NavMain } from "@/app/dashboard/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { usePathname } from "next/navigation"
import NavUser from "./nav-user"

// This is sample data.
const data = {
  user: {
    name: "Johnie",
    email: "Your@Email",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      isActive: true,
      items: [
                {
          title: "Home",
          url: "/dashboard/home",
          icon: Home,
        },
        {
          title: "Booking Request",
          url: "/dashboard/booking-request",
          icon: ClipboardListIcon,
        },
        {
          title: "Food Selected",
          url: "/dashboard/food",
          icon: UtensilsCrossedIcon,
        },
      ],
    },
       {
      title: "Availability",
      url: "#",
      icon: CalendarRange,
      isActive: true,
      items: [
        {
          title: "Route Available",
          url: "/dashboard/route-available",
          icon: Route,
        },
        {
          title: "Menu Available",
          url: "/dashboard/food-available",
          icon: CookingPot,
        },
      ],
    },
    {
      title: "Client Data",
      url: "#",
      icon: UserCheck2Icon,
      isActive: true,
      items: [
        {
          title: "Booked",
          url: "/dashboard/booked",
          icon: CalendarCheck,
        },
        {
          title: "Feedback",
          url: "/dashboard/feedback",
          icon: MessageSquareQuote,
        },
      ],
    },
  ],
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
 const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
                <SidebarGroupLabel className="text-lg font-extrabold text-blue-500">CultureHub</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <NavUser user={data.user} />
      <SidebarRail />
    </Sidebar>
  )
}
export{
  AppSidebar
}
