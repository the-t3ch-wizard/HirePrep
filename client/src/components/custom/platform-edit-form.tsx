import { basicInfoSchema } from "@/validations/edit-user/basic_info";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { socialsSchema } from "@/validations/edit-user/socials";
import { platformSchema } from "@/validations/edit-user/platform";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { useEffect, useState } from "react";
import { BadgeCheck, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { responseType } from "@/types/api";
import { updatePlatformProfileDetailForUser } from "@/services/user";
import { platformProfiles } from "@/lib/constants";
import { setUserDetails } from "@/lib/store/features/user/userSlice";


export const PlatformEditForm = () => {

  const dispatch = useAppDispatch();

  const userDetails = useAppSelector((state) => state.user.userDetails);

  const platformForm = useForm<z.infer<typeof platformSchema>>({
    resolver: zodResolver(platformSchema),
    defaultValues: {

      leetcode: userDetails.platformProfiles?.map((profile: {
        platformCode: number;
        userStats: {
          username: string;
        }
      }) => {
        if (profile?.platformCode === 0) return profile?.userStats?.username;
      }).at(0),

      geeksforgeeks: userDetails.platformProfiles?.map((profile: {
        platformCode: number;
        userStats: {
          username: string;
        }
      }) => {
        if (profile?.platformCode === 1) return profile?.userStats?.username;
      }).at(0),

    },
  });

  const [isLeetcodeLoading, setIsLeetcodeLoading] = useState<boolean | null>(null);
  const [isGeeksforgeeksLoading, setIsGeeksforgeeksLoading] = useState<boolean | null>(null);

  const updatePlatformProfiles: SubmitHandler<z.infer<typeof platformSchema>> = async (
    data: z.infer<typeof platformSchema>
  ) => {

    try {
      if (data?.leetcode && data?.leetcode?.length > 0){
        try {
          const responseOfLeetcodeProfile: Promise<void | responseType> = updatePlatformProfileDetailForUser(platformProfiles.leetcode, {
            username: data?.leetcode
          }).then((res) => {
            toast.success("Updated leetcode profile successfully!")
          })
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Unable to update leetcode profile");
        }
      }
      if (data?.geeksforgeeks && data?.geeksforgeeks?.length > 0){
        try {
          // api call for gfg
          // body.push({ platformCode: 0, username: data?.geeksforgeeks })
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Unable to update geeksforgeeks profile");
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to update platform profile!")
    } finally {
      // toast.success(response.message || "Updated platform profiles successfully!")
      // an api inorder to fetch basic profile username from server and set it in redux
    }

  }

  return (
    <div className="w-full flex flex-col gap-3 justify-start items-start px-4">
      <div className="w-full flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-2xl font-medium">Platforms</h3>
          <p className="text-sm text-muted-foreground">You can update and verify your platform details here.</p>
        </div>
        <Button variant="default" className="m-1.5" onClick={platformForm.handleSubmit(updatePlatformProfiles)}>
          Update
        </Button>
      </div>

      <Separator />

      <Form {...platformForm}>
        {/* Leetcode */}
        <div className="w-full flex justify-start items-end gap-3">
          <FormField
            control={platformForm.control}
            name="leetcode"
            render={({ field }) => (
              <FormItem className="w-[70%]">
                <FormLabel>Leetcode</FormLabel>
                <FormControl>
                  <Input placeholder="AyushMaurya" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-[20%] h-9 flex justify-start items-center">
            {
              isLeetcodeLoading === true ? <LoaderCircle className='text-green-500 animate-spin' /> : isLeetcodeLoading === false ? <BadgeCheck className="text-green-500" /> : null
            }
          </div>
        </div>

        {/* Geeksforgeeks */}
        <div className="w-full flex justify-start items-end gap-3">
          <FormField
            control={platformForm.control}
            name="geeksforgeeks"
            render={({ field }) => (
              <FormItem className="w-[70%]">
                <FormLabel>Geeksforgeeks</FormLabel>
                <FormControl>
                  <Input placeholder="AyushMaurya" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-[20%] h-9 flex justify-start items-center">
            {
              isGeeksforgeeksLoading === true ? <LoaderCircle className='text-green-500 animate-spin' /> : isGeeksforgeeksLoading === false ? <BadgeCheck className="text-green-500" /> : null
            }
          </div>
        </div>
      </Form>
    </div>
  );
}
