"use server"
import { google } from "@/utils/arctic";
import * as arctic from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export  async function googleAuthAction(_, formData){
    const cookieStore = await cookies()
const state = arctic.generateState()
const codeVerifier = arctic.generateCodeVerifier()
 const scope = ["openid", "profile", "email"]
const url = google.createAuthorizationURL(state, codeVerifier, scope)

cookieStore.set("codeVerifier", codeVerifier)
redirect(url)

}