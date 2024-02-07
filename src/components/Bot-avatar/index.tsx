import { Avatar, AvatarImage } from "../ui/avatar"

export const BotAvatar = () => {
  return (
    <Avatar className="w-14 h-10">
      <AvatarImage className="p-1" src='/brand/brand.png' />
    </Avatar>
  )
}