import { createSession } from "@/services/auth";
import { createOauthSession, createUser, getUserByEmail } from "@/services/user";
import { google } from "@/utils/arctic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req) {
    const cookieStore = await cookies()
    const url = new URL(req.url)
    const code = url.searchParams.get("code")
    const codeVerifier = cookieStore.get("codeVerifier")?.value

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier)
        const accessToken = tokens.accessToken()
        const response = await fetch(
          "https://openidconnect.googleapis.com/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const userInfo = await response.json()
        console.log(userInfo)
        const checkUser = await getUserByEmail(userInfo.email)
        if(checkUser){

          const session = await createSession(checkUser.id)
          cookieStore.set("session", session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
        } else {
          const newUser = await createOauthSession(userInfo.name, userInfo.email)
          const session = await createSession(newUser.id);
          cookieStore.set("session", session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
        }
       
    } catch (e) {
      
    console.log(e)
}

redirect("/")
}