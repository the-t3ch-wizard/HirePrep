import { basicInfoSchema } from "@/validations/edit-user/basic_info";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { UploadProfileImageCloudinary } from "./upload-profile-image-cloudinary";
import { DatePicker } from "./date-picker";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { updateBasicInfoForUser } from "@/services/user";
import { toast } from "sonner";
import { errorType, responseType } from "@/types/api";
import { setUserDetails } from "@/lib/store/features/user/userSlice";

export const BasicInfoEditForm = () => {

  const dispatch = useAppDispatch();

  const userDetails = useAppSelector((state) => state.user.userDetails);

  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: userDetails.name,
      bio: userDetails.bio,
      gender: userDetails.gender,
      birthDate: userDetails.birthDate != undefined ? new Date(userDetails.birthDate) : undefined,
      country: userDetails.country,
      college: userDetails.userEducationalDetails.college,
      degree: userDetails.userEducationalDetails.degree,
    },
  });

  const updateBasicInfo: SubmitHandler<z.infer<typeof basicInfoSchema>> = async (
    data: z.infer<typeof basicInfoSchema>
  ) => {
    
    try {
      const response: responseType = await updateBasicInfoForUser(data)
      dispatch(setUserDetails(response.data))
      toast.success(response?.message || "Updated Basic Info successfully!")
    } catch (error: any) {
      toast.error(error?.message || "Unable to update basic info!")
    }
    
  };

  return (
    <div className="w-full flex flex-col gap-3 justify-start items-start px-4">
      <div className="w-full flex justify-between items-start bg-red-500a">
        <div className="space-y-1">
          <h3 className="text-2xl font-medium">Basic Info</h3>
          <p className="text-sm text-muted-foreground">
            You can manage your details here.
          </p>
        </div>
        <Button
          variant="default"
          className="m-1.5"
          onClick={basicInfoForm.handleSubmit(updateBasicInfo)}
        >
          Update
        </Button>
      </div>

      <Separator />

      <div className="w-full flex flex-col gap-3">
        <Form {...basicInfoForm}>
          <div className="w-full flex gap-3">
            <div className="w-32 flex flex-col gap-3 justify-center items-center">
              <UploadProfileImageCloudinary />
            </div>
            <div className="flex flex-col w-full">
              <>
                <div className="w-full flex py-3">
                  <div className="w-28 flex justify-start items-center text-sm font-normal">
                    Profile Name:
                  </div>
                  <div className="w-full flex justify-start items-center text-sm font-normal text-primary/50">
                    {userDetails.profileName}
                  </div>
                </div>
              </>
              <FormField
                control={basicInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ayush Maurya" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                value={userDetails.email}
                placeholder="ayush@gmail.com"
                disabled
                className="disabled:text-muted-foreground disabled:opacity-100 disabled:cursor-default"
              />
            </FormControl>
          </FormItem>

          <FormField
            control={basicInfoForm.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio (Max 200 Characters)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    maxLength={200}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full flex gap-3">
            <FormField
              control={basicInfoForm.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={basicInfoForm.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="w-[50%] flex flex-col justify-between">
                  <FormLabel className="mt-2">Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="bg-secondary"
                      {...field}
                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value || ''}
                      onChange={(e) => {
                        field.onChange(new Date(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={basicInfoForm.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4">
            <h3 className="text-2xl font-medium">Educational Details</h3>
          </div>
          <FormField
            control={basicInfoForm.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <FormControl>
                  <Input placeholder="College" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={basicInfoForm.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Degree" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
    </div>
  );
};
