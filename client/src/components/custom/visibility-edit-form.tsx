import { basicInfoSchema } from "@/validations/edit-user/basic_info";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input";
import { socialsSchema } from "@/validations/edit-user/socials";
import { profileVisibilityConfigSchema } from "@/validations/edit-user/visibility";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { responseType } from "@/types/api";
import { toast } from "sonner";
import { updateProfileVisibilityForUser } from "@/services/user";
import { setUserDetails } from "@/lib/store/features/user/userSlice";


export const VisibilityEditForm = () => {

  const dispatch = useAppDispatch();

  const userDetails = useAppSelector((state) => state.user.userDetails);

  const visibilityForm = useForm<z.infer<typeof profileVisibilityConfigSchema>>({
    resolver: zodResolver(profileVisibilityConfigSchema),
    defaultValues: {
      profileVisibility: 
        userDetails.profileVisibilityConfig.profileVisibility === 1 ? "1" :
        userDetails.profileVisibilityConfig.profileVisibility === 0 ? "0" :
        userDetails.profileVisibilityConfig.profileVisibility === -1 ? "-1" : undefined,
    },
  });

  const updateProfileVisibility: SubmitHandler<z.infer<typeof profileVisibilityConfigSchema>> = async (
    data: z.infer<typeof profileVisibilityConfigSchema>
  ) => {
    
    try {
      const response: responseType = await updateProfileVisibilityForUser(data)
      dispatch(setUserDetails(response.data))
      toast.success(response?.message || "Updated Profile Visibility successfully!")
    } catch (error: any) {
      toast.error(error?.message || "Unable to update profile visibility!")
    }
    
  };

  return (
    <div className="w-full flex flex-col gap-3 justify-start items-start px-4">
      <div className="w-full flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-2xl font-medium">Visibility</h3>
          <p className="text-sm text-muted-foreground">You can manage your stats visibility here.</p>
        </div>
        <Button variant="default" className="m-1.5" onClick={visibilityForm.handleSubmit(updateProfileVisibility)}>
          Update
        </Button>
      </div>

      <Separator />

      <Form {...visibilityForm}>
        <FormField
          control={visibilityForm.control}
          name="profileVisibility"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Public</SelectItem>
                  <SelectItem value="0">Platform Private</SelectItem>
                  <SelectItem value="-1">Completely Private</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
