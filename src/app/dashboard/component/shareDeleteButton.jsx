"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Trash } from "lucide-react";
import handleDelete from "./action";
import { useActionState, useEffect } from "react";
import handleDeleteShare from "./action";
import { Alert } from "@/components/ui/alert";

export default function ShareDelete({ fileId, objectKey }) {
   const [state, action, pending] = useActionState(handleDeleteShare, null)

   useEffect(() => {
    if(state?.url) {
         navigator.clipboard.writeText(state.url)
    }
   },[state])
  return (
    <form
      action={action}
      className="h-full ml-3 flex justify-center items-center space-x-2"
    >
      <Input defaultValue={fileId} name="delete" id="delete" hidden readOnly />
      <Input defaultValue={objectKey} name="key" id="key" hidden readOnly />

      <Button
        disabled={pending}
        type="submit"
        name="action"
        value="share"
        className="text-sm hover:bg-blue-100 hover:text-blue-500"
        variant="outline"
      >
        <Share2 className="m-auto" />
      </Button>
      <Button
        disabled={pending}
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
