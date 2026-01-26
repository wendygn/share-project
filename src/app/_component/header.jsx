"use client"
import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import NavLink from "./navlink";
import { Button } from "@/components/ui/button";
import { useLogout } from "./useLogout";

export const Header = ({isLogin}) => {
  const logout = useLogout()
const pathName = usePathname() || "/"
const normalize = (p) => p.replace(/\/$/,'') || '/'
const p = normalize(pathName)



  return (
    <header className="flex justify-between px-15 py-2 bg-white items-center">
      <div className="flex">
        <Share2 className="text-blue-500" />
        <div className="text-blue-500">FileShare</div>
      </div>
      <div className="flex gap-2">
        <NavLink href="/" isActive={p === "/"}>
          home
        </NavLink>
        <NavLink href="/dashboard" isActive={p.startsWith("/dashboard")}>
          Dashboard
        </NavLink>

        {!isLogin ? (
          <NavLink href="/login" isActive={p === "/login"}>
            Login
          </NavLink>
        ) : (
          <Button className="bg-blue-500 text-white" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};
