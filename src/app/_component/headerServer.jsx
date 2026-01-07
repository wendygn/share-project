"use server"

import prisma from "@/utils/prisma";
import { cookies } from "next/headers";
import { Header } from "./header";

export default async function HeaderServer() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session")?.value
let isLogin = false
    if(sessionId) {
        const session = await prisma.session.findUnique({
            where : {
                id : sessionId
            }
        })
isLogin = !!session
    }
return <Header isLogin= {isLogin} />
}