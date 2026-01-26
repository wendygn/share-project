"use client"

import { useRouter } from "next/navigation"

export function useLogout() {
const router = useRouter()
 const logout = async() => {
    await fetch("/logout", {
        method : "POST",
        credentials : "include"
    })
   router.push("/login");
    router.refresh()
     
 }
 return logout;
}