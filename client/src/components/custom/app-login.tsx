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
import { userLoginSchema } from "@/validations/user"
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
import { useRef } from "react"
import { login } from "@/services/user"

export const AppLogin = () => {

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof userLoginSchema>) {
    try {
      const response = await login(values)
      form.reset()
      closeButtonRef.current?.click()
      window.location.reload()
      return toast.success(response.message || 'Login successful')
    } catch (error: any) {
      console.log('ERROR', error)
      return toast.error(error?.response?.data?.message || error?.message || 'Something went wrong')
    }
  }

  return (
    <Drawer>

      <DrawerTrigger>
        <Button variant='outline' className='flex justify-center items-center gap-2'>
          Log in
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full h-[80%] flex justify-start items-center">
        <DrawerHeader className="py-16 md:py-28  w-full flex flex-col justify-center items-center">
          <DrawerTitle className="text-3xl font-bold">
            Log in
          </DrawerTitle>
          <DrawerDescription className="p-6 w-[80%] md:w-[45%] sm:w-[65%] transition-all duration-300 bg-redaa-500">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
