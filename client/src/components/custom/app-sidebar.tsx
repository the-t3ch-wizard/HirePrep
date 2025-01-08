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
import { ChevronDown, ChevronRight, Home, Info, MessageSquareText, MessageSquareWarning, MessagesSquare } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/lib/store/hooks/hooks"

export function AppSidebar() {

  const loggedInStatus = useAppSelector((state) => state.user.loggedInStatus);

  
  // Menu menuItems.
  // This has to be dynamic rendered from backend based on user permissions
  const [menuItems, setMenuItems] = useState([{
    title: "Home",
    url: "/",
    icon: Home,
  }, {
    title: "About us",
    url: "/about-us",
    icon: Info,
  }, {
    title: "Contact us",
    url: "/contact-us",
    icon: MessageSquareWarning,
  }]);

  // Conversations
  // TODO: initial it should be an empty array
  // This has to be dynamic rendered from backend based on user's conversations
  const [conversations, setConversations] = useState([
    {
      title: "1",
      url: "/c/1",
    },
    {
      title: "2",
      url: "/c/2",
    },
    {
      title: "3",
      url: "/c/3",
    }
  ])

  useEffect(() => {
    if (loggedInStatus){
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
        {
          title: "About us",
          url: "/about-us",
          icon: Info,
        },
        {
          title: "Contact us",
          url: "/contact-us",
          icon: MessageSquareWarning,
        },
      ])
      // get user's conversation from db and setConversations
    }
  }, [loggedInStatus])

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>

          <SidebarGroupLabel className="h-14 border-b-2 border-border rounded-none !m-0">
            <SidebarTrigger className="md:hidden" />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (item.title === "Conversations"){
                  return (<Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
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
                          conversations.map((conversation) => {
                            return <SidebarMenuSub>
                              <SidebarMenuButton asChild>
                                <Link to={conversation.url}>a
                                  <span>{conversation.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSub>
                          })
                        }
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>)
                }
                return (<SidebarMenuItem key={item.title}>
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
            <SidebarMenuItem className="p-2 flex justify-start menuItems-center">
              <ModeToggle />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
