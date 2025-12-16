"use server";
import { getUserBySessionId, getUserByUserId } from "@/services/user";
import prisma from "@/utils/prisma";
import { s3Client } from "@/utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function uploadFileAction(formData) {
  const cookiesStore = await cookies();
  const files = formData.getAll("my-file");
  const result = [];
 const session = cookiesStore.get("session").value;
  const user = await getUserBySessionId(session)
const bucketName = process.env.R2_BUCKET;
const rDomain = process.env.R2_PUBLIC_DOMAIN;

 for (const file of files) {
   
    const buffer = Buffer.from(await file.arrayBuffer());
   
    const key = file.name;

    try {
      const fileUpload = await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: buffer,
          ContentType: file.type,
        })
      );
      const path = `https://${rDomain}/${bucketName}/${key}`;
      result.push({
        name: file.name,
        size: Number(file.size),
        path: path,
        userId : user
      });
    } catch (error) {
      console.log(error);
    }
  }

  if(result.length > 0) {
    try {
      await prisma.file.createMany({
        data : result,
        skipDuplicates : true
      })
    } catch (error) {
      console.error("create many errors", error)
    }
  }

 redirect("/dashboard")
}
