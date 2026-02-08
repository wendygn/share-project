"use client"
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function UserProfile({user}) {

  if(!user) {
    return null
  }

  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="link">My profile</Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-64 flex-col gap-0.5">
        <div >name : {user.name}</div>
        <div >email :{user.email}</div>
      </HoverCardContent>
    </HoverCard>
  );
}
