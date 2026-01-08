"use client"

import { type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  const pathname = usePathname()

 return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasSub = item.items && item.items.length > 0;
          const isParentActive = hasSub && item.items.some(sub => sub.url === pathname);

          if (hasSub) {
            // collapsible for submenus
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isParentActive || item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon className="mr-2" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={subItem.url}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-lg transition-colors
                                  ${isActive 
                                    ? "bg-blue-400 text-white shadow-md" 
                                    : "hover:bg-blue-300"
                                  }`}
                              >
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            // simple clickable item
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-lg transition-colors
                      ${isActive ? "bg-blue-400 text-white shadow-md" : "hover:bg-blue-300"}`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}