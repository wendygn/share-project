"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Share2 } from "lucide-react";
import HandleRegister from "../register/action";
import Link from "next/link";
import HandleLogin from "./action";
import { useActionState } from "react";


export default function LoginPage() {
  const [state, action, pending] = useActionState(HandleLogin, null)
    return (
      <div className=" w-xl p-5 justify-center items-center m-auto mt-8">
        <div className="flex flex-col justify-center items-center mb-7">
          <Share2 className="text-blue-500 h-10 w-10" />
          <h2 className="font-bold text-2xl">Welcome Back </h2>
          <p className="text-gray-500">Login to Continue Sharing Files</p>
        </div>
        <Card className=" p-5">
          <div>
            <h2 className="font-bold text-2xl">Sign In</h2>
            <p className="text-sm text-gray-600">
              Enter your account to access your account
            </p>
          </div>
          <form action={action}>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative mb-3">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="you@example.com"
                className="pl-9"
              />
            </div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="********"
                className="pl-9"
              />
            </div>

            <Button
              disabled={pending}
              className="w-full mt-5 bg-blue-500 hover:bg-blue-400"
            >
              Sign In
            </Button>
            {pending && <div className="text-gray-500">loading....</div>}
            {state?.error && <div className="text-red-400">{state.error}</div>}
          </form>
          <p className="w-full justify-center items-center text-center">
            dont have account?{" "}
            <Link href="/register" className="text-blue-400">
              sign up
            </Link>
          </p>
        </Card>
      </div>
    );
}