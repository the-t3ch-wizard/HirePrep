import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getAndSetConversationListForSideBar } from "@/lib/store/features/conversation/consersationSlice"
import { useAppDispatch } from "@/lib/store/hooks/hooks"
import { deleteConversationById } from "@/services/conversation"
import { DialogClose } from "@radix-ui/react-dialog"
import { Trash2Icon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const DeleteDialog = ({ conversationId }: { conversationId: string }) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteConversation = async () => {
    try {
      const deletedConversation = await deleteConversationById({
        conversationId
      });
      dispatch(getAndSetConversationListForSideBar());
      toast.success(deletedConversation?.message || "Conversation deleted")
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hidden md:flex">
          <Trash2Icon className="" />
          {/* Delete */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Conversation</DialogTitle>
          <DialogDescription>
            Are you absolutely sure? This will delete your conversation.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={handleDeleteConversation}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
