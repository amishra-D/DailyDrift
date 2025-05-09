import {LayoutDashboard ,ChartSpline,Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard ,
    href: "/dashboard",
  },
  {
    title: "Analytics",
    icon: ChartSpline,
    href: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function AppSidebar({user}) {
  return (
<Sidebar className="w-64 h-screen bg-muted text-foreground border-r z-51">
  <SidebarContent className="p-4">
    <SidebarGroup>
      <SidebarGroupLabel className="text-lg font-semibold mb-4">Daily Drift</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="z-50" asChild>
              <Link to={item.href} className="flex items-center gap-3 text-base">
                <div className="flex items-center gap-3 text-base">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter className='flex flex-row'>
  <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
    <p className="self-center font-medium text-xs">{user?.email || "Guest"}</p>
  </SidebarFooter>
</Sidebar>

  )
}
