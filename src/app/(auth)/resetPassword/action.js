"use server"
import crypto from "crypto";
import {sendResetEmail} from "@/utils/send"
import prisma from "@/utils/prisma";
import { getUserByEmailOnly } from "@/services/user";
import { userAgent } from "next/server";
export async function handleResetEmail(_, formData){
    
const email = formData.get("email")
const generatedToken = crypto.randomBytes(32).toString("hex")
console.log(`token : ${generatedToken}`)
const user =await getUserByEmailOnly(email)
console.log(`user : ${user}`)
await prisma.resetPassword.create({
    data: {
        token : generatedToken,
        userId: user.id,
        expiresAt : new Date(Date.now() + 15 * 60 * 1000)
    }
})
await sendResetEmail(email, generatedToken)

}