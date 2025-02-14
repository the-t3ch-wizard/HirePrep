import { HiRectangleStack } from "react-icons/hi2"
import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


export const ChatSkeleton = () => {

  const chats = [1, 2, 3];

  return (
    <>
      {
        chats.map(() => {
          return <>
            <div className="w-full flex justify-start items-start px-40">
              <>
                <div className="mt-7 flex justify-end items-end w-[5%]">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/30 flex justify-center items-center shadow-2xl">
                    <HiRectangleStack className='text-xl text-primary' />
                  </div>
                </div>
                <pre className="w-[95%]">
                  <Card className="rounded-md border-none shadow-none">
                    <Skeleton className="h-[5rem] w-full rounded-xl m-5" />
                  </Card>
                </pre>
              </>
            </div>
            <div className="w-full flex justify-start items-start px-40">
              <>
                <pre className="w-full flex justify-end items-end">
                  <Card className="w-[85%] border border-foreground-300 shadow-foreground-200">
                    <Skeleton className="h-[10rem] w-full rounded-xl" />
                  </Card>
                </pre>
              </>
            </div>
          </>
        })
      }
    </>
  )
}
