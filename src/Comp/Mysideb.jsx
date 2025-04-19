import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export default function Mysideb({user}) {
  return (
    <SidebarProvider  className='absolute'>
      <AppSidebar user={user} />
      <main>
        <SidebarTrigger className="fixed" />
      </main>
    </SidebarProvider>
  )
}
