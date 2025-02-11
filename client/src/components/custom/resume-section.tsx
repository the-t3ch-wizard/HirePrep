import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ArrowDownToLine, Eye } from 'lucide-react'
import { downloadFile } from '@/lib/utils'

export const ResumeSection = ({ resumeUrl }: { resumeUrl: string }) => {

  return (
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
  )
}
