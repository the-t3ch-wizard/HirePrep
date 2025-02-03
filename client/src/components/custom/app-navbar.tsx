import { NavigationMenuItem, NavigationMenuList } from '@radix-ui/react-navigation-menu'
import { NavigationMenu } from '../ui/navigation-menu'
import { SidebarTrigger, useSidebar } from '../ui/sidebar'
import { HiRectangleStack, HiUserCircle } from "react-icons/hi2";
import { Button } from '../ui/button';
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { AppLogin } from './app-login';
import { toast } from 'sonner';
import { AppSignup } from './app-signup';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { logout } from '@/services/user';
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom';

export const AppNavbar = () => {

  const loggedInStatus = useAppSelector((state) => state.user.loggedInStatus)

  const conversationDetail = useAppSelector((state) => state.conversation.currentConversation);

  const {
    open,
  } = useSidebar()

  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.success) window.location.reload();
    } catch (error: any) {
      console.log('error', error)
      toast.error(error?.response?.data?.message || error?.message || 'Logout failed')
    }
  }

  const [validChatPathStatus, setValidChatPathStatus] = useState(false);

  useEffect(() => {
    if (conversationDetail.id) setValidChatPathStatus(true);
    else setValidChatPathStatus(false);
  }, [conversationDetail]);

  return (
    <div className='w-full h-16 px-4 sticky bg-background top-0 z-50 flex justify-between items-center border-b-2 border-border'>

      <div className='flex justify-center items-center'>
        <SidebarTrigger />
        {
          validChatPathStatus ?
          <Badge className='ml-4 p-0 text-sm'>
            <Link to={`/c/a/${conversationDetail.id}`} className='w-full px-4 text-sm rounded-md'>
              {conversationDetail.name}
            </Link>
          </Badge> :
          null
        }
      </div>

      <div className='absolute hidden lg:flex justify-center items-center gap-2 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <HiRectangleStack className='text-xl' />
        <h1 className='text-xl font-geist-800'>
          HirePrep
        </h1>
      </div>

      <NavigationMenu>
        <NavigationMenuList className='flex justify-center items-center gap-2'>

          {
            loggedInStatus ?
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='flex justify-center items-center gap-2'>
                    <HiUserCircle className='text-xl' />
                    <p>
                      Profile
                    </p>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem> :
            <>
              <NavigationMenuItem className={`hidden md:block transition-all duration-200 lg:opacity-100 lg:pointer-events-auto ${open ? 'md:opacity-0 md:pointer-events-none' : ''}`}>
                <AppLogin />
              </NavigationMenuItem>

              <NavigationMenuItem className='hidden md:block'>
                <AppSignup />
              </NavigationMenuItem>
            </>
          }



        </NavigationMenuList>
      </NavigationMenu>

    </div>
  )
}
