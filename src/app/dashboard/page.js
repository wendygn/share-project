
import {  Inbox, Package, Send } from "lucide-react";
import { Header } from "../_component/header";
import {
  getFilesByUserId,
  getSharedByUserId,
  getUserById,
  getUserBySessionId,
} from "@/services/user";
import { cookies } from "next/headers";
import DashboardSelection from "./component/DashboardSelection";

import { redirect } from "next/navigation";





export default async function Page() {
 const cookiesStore = await cookies()
    const session = cookiesStore.get("session")?.value
    if(!session) {
      console.log("ini redirect dari dashboard")
redirect("/login")
    }
   const userId = await getUserBySessionId(session)
   
   const files = await getFilesByUserId(userId)
   const shared = await getSharedByUserId(userId)
  
    return (
      <div className="h-full">
        <Header />

       <DashboardSelection files={files} shared={shared} />
      </div>
    );
}