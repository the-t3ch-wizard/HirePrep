import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { CircleUserRound } from "lucide-react";

export const UserProfileAvatar = ({ imageUrl, className }: {
  imageUrl?: string;
  className?: string;
}) => {
  return (
    <Avatar className={`flex justify-center items-center ${className}`}>
      <AvatarImage src={imageUrl} alt="profile-picture" className="bg-background rounded-full w-32 p-0.5 border-2 border-border" />
      <AvatarFallback className="bg-background rounded-full w-32 p-0.5 border-2 border-border">
        <CircleUserRound className="w-full h-full" />
      </AvatarFallback>
    </Avatar>
  )
}
