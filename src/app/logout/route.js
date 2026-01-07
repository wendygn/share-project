import prisma from "@/utils/prisma";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies()
    const sessionId = await cookieStore.get("session")?.value

    if(sessionId) {
      
await prisma.session.delete({
    where : {
        id : sessionId
    }
})
cookieStore.delete("session")

    }
    return NextResponse.json({ success: true });
}