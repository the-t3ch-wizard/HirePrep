import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowDownToLine, ArrowLeftIcon, Eye, FileEditIcon, SaveIcon, Share2Icon, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks"
import { getConversationDetails, renameConversationNameById, updateJobDetails } from "@/services/conversation"
import { setCurrentConversation } from "@/lib/store/features/conversation/consersationSlice"
import { months } from "@/lib/constants"
import { toast } from "sonner"
import { DeleteDialog } from "@/components/custom/delete-dialog"
import { downloadFile } from "@/lib/utils"

export const AboutConversation = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const conversationDetails = useAppSelector(state => state.conversation.currentConversation);

  const [isEditingConversationTitle, setIsEditingConversationTitle] = useState(false);
  const [isEditingJobDetails, setIsEditingJobDetails] = useState(false);

  const [title, setTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [conversationCreatedAt, setConversationCreatedAt] = useState<Date | null>(null);
  const [conversationUpdatedAt, setConversationUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    setTitle(conversationDetails.name)
    setJobTitle(conversationDetails.jobTitle)
    setJobDescription(conversationDetails.jobDescription)
    setConversationCreatedAt(new Date(conversationDetails.createdAt))
    setConversationUpdatedAt(new Date(conversationDetails.updatedAt))
    setResumeUrl(conversationDetails.resumeUrl)
  }, [conversationDetails])

  // const [strengths, setStrengths] = useState<string | null>(null)
  // const [areasToImprove, setAreasToImprove] = useState<string | null>(null)
  // const [suggestedResources, setSuggestedResources] = useState<string | null>(null)

  // const [notes, setNotes] = useState("")

  const handleSaveJobDetails = async () => {
    setIsEditingJobDetails(i => !i)
    try {
      const updateConversation = await updateJobDetails({
        conversationId: id || "",
        jobTitle,
        jobDescription
      })
      console.log('updateConversation', updateConversation)
      toast.success(updateConversation.message || "Updated Job Details successfully!")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listConversation(id || "");
    // return () => {
    //   dispatch(clearCurrentConversation());
    // }
  }, [id])

  const listConversation = async (id: string) => {

    try {
      if (id != ""){
        const conversationDetails = await getConversationDetails({
          conversationId: id
        })
        // console.log('COMPLETE', conversationDetails)
        dispatch(setCurrentConversation({
          id: conversationDetails?.data?._id,
          name: conversationDetails?.data?.name,
          jobTitle: conversationDetails?.data?.jobTitle,
          jobDescription: conversationDetails?.data?.jobDescription,
          resumeId: conversationDetails?.data?.resumeId?._id,
          resumeUrl: conversationDetails?.data?.resumeId?.resumeUrl,
          createdAt: conversationDetails?.data?.createdAt,
          updatedAt: conversationDetails?.data?.updatedAt,
        }))
      }
    } catch (error) {
      console.log(error)
    }

  }

  const renameConversationTitle = async () => {
    setIsEditingConversationTitle(!isEditingConversationTitle);
    try {
      const renamedConversation = await renameConversationNameById({
        conversationId: id || "",
        name: title
      })
      toast.success(renamedConversation.message || "Renamed conversation")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto p-2 md:p-4 md:space-y-6 space-y-2">

      {/* conversation basic detail */}
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
              Created: {conversationCreatedAt ? conversationCreatedAt?.getDate()+" "+months[conversationCreatedAt?.getMonth()]?.substring(0, 3)+", "+conversationCreatedAt?.getFullYear() : ""} ·
              Last Updated: {conversationUpdatedAt ? conversationUpdatedAt?.getDate()+" "+months[conversationUpdatedAt?.getMonth()]?.substring(0, 3)+(conversationUpdatedAt?.getFullYear() === new Date().getFullYear() ? "" : ", "+conversationUpdatedAt?.getFullYear()) : ""}
              {/* Created: Oct 10, 2023 · Last Updated: Oct 12 */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2">

        {/* resume section */}
        <Card>
          <CardContent className="pt-6 flex flex-col gap-3 p-4 md:p-6">
            <img src={resumeUrl} alt="Resume Thumbnail" width={300} height={400} className="w-full h-auto rounded-sm" />
            <Button variant="outline" className="w-full h-full" >
              <Link className="w-full h-full flex justify-center items-center gap-2" to={resumeUrl} target="_blank">
                <Eye />
                View Resume
              </Link>
            </Button>
            <Button className="w-full" onClick={() => downloadFile(resumeUrl)}>
              <ArrowDownToLine />
              Download
            </Button>
          </CardContent>
        </Card>

        {/* job description summary */}
        <Card className="flex flex-col gap-2">
          <CardHeader className="p-4 md:p-6 md:pb-2">
            <CardTitle className="font-semibold text-lg">Job Description Summary</CardTitle>
          </CardHeader>
          {
            (jobTitle && jobDescription) || isEditingJobDetails ?
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0 flex flex-col gap-2">
              {isEditingJobDetails ? (
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="text-sm text-foreground"
                />
              ) : (
                <div className="text-md text-foreground font-medium">{jobTitle}</div>
              )}
              {isEditingJobDetails ? (
                <Textarea
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value)
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  className="text-sm text-foreground"
                />
              ) : (
                <p className="text-sm text-foreground/80">{jobDescription}</p>
              )}
            </CardContent> :
            null
          }
          <CardFooter>
          {
            isEditingJobDetails ?
            <Button variant="outline" onClick={() => handleSaveJobDetails()}>Save Job Details</Button> :
            <Button variant="outline" onClick={() => setIsEditingJobDetails(i => !i)}>Edit Job Details</Button> 
          }
          </CardFooter>
        </Card>

      </div>

      {/* AI Feedback Summary */}
      {/* <Card className="flex flex-col gap-2">
        <CardHeader className="p-4 md:p-6 md:pb-1">
          <CardTitle>AI Feedback Summary</CardTitle>
        </CardHeader>
        {
          strengths || areasToImprove || suggestedResources ?
          <CardContent className="space-y-2 p-4 pt-0 md:p-6 md:pt-0">
            <div className="flex items-center">
              <CheckCircle2Icon className="w-5 h-5 text-green-500 mr-2" />
              {isEditing ? (
                <Input value={strengths ? strengths : ""} onChange={(e) => setStrengths(e.target.value)} className="flex-grow" />
              ) : (
                <p>Strengths: {strengths}</p>
              )}
            </div>
            <div className="flex items-center">
              <AlertTriangleIcon className="w-5 h-5 text-yellow-500 mr-2" />
              {isEditing ? (
                <Input value={areasToImprove ? areasToImprove : ""} onChange={(e) => setAreasToImprove(e.target.value)} className="flex-grow" />
              ) : (
                <p>Areas to Improve: {areasToImprove}</p>
              )}
            </div>
            <div className="flex items-center">
              <BookOpenIcon className="w-5 h-5 text-blue-500 mr-2" />
              {isEditing ? (
                <Input
                  value={suggestedResources ? suggestedResources : ""}
                  onChange={(e) => setSuggestedResources(e.target.value)}
                  className="flex-grow"
                />
              ) : (
                <p>Suggested Resources: {suggestedResources}</p>
              )}
            </div>
          </CardContent> :
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <Button variant="outline" size="sm" className="flex">
              <Bot />
              Generate
            </Button>
          </CardContent>
        }
      </Card> */}

      {/* Notes section */}
      {/* <Card className="flex flex-col gap-2">
        <CardHeader className="p-4 md:p-6 md:pb-1">
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <Textarea placeholder="Add your notes here..." value={notes} onChange={(e) => setNotes(e.target.value)} />
        </CardContent>
        <CardFooter className="p-4 pt-0 md:p-6 md:pt-0">
          <Button onClick={handleSave}>Save</Button>
        </CardFooter>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Related Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>📄 Google's Interview Preparation Guide</p>
          <p>📄 Top 10 Coding Interview Questions</p>
          <p>📄 How to Answer Behavioral Questions</p>
        </CardContent>
      </Card> */}

      {/* navigate to conversation page */}
      <Button variant="outline" className="w-full p-0 flex justify-center items-center" onClick={() => navigate(-1)}>
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Conversation
      </Button>
    </div>
  )
}