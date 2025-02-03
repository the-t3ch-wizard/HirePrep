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
import { ChevronRight, Home, Info, MessageSquareText, MessageSquareWarning, MessagesSquare, Pencil, Trash2 } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/lib/store/hooks/hooks"
import { getAllConversationForSideBar } from "@/services/conversation"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@radix-ui/react-context-menu"

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

  const [conversations, setConversations] = useState<[{
    title: string;
    url: string;
  }]>();

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

    try {
      const conversations = await getAllConversationForSideBar();
      setConversations(conversations.data);
    } catch (error : any) {
      return toast.error(error?.message || "Something went wrong!");
    }
  }

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
                            return <ContextMenu key={conversation.title}>
                            <SidebarMenuSub key={conversation.title}>
                              <SidebarMenuButton asChild className="p-0">
                                <ContextMenuTrigger className="relative w-full h-full">
                                  <Link to={conversation.url} className="w-full h-full p-2">
                                    <span>{conversation.title?.slice(0, 20) + (conversation.title.length>21 ? ".." : "")}</span>
                                  </Link>
                                </ContextMenuTrigger>
                              </SidebarMenuButton>
                            </SidebarMenuSub>
                            <ContextMenuContent className="bg-background rounded-md p-1 z-10">
                              <ContextMenuItem>
                                <Button variant={"ghost"} className="w-full" size={"sm"} onClick={() => {
                                  console.log('RENAME CLICKED', conversation)
                                }}>
                                  <Pencil />
                                  Rename
                                </Button>
                              </ContextMenuItem>
                              <ContextMenuItem>
                                <Button variant={"ghost"} className="w-full" size={"sm"} onClick={() => {
                                  console.log('DELETE CLICKED', conversation)
                                  // instead of popup, it can directly delete in the worst case 
                                  // since its will just update isDeleted to true
                                  // and it will then deleted after 30 days (maybe using cronjob)
                                }}>
                                  <Trash2 />
                                  Delete
                                </Button>
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>})
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
            <SidebarMenuItem className="p-2 flex justify-start menuItems-center">
              <ModeToggle />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
