import { Skeleton } from "../ui/skeleton"

export const AboutChatSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      
      <Skeleton className="w-full h-44 rounded-md" />
      <div className="w-full flex justify-center items-center gap-3">
        <Skeleton className="w-[50%] h-[30rem] rounded-md" />
        <Skeleton className="w-[50%] h-[30rem] rounded-md" />
      </div>

    </div>
  )
}
