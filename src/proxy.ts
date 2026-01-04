import { NextResponse } from "next/server";



export const config = {
  matcher: ["/((?!login|register|api|_next|favicon.ico).*)"],
};

export default function proxy(req) {
  console.log("run proxy")
  const sessionId = req.cookies.get("session")?.value;
  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

