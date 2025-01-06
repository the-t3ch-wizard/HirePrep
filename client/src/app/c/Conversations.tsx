import { UploadCloudinary } from "@/components/custom/upload-cloudinary"
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Conversations = () => {

  const [isLoading, setIsLoading] = useState(false);

  const image = useAppSelector(state => state.conversation.newChat.UploadedResumeDetail.image);

  const handleStartChat = async () => {
    try {
      setIsLoading(true);
      console.log('Start Chat');

      // TODO: Start chat
      // create a new chat
      // add the image to the chat
      // add the resume to the chat
      // add the user to the chat
      // add the chat to the user
      // add the chat to the resume
      // add the chat to the image
      // add the chat to the user

    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message || 'Unable to start chat');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className='w-full flex flex-col justify-start items-center p-4'>

      {
        !image &&
        <UploadCloudinary />
      }

      {
        image &&
        <div className='w-full min-h-[80vh] flex flex-col justify-center items-center'>
          <Button className='w-[25%]' onClick={handleStartChat} disabled={isLoading}>
            {
              isLoading ? <LoaderCircle className='animate-spin' /> : 'Start Chat'
            }
          </Button>
        </div>
      }

    </div>
  )
}
