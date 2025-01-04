import { NavigationMenuItem, NavigationMenuList } from '@radix-ui/react-navigation-menu'
import { NavigationMenu } from '../ui/navigation-menu'
import { SidebarTrigger } from '../ui/sidebar'
import { ModeToggle } from './mode-toggle'
import { HiRectangleStack, HiUserCircle } from "react-icons/hi2";
import { Button } from '../ui/button';
import { LuPlus } from "react-icons/lu";
import { useAppSelector } from '@/lib/store/hooks/hooks';

export const AppNavbar = () => {

  // const { loggedIn } = useAppSelector((state) => state.user.loggedIn)

  const loggedIn = false;

  return (
    <div className='w-full h-16 px-4 relative flex justify-between items-center border-b-2 border-border'>

      <SidebarTrigger />

      <div className='absolute flex justify-center items-center gap-2 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <HiRectangleStack className='text-xl' />
        <h1 className='text-xl font-geist-800'>
          HirePrep
        </h1>
      </div>

      <NavigationMenu>
        <NavigationMenuList className='flex justify-center items-center gap-2'>

          {
            loggedIn ?
            <NavigationMenuItem>
              <Button variant='outline' className='flex justify-center items-center gap-2'>
                <HiUserCircle className='text-xl' />
                <p>
                  Profile
                </p>
              </Button>
            </NavigationMenuItem> :
            <>
              <NavigationMenuItem>
                <Button variant='outline' className='flex justify-center items-center gap-2'>
                  <p>
                    Sign in
                  </p>
                </Button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button variant='default' className='flex justify-center items-center gap-1'>
                  <p>
                    Sign up
                  </p>
                  <LuPlus />
                </Button>
              </NavigationMenuItem>
            </>
          }


          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>


    </div>
  )
}
