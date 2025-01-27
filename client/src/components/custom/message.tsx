import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { BiLike, BiDislike } from "react-icons/bi";
import { GrRefresh } from "react-icons/gr";
import { MdContentCopy } from "react-icons/md";
import { Card } from "../ui/card";

interface MessageProps {
  content?: string;
  feedback?: boolean;
  goodFeedbackHandler?: (e: any) => any;
  role: "model" | "user" | "assistant" | "ai";
  stream?: boolean;
}

export const Message = ({ content = "", feedback = false, goodFeedbackHandler, role, stream = false } : MessageProps) => {

  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackPopup, setFeedbackPopup] = useState(feedback);
  
  useEffect(() => {
    // DELETE THIS
    // setFeedbackPopup(true)
    if (!stream || role === "user"){
      setDisplayedContent(content + " \&nbsp;\&nbsp;")
      if (feedback) setFeedbackPopup(true)
      return;
    }
    if (!content) return;
    if (currentIndex+1 == content.length){
      setDisplayedContent((prev) => prev + content[currentIndex] + " \&nbsp;\&nbsp;");
      setCurrentIndex((prev) => prev + 1);
      if (feedback) setFeedbackPopup(true)
    } else if (currentIndex < content.length) {
      setDisplayedContent((prev) => prev + content[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, content]);

  return (
    <div className="w-full flex justify-start items-start p-2 px-20">
      
      {
        role === "model" || role === "ai" ?
        <>
          <div className="flex items-center w-[5%] p-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-100 to-orange-700 shadow-2xl">

            </div>
          </div>
          <pre className="w-[95%]">
            <Card className="rounded-md">
              <ReactMarkdown className="p-5 text-wrap font-geist">
                {displayedContent}
              </ReactMarkdown>
            </Card>
            {
              feedbackPopup ?
              <div className="w-full text-wrap flex justify-between items-center gap-2 p-4">

                <p className="flex justify-center items-center">
                  Please provide feedback, to 
                  <span className="bg-primary text-secondary px-2 mx-2 rounded-lg">Continue {`=>`}</span>
                </p>
                
                <div className="flex justify-center items-center gap-2">
                  <BiLike size={20} className="fill-foreground-400 hover:fill-foreground-800 transition-all duration-150 cursor-pointer" onClick={goodFeedbackHandler} />
                  <BiDislike size={20} className="fill-foreground-400 hover:fill-foreground-800 transition-all duration-150 cursor-pointer" />
                  <GrRefresh size={20} className="text-foreground-400 hover:text-foreground-800 transition-all duration-150 cursor-pointer" />
                  <MdContentCopy size={19} className="fill-foreground-400 hover:fill-foreground-800 transition-all duration-150 cursor-pointer" />
                </div>
              </div> :
              null
            }
          </pre>
        </> :
        role === "user" ?
        <>
          <pre className="w-full">
            <Card className="bg-background border border-foreground-300 shadow-[4px_3px_0rem_0px] shadow-foreground-200">
              <ReactMarkdown className="p-5 text-wrap font-geist">
                {displayedContent}
              </ReactMarkdown>
            </Card>
            {
              feedbackPopup ?
              <div className="w-full text-wrap flex justify-between items-center gap-2 p-4">

                <p className="flex justify-center items-center">
                  Please provide feedback, to 
                  <span className="bg-primary px-2 mx-2 rounded-lg">Continue {`=>`}</span>
                </p>
                
                <div className="flex justify-center items-center gap-2">
                  <BiLike size={20} className="fill-foreground-400 hover:fill-foreground-800 transition-all duration-150 cursor-pointer" onClick={goodFeedbackHandler} />
                  <BiDislike size={20} className="fill-foreground-400 hover:fill-foreground-800 transition-all duration-150 cursor-pointer" />
                  <GrRefresh size={20} className="text-foreground-400 hover:text-foreground-800 transition-all duration-150 cursor-pointer" />
                  <MdContentCopy size={19} className="fill-foreground-400 hover:fill-foreground-800 transition-all duration-150 cursor-pointer" />
                </div>
              </div> :
              null
            }
          </pre>
        </> :
        <>
        </>
      }
    </div>
  )
}
