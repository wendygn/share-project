"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { handleResetEmail } from "./action";
import { useActionState } from "react";

export default function ResetPassword() {

  const [state, action, pending] = useActionState(handleResetEmail, null)
    return (
      <div className=" w-xl p-5 justify-center items-center m-auto mt-13">
        <div className="flex flex-col justify-center items-center mb-7">
          <Share2 className="text-blue-500 h-10 w-10" />
          <h2 className="font-bold text-2xl">Reset Password </h2>
          <p className="text-gray-500">
            We`ll send you instructions to reset Your Password
          </p>
        </div>
        <Card className="p-5">
          <div>
            <h2 className="font-bold text-2xl">Forgot Password</h2>
            <p className="text-sm text-gray-600">
              Check your Email for reset instruction
            </p>
          </div>
          <form className="flex flex-col justify-center items-center w-full" action={action}>
            <Input name="email" placeholder="Email" className="mb-3" />
            <Button disabled={pending} className="w-full  bg-blue-500 hover:bg-blue-400">
              Send
            </Button>
          </form>
        </Card>
      </div>
    );
}