"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Package, Send } from "lucide-react";
import { SentList } from "./sent";
import { ReceivedList } from "./received";

export default function DashboardSelection({files}){
const [isActive, setIsActive] = useState(true)


function handleReceived() {
  setIsActive(false);
}
function handleSent() {
  setIsActive(true);
}

return (
    
 <div className=" border-blue-500 w-4xl m-auto flex flex-col mt-8">
   <div>
     <h3 className="text-3xl font-bold text-blue-500 tracking-wide">
       Dashboard
     </h3>
     <ButtonGroup className="mt-7 border-2 bg-gray-200 p-1">
       <Button
         variant="ghost"
         size="sm"
         onClick={handleSent}
         className={`w-30 ${isActive ? "bg-gray-100" : ""}`}
       >
         {" "}
         <Send /> Sent
       </Button>
       <ButtonGroupSeparator />
       <Button
         variant="ghost"
         size="sm"
         onClick={handleReceived}
         className={`w-30 ${isActive ? "" : "bg-gray-100"}`}
       >
         <Package /> Received
       </Button>
     </ButtonGroup>
     <div className="mt-9">{isActive ? <SentList files={files}  /> : <ReceivedList />}</div>
   </div>
 </div>
)
}