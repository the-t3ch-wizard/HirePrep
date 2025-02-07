import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ArrowUpFromDot } from 'lucide-react'

export const MessageInputBox = ({ form, onSubmit, isLoading }: { form: any, onSubmit: any, isLoading: boolean }) => {
  return (
    <form className="md:w-[60rem] bg-secondary h-32 rounded-2xl flex flex-col justify-start items-start sticky bottom-0" onSubmit={form.handleSubmit(onSubmit)}>

      <Textarea
        disabled={isLoading}
        placeholder="Ask anything related to resume"
        className="resize-none bg-secondary h-20 rounded-2xl flex justify-center items-center border-0 outline-none p-4 focus-visible:ring-0"
        {...form.register("message")}
      />
      <div className='h-12 w-full px-4 rounded-xl flex justify-between items-start'>
        <div className="h-9 w-9">
          
        </div>
        <Button className="h-9 w-9 z-10 rounded-full" disabled={isLoading} aria-label="Like" type="submit">
          <ArrowUpFromDot size={19} />
        </Button>
      </div>

    </form>
  )
}
