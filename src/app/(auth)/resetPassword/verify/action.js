"use server"
import { hashPassword } from "@/services/auth"
import prisma from "@/utils/prisma"
import { redirect } from "next/navigation"

export async function handleVerification(formData){
 const email = formData.get("email")
 const token = formData.get("token")
 const newPassword = formData.get("newPassword")

if(!email || !token || !newPassword){
    return {
        error : "all fields are required"
    }
}

 const resetToken =await prisma.resetPassword.findUnique({
    where: {
        token : token
    },
    select : {
token : true,
expiresAt : true
    }
 })

 if (resetToken.token !== token) {
   return {
     error: "invalid token",
   };
 }



 if (resetToken.token === token){
    
const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
        where : {
            email : email
        },
        data : {
            password : hashedPassword
        }
        
    })

    await prisma.resetPassword.delete({
        where : {
            token : token
        }
    })
 }

 redirect("/")
}
