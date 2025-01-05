import { useParams } from "react-router-dom";

export const Conversation = () => {

  const { id } = useParams();

  return (
    <div className='w-full flex flex-col justify-start items-center p-4'>
      Conversation {id}
    </div>
  )
}
