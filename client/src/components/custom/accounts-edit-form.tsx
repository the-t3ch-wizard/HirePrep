import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input";
import { accountsPasswordSchema } from "@/validations/edit-user/accounts-password";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { accountsInfoSchema } from "@/validations/edit-user/accounts-info";
import { checkProfileNameValidity, updatePasswordForUser, updateProfileNameOfUser } from "@/services/user";
import { responseType } from "@/types/api";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { BadgeCheck, BadgeX, LoaderCircle } from "lucide-react";


export const AccountsEditForm = () => {

  const userDetails = useAppSelector((state) => state.user.userDetails);

  const accountsPasswordForm = useForm<z.infer<typeof accountsPasswordSchema>>({
    resolver: zodResolver(accountsPasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const updatePassword: SubmitHandler<z.infer<typeof accountsPasswordSchema>> = async (
    data: z.infer<typeof accountsPasswordSchema>
  ) => {
    
    try {
      const response: responseType = await updatePasswordForUser(data)
      toast.success(response?.message || "Updated Password successfully!")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to update password!")
    }

  }

  const accountsInfoForm = useForm<z.infer<typeof accountsInfoSchema>>({
    resolver: zodResolver(accountsInfoSchema),
    defaultValues: {
      profileName: userDetails.profileName,
    }
  })

  const [isValidLoading, setIsValidLoading] = useState<boolean | null>(null);
  const [isProfileNameValid, setIsProfileNameValid] = useState<boolean | null>(null);

  const validateProfileName = async (profileName: string) => {
    try {
      if (accountsInfoForm.watch("profileName").length < 6){
        setIsValidLoading(false);
        setIsProfileNameValid(false);
        return;
      }

      const response = await checkProfileNameValidity(profileName)
      setIsValidLoading(false);
      if (response?.data?.validity) setIsProfileNameValid(true)
      else setIsProfileNameValid(false)
      
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to validate leetcode username!")
    }
  }

  const validateProfileNameCallback = useCallback(() => {
    setIsValidLoading(true);
    
    const validationTimeout = setTimeout(() => {
      validateProfileName(accountsInfoForm.watch("profileName") || "")
    }, 1000)

    return () => clearTimeout(validationTimeout);
  }, [accountsInfoForm.watch("profileName")])

  const updateProfileName: SubmitHandler<z.infer<typeof accountsInfoSchema>> = async (
    data: z.infer<typeof accountsInfoSchema>
  ) => {
    
    try {
      const response: responseType = await updateProfileNameOfUser(data.profileName)
      console.log(response);
      toast.success(response?.message || "Updated Password successfully!")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to update password!")
    }

  }

  return (
    <div className="w-full flex flex-col gap-3 justify-start items-start px-4">
      <div className="w-full flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-2xl font-medium">Accounts</h3>
          <p className="text-sm text-muted-foreground">You can manage your accounts here.</p>
        </div>
      </div>

      <Separator />

      <Form {...accountsInfoForm} >
        <div className="mt-2">
          <h3 className="text-xl font-medium">Account Information</h3>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex justify-start items-end gap-3">
            <FormField
              control={accountsInfoForm.control}
              name="profileName"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>Profile Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Profile Name" {...field} onChangeCapture={validateProfileNameCallback} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-[20%] h-9 flex justify-start items-center">
              {
                isValidLoading === true ? <LoaderCircle className='text-green-500 animate-spin' /> : isValidLoading === false && isProfileNameValid === true ? <BadgeCheck className="text-green-500" /> : isValidLoading === false && isProfileNameValid === false ? <BadgeX className="text-red-500" /> : null
              }
            </div>
          </div>
          <Button variant="default" className="w-min px-8" onClick={accountsInfoForm.handleSubmit(updateProfileName)}>
            Update Profile Name
          </Button>
        </div>
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input value={userDetails.email} disabled className="disabled:text-muted-foreground disabled:opacity-100 disabled:cursor-default" />
          </FormControl>
        </FormItem>
      </Form>

      <Form {...accountsPasswordForm}>
        <div className="w-full flex flex-col gap-3">
          <div className="mt-2">
            <h3 className="text-xl font-medium">Update Password</h3>
          </div>
          <FormField
            control={accountsPasswordForm.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={accountsPasswordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={accountsPasswordForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant="default" className="w-min px-8" onClick={accountsPasswordForm.handleSubmit(updatePassword)}>
            Update Password
          </Button>
        </div>
      </Form>
    </div>
  );
}
