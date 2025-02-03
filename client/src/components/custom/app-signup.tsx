import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userSignupSchema } from "@/validations/user"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signup } from "@/services/user"
import { useRef } from "react"

export const AppSignup = () => {

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof userSignupSchema>>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof userSignupSchema>) {
    try {
      const response = await signup(values)
      form.reset()
      closeButtonRef.current?.click()
      window.location.reload()
      return toast.success(response.message || 'Signup successful')
    } catch (error: any) {
      console.log('ERROR', error)
      return toast.error(error?.response?.data?.message || error?.message || 'Something went wrong')
    }
  }

  return (
    <Drawer>

      <DrawerTrigger>
        {/* FIX this has to be removed from button to div inorder to avoid error */}
        <Button variant='default' className='flex justify-center items-center gap-2'>
          Sign up
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full h-[80%] flex justify-start items-center">
        <DrawerHeader className="w-full flex flex-col justify-center items-center">
          <DrawerTitle className="text-3xl font-bold">
            Sign up
          </DrawerTitle>
          <DrawerDescription className="p-6 w-[80%] md:w-[45%] sm:w-[65%] transition-all duration-300 bg-redaa-500">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" type="text" className="text-foreground" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@mail.com" type="email" className="text-foreground" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" className="text-foreground" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" className="text-foreground" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-2 w-full">
                  <Button type="submit" className="w-full">Submit</Button>
                  <Button variant="outline" type="reset" className="w-full">Cancel</Button>
                </div>
                <DrawerClose className="hidden" ref={closeButtonRef}>
                </DrawerClose>
              </form>
            </Form>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
