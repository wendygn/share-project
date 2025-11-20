"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const Uploader = () => {
  const onDrop = useCallback((acceptedFiles) => {
    
  }, []);

const onDropRejected = useCallback((rejectedFile) => {
if(!rejectedFile || rejectedFile.length === 0) return
const tooManyFiles = rejectedFile.find((fileRejections) => {
 return fileRejections.errors[0].code === "too-many-files"
})

const fileTooLarge = rejectedFile.find((fileRejections) => {
  return fileRejections.errors[0].code === "file-too-large";
});
if(tooManyFiles) {
  toast.error("you only can upload 5 file at the time")
}

if(fileTooLarge) {
  toast.error("please upload file under 50mb")
}
}, []);

 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
  });

  return (
    <Card
      className="relative border-blue-300 border-2 border-dashed transition-colors w-4xl h-54 m-auto"
      {...getRootProps()}
    >
      <CardContent className="flex flex-col items-center justify-center w-full h-full">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="mb-2">
              Drag n drop some files here, or click to select files
            </p>
            <Button className="bg-blue-500 hover:bg-blue-400">
              Select Files
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
