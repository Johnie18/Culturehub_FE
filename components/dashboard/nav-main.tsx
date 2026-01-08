"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>

      <SidebarMenu>
        {items.map((item) => {
          const isParentActive = item.items?.some(sub => sub.url === pathname);
          return(
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
                  {item.items?.map((subItem) => {
                    const isActive = pathname === subItem.url;
                    return (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild className="font-bold">
                        <a href={subItem.url}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-lg transition-colors
                                ${isActive 
                                  ? "bg-blue-400 text-white shadow-md" 
                                  : "hover:bg-blue-300"
                                }`}
                        >
                          {subItem.icon && <subItem.icon/>}
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    )
        })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          )
})}
      </SidebarMenu>
    </SidebarGroup>
  )
}
