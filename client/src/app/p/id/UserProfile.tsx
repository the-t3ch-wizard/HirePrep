import { AboutUserSkeleton } from "@/components/custom/about-user-skeleton"
import { BasicProfileStatsCard } from "@/components/custom/basic-profile-stats-card";
import { setUserDetails } from "@/lib/store/features/user/userSlice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { getUserDetail } from "@/services/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner";

export const UserProfile = () => {

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const { data: userDetail } = await getUserDetail();
      console.log(userDetail);
      dispatch(setUserDetails(userDetail));
    } catch (error: any) {
      toast.error(error.message || "Unable to fetch user details!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col justify-start items-center p-4">

      {
        isLoading ?
          <AboutUserSkeleton /> :

          <div className="w-full flex justify-center items-center gap-3">

            <BasicProfileStatsCard />
            {/* <Skeleton className="w-[20%] h-[42rem] rounded-md" /> */}
            <div className="w-[80%] h-[42rem] flex flex-col justify-start items-start gap-4">
              <div className="w-full flex gap-3 justify-center items-center">
                {/* <Skeleton className="w-[50%] h-[12rem] rounded-md" /> */}
                {/* <Skeleton className="w-[50%] h-[12rem] rounded-md" /> */}
              </div>
              <div className="w-full flex gap-3 justify-center items-center">
                {/* <Skeleton className="w-[100%] h-[12rem] rounded-md" /> */}
              </div>
              <div className="w-full flex gap-3 justify-center items-center">
                {/* <Skeleton className="w-[100%] h-64 rounded-md" /> */}
              </div>
            </div>

          </div>
      }

    </div>
  )
}
