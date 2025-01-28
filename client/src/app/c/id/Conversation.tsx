import { Message } from "@/components/custom/message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getConversationsChatById, startConversation } from "@/services/conversation";
import { messageSchema } from "@/validations/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { setCurrentConversationChats } from "@/lib/store/features/conversation/consersationSlice";

export const Conversation = () => {

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const chats = useAppSelector((state) => state.conversation.currentConversation.chats);

  useEffect(() => {
    listConversation(id || "");
  }, [id])

  const listConversation = async (id: string) => {

    try {
      if (id != ""){
        const completeConversation = await getConversationsChatById({
          conversationId: id
        })
        console.log('--', completeConversation?.data?.chats);
        dispatch(setCurrentConversationChats(completeConversation?.data?.chats));
      }
    } catch (error) {
      
    }

  }

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const onSubmit = async (e: z.infer<typeof messageSchema>) => {
    try {

      const history = chats.map((chat: any) => {
        return {
          "role": chat.sender,
          "parts": [{
            "text": chat.text,
          }]
        }
      });

      const replyFromAi = await startConversation({
        conversationId: id || "",
        history: history,
        message: e.message
      });

      dispatch(setCurrentConversationChats([...chats, {
        sender: "user",
        text: e.message,
      }, {
        sender: "model",
        text: replyFromAi.data
      }]));
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full flex flex-col justify-start items-center p-4'>

      {
        chats.map((chat: any) => {
          return <Message content={chat.text} role={chat.sender} />
        })
      }

      {
        chats &&
        <form className="w-full px-10 max-h-48 flex justify-center items-center relative" onSubmit={form.handleSubmit(onSubmit)}>
            
          <Textarea
            disabled={isLoading}
            placeholder="Ask anything related to resume"
            className="resize-none w-full flex justify-center items-center"
            {...form.register("message")}
          />
          <Button className="absolute right-14 w-10 z-10 rounded-full" aria-label="Like" type="submit">
            <RiSendPlaneFill size={19} />
          </Button>

        </form>
      }

    </div>
  )
}
