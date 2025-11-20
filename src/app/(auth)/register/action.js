"use server"

import { createUser, getUserByEmail } from "@/services/user";

export default async function HandleRegister(_, formData) {
const name = formData.get("name")
const email = formData.get("email")
const password = formData.get("password")

if(!name || !email || !password) {
    console.log("all fields are requiered")
    return {error : "all fields are requiered"};
    }

    
    const getUser = await getUserByEmail(email)
    if(getUser) {
        return {
          error :  'User already exists'
        }
    }

    const newUser = await createUser(name, email, password)
    return { success: "User created successfully", user: newUser };
    
}
