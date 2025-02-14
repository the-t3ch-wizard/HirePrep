import { Skeleton } from "../ui/skeleton"


export const AboutUserSkeleton = () => {
  return (
    <div className="w-full flex justify-center items-center gap-3">
      
      <Skeleton className="w-[20%] h-[42rem] rounded-md" />
      <div className="w-[80%] h-[42rem] flex flex-col justify-start items-start gap-4">
        <div className="w-full flex gap-3 justify-center items-center">
          <Skeleton className="w-[50%] h-[12rem] rounded-md" />
          <Skeleton className="w-[50%] h-[12rem] rounded-md" />
        </div>
        <div className="w-full flex gap-3 justify-center items-center">
          <Skeleton className="w-[100%] h-[12rem] rounded-md" />
        </div>
        <div className="w-full flex gap-3 justify-center items-center">
          <Skeleton className="w-[100%] h-64 rounded-md" />
        </div>
      </div>

    </div>
  )
}
