import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks"
import { getConversationDetails } from "@/services/conversation"
import { clearCurrentConversation, setCurrentConversation } from "@/lib/store/features/conversation/consersationSlice"
import { ResumeSection } from "@/components/custom/resume-section"
import { JobDescriptionSummary } from "@/components/custom/job-description-summary"
import { ConversationBasicDetail } from "@/components/custom/conversation-basic-detail"

export const AboutConversation = () => {

  const { id } = useParams();

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

  useEffect(() => {
    listConversation(id || "");
    return () => {
      dispatch(clearCurrentConversation());
    }
  }, [id])

  const listConversation = async (id: string) => {

    try {
      if (id != "") {
        const conversationDetails = await getConversationDetails({
          conversationId: id
        })
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

  return (
    <div className="container mx-auto p-2 md:p-4 md:space-y-6 space-y-2">

      {/* conversation basic detail */}
      <ConversationBasicDetail title={title} setTitle={setTitle} isEditingConversationTitle={isEditingConversationTitle} setIsEditingConversationTitle={setIsEditingConversationTitle} jobTitle={jobTitle} id={id} conversationCreatedAt={conversationCreatedAt} conversationUpdatedAt={conversationUpdatedAt} />

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2">

        {/* resume section */}
        <ResumeSection resumeUrl={resumeUrl} />

        {/* job description summary */}
        <JobDescriptionSummary id={id} jobTitle={jobTitle} setJobTitle={setJobTitle} jobDescription={jobDescription} setJobDescription={setJobDescription} isEditingJobDetails={isEditingJobDetails} setIsEditingJobDetails={setIsEditingJobDetails} />

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