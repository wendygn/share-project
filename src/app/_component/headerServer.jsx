"use server"

import prisma from "@/utils/prisma";
import { cookies } from "next/headers";
import { Header } from "./header";
import { getUserBySessionId } from "@/services/user";

export default async function HeaderServer() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session")?.value
let isLogin = false
let user = null
    if(sessionId) {
        const session = await prisma.session.findUnique({
            where : {
                id : sessionId
            }
        })

 const userId = await getUserBySessionId(sessionId);
 
 const dbUser = await prisma.user.findUnique({
   where: {
     id: userId,
   },
   select: {
     name: true,
     email: true,
   },
 });
 if (dbUser) {
   isLogin = !!session
   user = dbUser
 }



    }

    

return <Header isLogin= {isLogin} user={user} />
}