"use client"
import { Button } from "@/components/ui/button";
import { Share2, Trash } from "lucide-react";
import Image from "next/image"
import ShareDelete from "./shareDeleteButton";

export function SentList({files, onShared}) {
   if(!files || files.length === 0) {
    return <div>no files yet</div>
   }
    return (
      <div>
        {files.map((file) => (
          <div
            key={file.id}
            className="flex border-2 rounded-md justify-start mb-3 bg-gray-50 hover:shadow-lg"
          >
            <Image
              className="rounded-md m-2"
              src={file.path}
              alt=""
              width={70}
              height={50}
            />
            <div className="flex justify-between w-full p-4 ">
              <div className="block items-center">
                <div className="text-xs font-bold">{file.name}</div>
                <p className="text-xs">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <ShareDelete
                fileId={file.id}
                objectKey={file.name}
              />
            </div>
          </div>
        ))}
      </div>
    );
}