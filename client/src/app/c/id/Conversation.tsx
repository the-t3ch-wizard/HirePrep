import { Message } from "@/components/custom/message";
import { getConversationsChatById, continueConversation } from "@/services/conversation";
import { messageSchema } from "@/validations/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { clearCurrentConversation, setCurrentConversation, setCurrentConversationChats } from "@/lib/store/features/conversation/consersationSlice";
import { MessageInputBox } from "@/components/custom/message-inputbox";
import { HiRectangleStack } from "react-icons/hi2";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export const Conversation = () => {

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const chats = useAppSelector((state) => state.conversation.currentConversation.chats);

  useEffect(() => {
    listConversation(id || "");
    return () => {
      dispatch(clearCurrentConversation());
      window.scroll(0, 0);
    }
  }, [id])

  // this moves to bottom when any new chat arrives
  useEffect(() => {
    // the setTimeout is used so that the chat ui is rendered completely and then it moves to the ref element
    setTimeout(() => {
      chatEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100)
  }, [chats])
  
  // this moves to bottom on page render
  useEffect(() => {
    setTimeout(() => {
      chatEndRef?.current?.scrollIntoView({ behavior: "instant" });
    }, 100)
  }, [])

  const listConversation = async (id: string) => {

    try {
      if (id != "") {
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

      setIsLoading(true);

      const history = chats.map((chat: any) => {
        return {
          "role": chat.sender,
          "parts": [{
            "text": chat.text,
          }]
        }
      });

      dispatch(setCurrentConversationChats([...chats, {
        sender: "user",
        text: e.message,
      }]));

      form.reset();

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

      setIsLoading(false);

    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message || "Unable to get reply from AI!")
    }
  }

  return (
    <div className='w-full flex flex-col justify-start items-center px-4 pt-4'>

      {
        chats && chats.map((chat: any, index) => {
          return <Message content={chat.text} role={chat.sender} key={index} />
        })
      }

      {
        isLoading ?
          <div className="w-full flex justify-start items-start px-40 pb-5">
            <div className="mt-5 flex justify-end items-end w-[5%]">
              <div className="w-10 h-10 rounded-full bg-background border-2 border-primary/30 flex justify-center items-center shadow-2xl">
                <HiRectangleStack className='text-xl text-primary' />
              </div>
            </div>
            <div className="mt-5 flex justify-end items-end w-[5%]">
              <div className="w-10 h-10 rounded-full flex justify-center items-center">
                <LoaderCircle className="animate-spin" />
              </div>
            </div>
          </div> :
          null
      }

      <div className="p-2" ref={chatEndRef} />

      {
        chats &&
        <MessageInputBox form={form} onSubmit={onSubmit} isLoading={isLoading} />
      }

    </div>
  )
}
