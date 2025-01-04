import { AppNavbar } from "@/components/custom/app-navbar"
import { AppSidebar } from "@/components/custom/app-sidebar"
import { ThemeProvider } from "@/components/custom/theme-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export const HomeLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>

        <AppSidebar />

        <SidebarInset>
          
          <AppNavbar />
          
          <Outlet />

        </SidebarInset>


      </SidebarProvider>
    </ThemeProvider>
  )
}
