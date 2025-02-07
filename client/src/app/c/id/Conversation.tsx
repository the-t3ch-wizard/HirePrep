import { Message } from "@/components/custom/message";
import { getConversationsChatById, continueConversation } from "@/services/conversation";
import { messageSchema } from "@/validations/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { clearCurrentConversation, setCurrentConversation, setCurrentConversationChats } from "@/lib/store/features/conversation/consersationSlice";
import { MessageInputBox } from "@/components/custom/message-inputbox";

export const Conversation = () => {

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const chats = useAppSelector((state) => state.conversation.currentConversation.chats);

  useEffect(() => {
    listConversation(id || "");
    // FIX clear of redux
    return () => {
      dispatch(clearCurrentConversation());
    }
  }, [id])

  const listConversation = async (id: string) => {

    try {
      if (id != ""){
        const completeConversation = await getConversationsChatById({
          conversationId: id
        })
        dispatch(setCurrentConversation({
          id: completeConversation?.data?._id,
          name: completeConversation?.data?.name,
          resumeId: completeConversation?.data?.resumeId,
          chats: completeConversation?.data?.chats
        }))
      }
    } catch (error) {
      console.log(error)
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

      const replyFromAi = await continueConversation({
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
    <div className='w-full flex flex-col justify-start items-center px-4 pt-4'>

      {
        chats.map((chat: any, index) => {
          return <Message content={chat.text} role={chat.sender} key={index} />
        })
      }

      {
        chats &&
        <MessageInputBox form={form} onSubmit={onSubmit} isLoading={isLoading} />
      }

      <div className="p-1 text-sm text-foreground/50">
        AI-generated, for reference only
      </div>

    </div>
  )
}
