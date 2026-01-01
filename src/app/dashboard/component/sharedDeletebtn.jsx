"use client"

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { handleDelete } from "./action";

export default function DeleteShared({sharedId}) {
   return (
     <form action={handleDelete}>
       <input name="delete" defaultValue={sharedId} id="delete" hidden readOnly />
       <Button
         type="submit"
         name="action"
         value="delete"
         className=" text-sm hover:bg-red-200 hover:text-red-500"
         variant="outline"
       >
         <Trash className="m-auto" />
       </Button>
     </form>
   );
}