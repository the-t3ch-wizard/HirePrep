import { updateJobDetails } from "@/services/conversation";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";


export const JobDescriptionSummary = ({ id, jobTitle, setJobTitle, jobDescription, setJobDescription, isEditingJobDetails, setIsEditingJobDetails } : {
  id: string | undefined, jobTitle: string, setJobTitle: React.Dispatch<React.SetStateAction<string>>, jobDescription: string, setJobDescription: React.Dispatch<React.SetStateAction<string>>, isEditingJobDetails: boolean, setIsEditingJobDetails: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const handleSaveJobDetails = async () => {
    setIsEditingJobDetails(!isEditingJobDetails)
    try {
      const updateConversation = await updateJobDetails({
        conversationId: id || "",
        jobTitle,
        jobDescription
      })
      toast.success(updateConversation.message || "Updated Job Details successfully!")
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.error?.message || error?.message || 'Unable to update save job details');
    }
  }

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="p-4 md:p-6 md:pb-2">
        <CardTitle className="font-semibold text-lg">Job Description Summary</CardTitle>
      </CardHeader>
      {
        jobTitle || jobDescription || isEditingJobDetails ?
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0 flex flex-col gap-2">
            {isEditingJobDetails ? (
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter Job Title"
                className="text-sm text-foreground"
              />
            ) : (
              <div className="text-md text-foreground font-medium">{jobTitle}</div>
            )}
            {isEditingJobDetails ? (
              <Textarea
                value={jobDescription}
                placeholder="Enter Job Description"
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
          <Button variant="outline" onClick={() => setIsEditingJobDetails(!isEditingJobDetails)}>Edit Job Details</Button>
        }
      </CardFooter>
    </Card>
  )
}
