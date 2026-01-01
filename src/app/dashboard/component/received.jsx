"use client"
import { Button } from "@/components/ui/button";
import { Share2, Trash } from "lucide-react";
import Image from "next/image"

import DeleteShared from "./sharedDeletebtn";

export function ReceivedList({shared}) {
   if(!shared || shared.length === 0) {
    return <div>no files yet</div>
   }
    return (
      <div>
        {shared.map((share) => (
          <div
            key={share.id}
            className="flex border-2 rounded-md justify-start mb-3 bg-gray-50 hover:shadow-lg"
          >
            <Image
              className="rounded-md m-2"
              src={share.path}
              alt=""
              width={70}
              height={50}
            />
            <div className="flex justify-between w-full p-4 ">
              <div className="block items-center">
                <div className="text-xs font-bold">{share.name}</div>
                <p className="text-xs">
                  {(share.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
             <DeleteShared sharedId={share.id} />
            </div>
          </div>
        ))}
      </div>
    );
}
