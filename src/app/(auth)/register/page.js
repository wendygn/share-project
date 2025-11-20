"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Share2, User } from "lucide-react";
import HandleRegister from "./action";
import { useActionState } from "react";
import Link from "next/link";

export default function UserRegister() {
const [state, action, pending] = useActionState(HandleRegister, null)

  return (
    <div className=" w-xl p-5 justify-center items-center m-auto mt-1">
      <div className="flex flex-col justify-center items-center mb-7">
        <Share2 className="text-blue-500 h-10 w-10" />
        <h2 className="font-bold text-2xl">Create Account </h2>
        <p className="text-gray-500">Start Sharing Your Files Effortlessly</p>
      </div>
      <Card className=" p-5">
        <div>
          <h2 className="font-bold text-2xl">Sign Up</h2>
          <p className="text-sm text-gray-600">
            Create your Account to Get Started
          </p>
        </div>
        <form action={action}>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
           Name
          </label>
          <div className="relative mb-3">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
            name="name"
              type="text"
              id="Name"
              placeholder="John Doe"
              className="pl-9"
            />
          </div>
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
          <label htmlFor="password" className="block text-sm font-medium mb-2">
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
          <Button disabled={pending} className="w-full mt-5 bg-blue-500 hover:bg-blue-400">
           Create Account
          </Button>
          {pending && <p>loading...</p>}
          {state?.error && <div className="red">{state.error}</div>}
          {state?.success && <div className="text-green-500">{state.success}</div>}
        </form>
        <p className="w-full justify-center items-center text-center">
          Already have an account? <Link href="/login" className="text-blue-400">sign In</Link>
        </p>
      </Card>
    </div>
  );
}
