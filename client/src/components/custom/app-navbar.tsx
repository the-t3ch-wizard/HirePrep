import { SidebarTrigger } from '../ui/sidebar'
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom';

export const AppNavbar = () => {

  const conversationDetail = useAppSelector((state) => state.conversation.currentConversation);

  const [validChatPathStatus, setValidChatPathStatus] = useState(false);

  useEffect(() => {
    if (conversationDetail.id) setValidChatPathStatus(true);
    else setValidChatPathStatus(false);
  }, [conversationDetail]);

  return (
    <div className='w-full h-16 px-4 sticky bg-background top-0 z-50 flex justify-between items-center border-b-2 border-border'>

      <div className='flex justify-center items-center'>
        <SidebarTrigger />
        {
          validChatPathStatus ?
            <Badge className='ml-4 p-0 text-sm'>
              <Link to={`/c/a/${conversationDetail.id}`} className='w-full px-4 text-sm rounded-md'>
                {conversationDetail.name}
              </Link>
            </Badge> :
            null
        }
      </div>

    </div>
  )
}
