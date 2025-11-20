import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2 } from "lucide-react";

export default function ResetPassword() {
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
          <div className="flex flex-col justify-center items-center">
            <p className="text-center mb-3">if an account exist with dhfuisgf@gmail.com, you will receive password reset instruction</p>
            <Button className="mb-3">Try Another Email</Button>
            <div>Back to Sign In</div>
          </div>
        </Card>
      </div>
    );
}