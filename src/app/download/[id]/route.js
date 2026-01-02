import { getFilesById } from "@/services/user"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { s3Client } from "@/utils/s3";

export async function GET(_, {params}) {
    const {id} = await params
    const file = await getFilesById(id)

    if(!file) {
        return null
    }

    const key = file.name
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key : key
    });

     const data = await s3Client.send(command);

     return new Response(data.Body, {
       headers: {
         "Content-Type": "application/octet-stream",
         "Content-Disposition": `attachment; filename="${key}"`,
       },
     });
}