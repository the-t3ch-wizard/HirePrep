import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { UserProfileAvatar } from './user-profile-avatar'
import { FileText, Globe, GraduationCap, IdCard, Linkedin, Mail, MapPin, Pencil, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/lib/store/hooks/hooks'
import { Separator } from '../ui/separator'

export const BasicProfileStatsCard = () => {

  const userDetails = useAppSelector((state) => state.user.userDetails);

  return (
    <Card className='w-[20%] h-[42rem] p-5 rounded-md'>
      
      <div className='flex flex-col'>

        <div className='flex justify-end items-end'>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link to={"/p/edit"} className='rounded-md'>
                  <Pencil className='w-4' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <div className='text-sm p-1 px-2 bg-secondary/50 border rounded-md'>
                  Edit Profile
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <UserProfileAvatar className="w-full h-32" />
        
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col'>
            <div className='capitalize font-medium text-2xl'>
              {userDetails.name}
            </div>
            <div className='capitalize font-light'>
              @{userDetails.profileName}
            </div>
          </div>

          <Button className='w-full'>
            <IdCard /> Get you codolio card
          </Button>

          {
            userDetails.bio ?
            <div className='flex flex-col'>
              <div className='capitalize text-sm text-center text-primary/90'>
                {userDetails.bio}
              </div>
            </div> :
            null
          }
        </div>

        <Separator className="my-4" />

        {/* personal details section */}
        <div className='flex flex-col gap-1'>
          {
            userDetails.country ?
            <div className='flex gap-2 text-primary/90'>
              <MapPin className='w-5' />
              {userDetails.country}
            </div> :
            null
          }
          {
            userDetails.userEducationalDetails.degree ?
            <div className='flex gap-2 text-primary/90'>
              <GraduationCap className='w-5' />
              {userDetails.userEducationalDetails.degree}
            </div> :
            null
          }
        </div>

        <Separator className="my-4" />

        {/* social section */}
        <div className='flex justify-center items-center gap-2 w-full'>
          {
            userDetails.socialMediaProfileList.linkedinUrl &&
            <Button variant="ghost" className='p-2'>
              <Link to={userDetails.socialMediaProfileList.linkedinUrl} target='_blank'>
                <Linkedin />
              </Link>
            </Button>
          }
          {
            userDetails.socialMediaProfileList.twitterUrl &&
            <Button variant="ghost" className='p-2'>
              <Link to={userDetails.socialMediaProfileList.twitterUrl} target='_blank'>
                <Twitter />
              </Link>
            </Button>
          }
          {
            userDetails.socialMediaProfileList.websiteUrl &&
            <Button variant="ghost" className='p-2'>
              <Link to={userDetails.socialMediaProfileList.websiteUrl} target='_blank'>
                <Globe />
              </Link>
            </Button>
          }
          {
            userDetails.socialMediaProfileList.mailUrl &&
            <Button variant="ghost" className='p-2'>
              <Link to={userDetails.socialMediaProfileList.mailUrl} target='_blank'>
                <Mail />
              </Link>
            </Button>
          }
          {
            userDetails.socialMediaProfileList.resumeUrl &&
            <Button variant="ghost" className='p-2'>
              <Link to={userDetails.socialMediaProfileList.resumeUrl} target='_blank'>
                <FileText />
              </Link>
            </Button>
          }
          {/* {
            userDetails.socialMediaProfileList.map((social: {
              socialMediaPlatform: string;
              socialMediaUrl: string | undefined;
            }) => {
              return social.socialMediaUrl && <Button variant="ghost" className='p-2'>
                <Link to={social.socialMediaUrl} target='_blank'>
                  {
                    social?.socialMediaPlatform === "linkedin" ?
                    <Linkedin /> :
                    social?.socialMediaPlatform === "twitter" ?
                    <Twitter /> :
                    social?.socialMediaPlatform === "website" ?
                    <Globe /> :
                    social?.socialMediaPlatform === "mail" ?
                    <Mail /> :
                    social?.socialMediaPlatform === "resume" ?
                    <FileText /> :
                    null
                  }
                </Link>
              </Button>
            })
          } */}
        </div>

        <Separator className="my-4" />
        
        {/* platform profiles */}
        <div>
          {/*  */}
        </div>

      </div>

    </Card>
  )
}
