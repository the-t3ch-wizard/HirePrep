import { AppNavbar } from "@/components/custom/app-navbar"
import { AppSidebar } from "@/components/custom/app-sidebar"
import { ThemeProvider } from "@/components/custom/theme-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { setUserLoggedInStatus } from "@/lib/store/features/user/userSlice"
import { useAppDispatch } from "@/lib/store/hooks/hooks"
import { whoAmiI } from "@/services/user"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export const HomeLayout = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    whoAmiI()
    .then((response) => {
      if (response.success){
        dispatch(setUserLoggedInStatus(true))
      }
    })
    .catch((error) => {
      console.log('ERROR', error)
      dispatch(setUserLoggedInStatus(false))
    })
  }, [dispatch])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider defaultOpen={false}>

        <AppSidebar />

        <SidebarInset>
          
          <AppNavbar />
          <Toaster />
          
          <Outlet />

        </SidebarInset>


      </SidebarProvider>
    </ThemeProvider>
  )
}
