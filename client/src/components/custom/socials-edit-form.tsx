import { basicInfoSchema } from "@/validations/edit-user/basic_info";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input";
import { socialsSchema } from "@/validations/edit-user/socials";
import { Separator } from "../ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { responseType } from "@/types/api";
import { updateSocialsForUser } from "@/services/user";
import { toast } from "sonner";
import { setUserDetails } from "@/lib/store/features/user/userSlice";

export const SocialsEditForm = () => {

  const dispatch = useAppDispatch();

  const userDetails = useAppSelector((state) => state.user.userDetails);

  const socialsForm = useForm<z.infer<typeof socialsSchema>>({
    resolver: zodResolver(socialsSchema),
    defaultValues: {
      linkedin: userDetails.socialMediaProfileList.linkedinUrl,
      twitter: userDetails.socialMediaProfileList.twitterUrl,
      website: userDetails.socialMediaProfileList.websiteUrl,
      mail: userDetails.socialMediaProfileList.mailUrl,
      resume: userDetails.socialMediaProfileList.resumeUrl,
    },
  });

  const updateSocials: SubmitHandler<z.infer<typeof socialsSchema>> = async (
    data: z.infer<typeof socialsSchema>
  ) => {
    
    try {
      const response: responseType = await updateSocialsForUser(data)
      dispatch(setUserDetails(response.data))
      toast.success(response?.message || "Updated Socials successfully!")
    } catch (error: any) {
      toast.error(error?.message || "Unable to update socials!")
    }
    
  };

  return (
    <div className="w-full flex flex-col gap-3 justify-start items-start px-4">
      <div className="w-full flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-2xl font-medium">Socials</h3>
          <p className="text-sm text-muted-foreground">You can update your social media details here.</p>
        </div>
        <Button variant="default" className="m-1.5" onClick={socialsForm.handleSubmit(updateSocials)}>
          Update
        </Button>
      </div>

      <Separator />

      <Form {...socialsForm}>
        {/* LinkedIn Field */}
        <FormField
          control={socialsForm.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Twitter Field */}
        <FormField
          control={socialsForm.control}
          name="twitter"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input placeholder="https://twitter.com/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Website Field */}
        <FormField
          control={socialsForm.control}
          name="website"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={socialsForm.control}
          name="mail"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="mail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resume Field */}
        <FormField
          control={socialsForm.control}
          name="resume"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/resume.pdf" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
