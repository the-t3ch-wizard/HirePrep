import { Message } from "@/components/custom/message";
import { UploadCloudinary } from "@/components/custom/upload-cloudinary"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { extractAndCreateResume } from "@/services/resume";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RiSendPlaneFill } from "react-icons/ri";

export const Conversations = () => {

  const [isLoading, setIsLoading] = useState(false);

  const imageUrl = useAppSelector(state => state.conversation.newChat.UploadedResumeDetail.imageUrl);

  const [resumeContent, setResumeContent] = useState('');

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

      

      const response = await extractAndCreateResume({
        resumeUrl: imageUrl,
      })
      console.log('response', response?.data?.content)
      setResumeContent(response?.data?.content);

    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message || 'Unable to start chat');
    } finally {
      setIsLoading(false);
    }
  }

  const continueConversation = async (e) => {
    try {
      e.preventDefault();
      console.log('SUBMIT');
    } catch (error) {
      
    }
  }
  
  return (
    <div className='w-full flex flex-col justify-start items-center p-4'>

      {/* TODO: can provide text while uploading to make waiting more user friendly */}

      {
        !imageUrl && !resumeContent &&
        <UploadCloudinary />
      }

      {
        imageUrl && !resumeContent &&
        <div className='w-full min-h-[78vh] flex flex-col justify-center items-center'>
          <Button className='w-[25%]' onClick={handleStartChat} disabled={isLoading}>
            {
              isLoading ? <LoaderCircle className='animate-spin' /> : 'Start Chat'
            }
          </Button>
        </div>
      }

      {
        resumeContent &&
        <Message content={resumeContent} stream={true} role="model" />
      }

      {
        resumeContent &&
        <form className="w-full px-10 max-h-48 flex justify-center items-center relative" onSubmit={continueConversation}>
            
          <Textarea
            disabled={isLoading}
            placeholder="Ask anything related to resume"
            className="resize-none w-full flex justify-center items-center"
            // {...registerChat("user")}
          />
          <Button className="absolute right-14 w-10 z-10 rounded-full" aria-label="Like" type="submit">
            <RiSendPlaneFill size={19} />
          </Button>

        </form>
      }

    </div>
  )
}
