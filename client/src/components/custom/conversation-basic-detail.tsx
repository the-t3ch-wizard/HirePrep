import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FileEditIcon, SaveIcon, Share2Icon, Trash2Icon } from 'lucide-react'
import { DeleteDialog } from './delete-dialog'
import { months } from '@/lib/constants'
import { renameConversationNameById } from '@/services/conversation'
import { toast } from 'sonner'
import { useAppDispatch } from '@/lib/store/hooks/hooks'
import { getAndSetConversationListForSideBar, setCurrentConversationName } from '@/lib/store/features/conversation/consersationSlice'

export const ConversationBasicDetail = ({ title, setTitle, isEditingConversationTitle, setIsEditingConversationTitle, jobTitle, id, conversationCreatedAt, conversationUpdatedAt }: {
  title: string, setTitle: React.Dispatch<React.SetStateAction<string>>, isEditingConversationTitle: boolean, setIsEditingConversationTitle: React.Dispatch<React.SetStateAction<boolean>>, jobTitle: string, id: string | undefined, conversationCreatedAt: Date | null, conversationUpdatedAt: Date | null
}) => {

  const dispatch = useAppDispatch();

  const renameConversationTitle = async () => {
    setIsEditingConversationTitle(!isEditingConversationTitle);
    try {
      const renamedConversation = await renameConversationNameById({
        conversationId: id || "",
        name: title
      })
      dispatch(setCurrentConversationName(title));
      dispatch(getAndSetConversationListForSideBar());
      toast.success(renamedConversation.message || "Renamed conversation")
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message || 'Unable to rename conversation title');
    }
  }

  return (
    <Card>

      <CardHeader className="flex p-4 md:p-6 md:pb-1 flex-col md:flex-row items-center justify-between gap-3 space-y-0">
        {isEditingConversationTitle ? (
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-2xl font-bold" />
        ) : (
          <div className="flex h-full w-full">
            <CardTitle className="w-full flex text-2xl font-bold ">
              {title}
            </CardTitle>
          </div>
        )}
        {isEditingConversationTitle ? (
          <Button variant="outline" size="sm" onClick={renameConversationTitle} className="hidden md:flex">
            <SaveIcon className="" />
            {/* Save */}
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsEditingConversationTitle(true)} className="hidden md:flex">
            <FileEditIcon className="" />
            {/* Rename */}
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex p-4 pt-0 md:p-6 md:pt-0 flex-col gap-3 md:gap-1">

        <div className="flex items-start justify-between gap-3">
          <div className="text-md text-muted-foreground flex justify-center">
            {jobTitle}
          </div>
          <DeleteDialog conversationId={id || ""} />
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Created: {conversationCreatedAt ? conversationCreatedAt?.getDate() + " " + months[conversationCreatedAt?.getMonth()]?.substring(0, 3) + ", " + conversationCreatedAt?.getFullYear() : ""} ·
            Last Updated: {conversationUpdatedAt ? conversationUpdatedAt?.getDate() + " " + months[conversationUpdatedAt?.getMonth()]?.substring(0, 3) + (conversationUpdatedAt?.getFullYear() === new Date().getFullYear() ? "" : ", " + conversationUpdatedAt?.getFullYear()) : ""}
          </p>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Share2Icon className="" />
            {/* Share */}
          </Button>
        </div>

        <div className="flex items-end justify-end gap-3">
          {
            isEditingConversationTitle ?
              <span className="md:hidden">
                <Button variant="outline" size="sm" onClick={() => setIsEditingConversationTitle(!isEditingConversationTitle)} className="flex md:hidden m-0">
                  {isEditingConversationTitle ? (
                    <>
                      <SaveIcon className="" />
                    </>
                  ) : (
                    <>
                      <FileEditIcon className="" />
                    </>
                  )}
                </Button>
              </span> :
              <span className="">
                <Button variant="outline" size="sm" onClick={() => setIsEditingConversationTitle(!isEditingConversationTitle)} className="flex md:hidden m-0">
                  {isEditingConversationTitle ? (
                    <>
                      <SaveIcon className="" />
                    </>
                  ) : (
                    <>
                      <FileEditIcon className="" />
                    </>
                  )}
                </Button>
              </span>
          }
          <Button variant="outline" size="sm" className="flex md:hidden">
            <Trash2Icon className="" />
            {/* Delete */}
          </Button>
          <Button variant="outline" size="sm" className="flex md:hidden">
            <Share2Icon className="" />
            {/* Share */}
          </Button>
        </div>
      </CardContent>

    </Card>
  )
}
