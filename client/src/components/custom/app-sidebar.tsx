import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChevronRight, Home, Info, LogOut, MessageSquareText, MessageSquareWarning, MessagesSquare } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { HiUserCircle } from "react-icons/hi2"
import { logout } from "@/services/user"
import { AppLogin } from "./app-login"
import { AppSignup } from "./app-signup"
import { Logo } from "./logo"
import { getAndSetConversationListForSideBar } from "@/lib/store/features/conversation/consersationSlice"

export function AppSidebar() {

  const dispatch = useAppDispatch();

  const loggedInStatus = useAppSelector((state) => state.user.loggedInStatus);
  const userDetails = useAppSelector((state) => state.user.userDetails);

  const profileMenuItems = [
    {
      title: "Contact us",
      url: "/contact-us",
      icon: MessageSquareWarning,
    },
    {
      title: "About us",
      url: "/about-us",
      icon: Info,
    },
  ]

  // Menu menuItems.
  // This has to be dynamic rendered from backend based on user permissions
  const [menuItems, setMenuItems] = useState([{
    title: "Home",
    url: "/",
    icon: Home,
  }, {
    title: "Contact us",
    url: "/contact-us",
    icon: MessageSquareWarning,
  }]);

  const conversations = useAppSelector(state => state.conversation.conversationList)

  useEffect(() => {
    if (loggedInStatus){
      setupSidebarMenuItems();
    }
  }, [loggedInStatus])

  const setupSidebarMenuItems = async () => {
    setMenuItems([
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "New Conversation",
        url: "/c",
        icon: MessageSquareText,
      },
      {
        title: "Conversations",
        url: "/c",
        icon: MessagesSquare,
      },
    ])

    try {
      dispatch(getAndSetConversationListForSideBar());
    } catch (error : any) {
      return toast.error(error?.message || "Something went wrong!");
    }
  }

  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.success){
        // toast.success(response.message || "Logged out!");
        window.location.reload();
      }
    } catch (error: any) {
      console.log('error', error)
      toast.error(error?.response?.data?.message || error?.message || 'Logout failed')
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>

          <SidebarGroupLabel className="h-14 border-b-2 border-border rounded-none !m-0 flex justify-between items-center">
            <SidebarTrigger className="md:hidden" />
              <Logo />
            <ModeToggle />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, idx) => {
                if (item.title === "Conversations"){
                  return (<Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible" key={idx}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span className="w-full flex justify-between menuItems-center">
                            {item.title}
                            <ChevronRight className={`w-4 h-4 transition-all duration-200 ${isOpen ? "rotate-90" : ""}`} />
                          </span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {
                          conversations && conversations.map((conversation) => {
                            return <SidebarMenuSub key={conversation.title}>
                              <SidebarMenuButton asChild className="p-0">
                                <Link to={conversation.url} className="w-full h-full p-2">
                                  <span>{conversation.title?.slice(0, 20) + (conversation.title.length>21 ? ".." : "")}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSub>})
                        }
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>)
                }
                return (<SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)
              })}
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {
            loggedInStatus ?
            <SidebarMenuItem className="p-2 flex justify-start menuItems-center">

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                  <Button variant='outline' className='flex justify-start items-center gap-3'>
                    <HiUserCircle className='text-xl' />
                    <p>
                      My Profile
                    </p>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background">
                  <DropdownMenuLabel>
                    {
                      userDetails.name
                    }
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <Link to={`/p/${userDetails.id}`} className="w-full flex gap-2 justify-start items-center">
                      <HiUserCircle className=" w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {
                    profileMenuItems.map((profileMenu) => {
                      return <DropdownMenuItem className="flex justify-center items-center">
                        <Link to={profileMenu.url} className="w-full flex gap-2 justify-start items-center">
                          <profileMenu.icon className=" w-4" />
                          <span>{profileMenu.title}</span>
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                  <DropdownMenuItem className='cursor-pointer' onClick={logoutHandler}>
                    <LogOut className="w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </SidebarMenuItem> :
            <div className="w-full flex flex-col gap-3 pb-2">
              <AppLogin />
              <AppSignup />
            </div>
          }
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
