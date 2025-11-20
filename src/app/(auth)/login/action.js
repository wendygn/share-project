"use server"

import { createSession, verifyPassword} from "@/services/auth";
import { getUserByEmail } from "@/services/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HandleLogin(_, formData) {
const cookieStore = await cookies()
const email = formData.get("email")
const password = formData.get("password")

if(!password || !email) {
    return {error : "all fields are required"}
}

 const withPassword = true
    const getUser = await getUserByEmail(email, withPassword)
    if(!getUser) {
        return {
          error :  'user not found'
        }
    }

const validatePasword = await verifyPassword(password, getUser.password)
if(!validatePasword) {
    return { error : "password invalid"}
}

const session = await createSession(getUser.id)
cookieStore.set("session", session.id, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30,
  path: "/",
});
redirect("/")
}