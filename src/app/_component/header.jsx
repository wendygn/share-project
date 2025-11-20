import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between px-15 py-2 bg-white items-center">
      <div className="flex">
        <Share2 className="text-blue-500" />
        <div className="text-blue-500">FileShare</div>
      </div>
      <div className="flex gap-2">
        <Link href="/" className="px-1 rounded bg-blue-500 hover:bg-blue-400" size="nav">
          home
        </Link>
        <Link
          href="/dashboard"
          className="bg-blue-500 hover:bg-blue-400"
          size="nav"
        >
          Dashboard
        </Link>
        
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-400"
            size="nav"
          >
            login
          </Link>
      </div>
    </header>
  );
};
