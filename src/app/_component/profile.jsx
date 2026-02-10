"use client"
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleUserIcon } from "lucide-react";

export function UserProfile({user}) {

  if(!user) {
    return null
  }

  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="link" size="20" className="ml-5" ><CircleUserIcon className="text-blue-400 size-8"/></Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-64 flex-col gap-0.5">
        <div >name : {user.name}</div>
        <div >email :{user.email}</div>
      </HoverCardContent>
    </HoverCard>
  );
}
