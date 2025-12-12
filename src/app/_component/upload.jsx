"use client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { set } from "date-fns";
import { X } from "lucide-react";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";
import Image from "next/image";
import React, { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { object } from "zod";
import { uploadFileAction } from "./action";

export const Uploader = () => {
  const [files, setFiles] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);
  const hiddenInputRef = useRef(null)
  
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      return;
    }

    const existingKeys = new Set(files.map((f) => `${f.name}-${f.size}`));

    const newFiles = [];
    const duplicateNames = [];

    for (const file of acceptedFiles) {
      const key = `${file.name}-${file.size}`;
      if (existingKeys.has(key)) {
        duplicateNames.push(file.name);
        continue;
      }

      
      newFiles.push(
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      existingKeys.add(key);
    }

    
    if (duplicateNames.length > 0) {
      const uniqueDup = [...new Set(duplicateNames)];
      toast.error(
        `${uniqueDup.length} file duplicate tidak ditambahkan: ${uniqueDup.join(
          ", "
        )}`
      );
    }

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);

    
      if(hiddenInputRef.current) {
        const dataTransfer = new DataTransfer()
        newFiles.forEach((v) => {
          dataTransfer.items.add(v)
        })
        hiddenInputRef.current.files = dataTransfer.files;
      }
    
    }
  }, [files]);

  const onDropRejected = useCallback((rejectedFile) => {
    if (!rejectedFile || rejectedFile.length === 0) return;

    const normalize = rejectedFile.map((reject) => {
      const file = reject.file;
      return {
        file,
        errors: reject.errors,
        preview: URL.createObjectURL(file),
      };
    });

    const tooManyFiles = rejectedFile.find((fileRejections) => {
      return fileRejections.errors[0].code === "too-many-files";
    });

    const fileTooLarge = rejectedFile.find((fileRejections) => {
      return fileRejections.errors[0].code === "file-too-large";
    });
    if (tooManyFiles) {
      toast.error("you only can upload 5 file at the time");
    }

    if (fileTooLarge) {
      toast.error("please upload file under 5mb");
    }

    setErrorFiles((previousFile) => [...previousFile, ...normalize]);
    console.log(normalize);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: true,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
  });
  const removeFile = (fileName) => {
    setFiles(
      files.filter((file) => {
        return file.name !== fileName;
      })
    );
  };

  const deleteRejectedFile = (fileName) => {
    setErrorFiles(
      errorFiles.filter((reject) => {
        return reject.file.name !== fileName;
      })
    );
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files, errorFiles]);
  return (
    <>
      <Card
        className="relative border-blue-300 border-2 border-dashed transition-colors w-4xl h-54 m-auto"
        {...getRootProps()}
      >
        <CardContent className="flex flex-col items-center justify-center w-full h-full ">
          <input name="file" {...getInputProps()} />
          <input
            type="file"
            name="my-file"
            ref={hiddenInputRef}
            form="uploadForm"
            style={{ opacity: 0 }}
          />
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
      <div className="flex w-4xl m-auto gap-2 mt-4">
        <div className="border-2 border-blue-300 w-full max-w-1/2 p-2">
          <p className="text-blue-400">Accepted Files : </p>
          <div className="flex  gap-2.5 sb-hover overflow-x-auto whitespace-nowrap ">
            {files.map((file) => {
              return (
                <div
                  key={file.name}
                  className="relative overflow-hidden border h-20 w-20 shrink-0  border-blue-200 rounded-md"
                >
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={50}
                    height={50}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <Button
                    className="w-2 h-2 bg-red-400 absolute top-0 right-0 hover:bg-red-600"
                    onClick={() => {
                      return removeFile(file.name);
                    }}
                  >
                    <X className="h-1 w-1" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-2 border-blue-300 w-full max-w-1/2 p-2 ">
          <p className="text-blue-400">rejected File : </p>

          <div className="flex gap-2.5 sb-hover overflow-x-auto whitespace-nowrap ">
            {errorFiles.map((reject) => {
              return (
                <div
                  key={reject.file.name}
                  className="relative overflow-hidden border-2 border-blue-200 rounded-md h-20 w-20 shrink-0 "
                >
                  <Image
                    src={reject.preview}
                    alt={reject.file.name}
                    width={50}
                    height={50}
                    onLoad={() => {
                      URL.revokeObjectURL(reject.file.preview);
                    }}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <Button
                    className="w-2 h-2 bg-red-400 absolute top-0 right-0 hover:bg-red-600"
                    onClick={() => {
                      return deleteRejectedFile(reject.file.name);
                    }}
                  >
                    <X className="h-1 w-1" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <form
      action={uploadFileAction}
        id="uploadForm"
        name="my-file"
        className="max-w-4xl w-full m-auto text-center mt-3"
       
      >
        <Button  size="sm" className="w-25 bg-blue-500 m-auto hover:bg-blue-400" type="submit">Uploads</Button>
      </form>
    </>
  );
};
