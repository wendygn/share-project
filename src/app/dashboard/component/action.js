"use server"
import prisma from "@/utils/prisma";
import { s3Client } from "@/utils/s3";
import { DeleteObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";


export default async function handleDeleteShare(_, formData) {
  const file = formData.get("delete");
  const key = formData.get("key")
  const action = formData.get("action");
  const bucket = process.env.R2_BUCKET;

  if (action === "delete") {
    (e) => {
     e.preventDefault();
    };

await s3Client.send(
    new DeleteObjectCommand({
        Bucket : bucket,
        Key : key
    })
)


await prisma.file.delete({
  where: {
    id: file,
  },
});

await prisma.shared.delete({
  where : {
    id : file
  }
})

revalidatePath("/")

return {success : true}
  }

  if(action === "share") {
 
const origin = process.env.NEXT_PUBLIC_APP_URL;
  const baseUrl = `${origin}/share/${file}`
 return {baseUrl}
  }

  if(action === "download") {
    const origin = process.env.NEXT_PUBLIC_APP_URL;
    const baseUrl = `${origin}/download/${file}`;
    return { baseUrl };

  }}


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