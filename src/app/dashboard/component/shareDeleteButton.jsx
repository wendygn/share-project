"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Share2, Trash } from "lucide-react";
import { useActionState, useEffect } from "react";
import handleDeleteShare from "./action";
import { toast } from "sonner";
import { Alert } from "@/components/ui/alert";

export default function ShareDelete({ fileId, objectKey }) {
  const [state, action, pending] = useActionState(handleDeleteShare, null);
const domain = process.env.R2_BUCKET;
  useEffect(() => {
    if (state?.baseUrl) {
      navigator.clipboard.writeText(state.baseUrl);
      toast.success("Link copied to clipboard");
    }

  }, [state]);
  return (
    <form
      action={action}
      className="h-full ml-3 flex justify-center items-center space-x-2"
    >
      <Input defaultValue={fileId} name="delete" id="delete" hidden readOnly />
      <Input defaultValue={objectKey} name="key" id="key" hidden readOnly />
      <Button
      onClick={() => {window.location.href = `/download/${fileId}`}}
        disabled={pending}
        type="button"
        name="action"
        value="download"
        className="text-sm hover:bg-blue-100 hover:text-blue-500"
        variant="outline"
      >
        <Download className="m-auto" />
      </Button>
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
