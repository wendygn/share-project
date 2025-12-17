
import {  Inbox, Package, Send } from "lucide-react";
import { Header } from "../_component/header";
import {
  getFilesByUserId,
  getUserById,
  getUserBySessionId,
} from "@/services/user";
import { cookies } from "next/headers";
import DashboardSelection from "./component/DashboardSelection";
import ShareDelete from "./component/shareDeleteButton";




export default async function Page() {
 const cookiesStore = await cookies()
    const session = cookiesStore.get("session").value
    if(!session) {
        return null
    }
   const userId = await getUserBySessionId(session)
   const files = await getFilesByUserId(userId)
    return (
      <div className="h-full">
        <Header />

       <DashboardSelection files={files} />
      </div>
    );
}