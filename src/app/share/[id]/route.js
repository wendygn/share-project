import { getFilesById, getUserBySessionId } from "@/services/user"
import prisma from "@/utils/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"



export async function GET(_, {params}) {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session").value

    const {id} = await params
 
    if(!id) {
        return null
    }
  const userReceived = await getUserBySessionId(sessionId)
if(!userReceived){
    return null
}

    const file = await getFilesById(id)
    if(userReceived !== file.userId) {
        return null
    }

   await prisma.shared.create({
data : {
    id : file.id,
    name : file.name,
    path : file.path,
    size : file.size,
    userId : userReceived,

}
    })

redirect("/dashboard?tab=received");
   
}