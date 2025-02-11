import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ArrowUpFromDot } from 'lucide-react'
import { useEffect } from 'react';
import { useRef } from 'react';

export const MessageInputBox = ({ form, onSubmit, isLoading }: { form: any, onSubmit: any, isLoading: boolean }) => {

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [form.watch("message")]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <form className="md:w-[60rem]a w-full px-40 bg-background h-auto rounded-2xl flex flex-col justify-start items-start sticky bottom-0" onSubmit={form.handleSubmit(onSubmit)}>

      <Textarea
        ref={textareaRef}
        disabled={isLoading}
        placeholder="Ask anything related to resume"
        className="resize-none bg-secondary md:text-sm min-h-[4rem] max-h-[12rem] rounded-2xl rounded-b-none flex justify-center items-center border-0 outline-none p-4 focus-visible:ring-0 overflow-y-auto disabled:opacity-100"
        {...form.register("message")}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
        onKeyDown={handleKeyDown}
      />
      <div className='h-14 w-full px-4 p-2 rounded-2xl rounded-t-none bg-secondary flex justify-between items-start'>
        <div className="h-9 w-9"></div>
        <Button className="h-9 w-9 z-10 rounded-full" disabled={isLoading} aria-label="Like" type="submit">
          <ArrowUpFromDot size={19} />
        </Button>
      </div>
      <div className="w-full flex justify-center items-center text-sm text-foreground/50">
        AI-generated, for reference only
      </div>

    </form>
  )
}
