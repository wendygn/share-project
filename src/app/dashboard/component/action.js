"use server"
import prisma from "@/utils/prisma";
import { s3Client } from "@/utils/s3";
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { headers } from "next/headers";

export default async function handleDeleteShare(_, formData) {
  const file = formData.get("delete");
  const key = formData.get("key")
  const action = formData.get("action");
  const bucket = process.env.R2_BUCKET;

  if (action === "delete") {
    (e) => {
     e.preventDefault();
    };

await prisma.file.delete({
    where : {
        id : file,
    }
})

await s3Client.send(
    new DeleteObjectCommand({
        Bucket : bucket,
        Key : key
    })
)

revalidatePath("/")

return {success : true}
  }

  if(action === "share") {
 
const origin = process.env.NEXT_PUBLIC_APP_URL;
  const baseUrl = `${origin}/share/${file}`
 return {baseUrl}
  }
}


export  async function handleDelete(formData) {
  const file = formData.get("delete") 
console.log(`ini id shared: ${file}`)
await prisma.shared.delete({
  where : {
    id : file
  }
})

revalidatePath("/")
}