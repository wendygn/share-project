"use server"
import {sendResetEmail} from "@/utils/send"
export async function handleResetEmail(_, formData){
    
const email = formData.get("email")
await sendResetEmail(email)


}