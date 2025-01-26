import { Message } from "@/components/custom/message";
import { UploadCloudinary } from "@/components/custom/upload-cloudinary"
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { extractAndCreateResume } from "@/services/resume";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createConversation } from "@/services/conversation";
import { setCurrentConversationChats } from "@/lib/store/features/conversation/consersationSlice";
import { useNavigate } from "react-router-dom";

export const Conversations = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const imageUrl = useAppSelector(state => state.conversation.newChat.UploadedResumeDetail.imageUrl);

  const userId = useAppSelector(state => state.user.userDetails.id);
  
  const [resumeId, setResumeId] = useState("");

  const [resumeContent, setResumeContent] = useState<string>("");

  const handleStartChat = async () => {
    try {
      setIsLoading(true);

      const response = await extractAndCreateResume({
        resumeUrl: imageUrl,
      })
      setResumeId(response?.data?._id);
      setResumeContent(response?.data?.content);

    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message || 'Unable to start chat');
    } finally {
      setIsLoading(false);
    }
  }

  const startConversation = async (e: any) => {

    try {
      const newConversation = await createConversation({
        resumeId,
        userId
      })
      dispatch(setCurrentConversationChats(newConversation?.data?.chats))
      navigate(`${newConversation?.data?._id}`)
    } catch (error) {
      console.log(error)
    }

  }
  
  return (
    <div className='w-full flex flex-col justify-start items-center p-4'>

      {/* TODO: can provide text while uploading to make waiting more user friendly */}

      {
        !imageUrl && !resumeContent &&
        <div className="min-h-[78vh] flex flex-col gap-3 justify-center items-center">
          <UploadCloudinary />
        </div>

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
        <Message content={resumeContent} stream={true} role="model" feedback={true} goodFeedbackHandler={startConversation} />
      }

    </div>
  )
}
