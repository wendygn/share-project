import { S3Client } from "@aws-sdk/client-s3";

const { R2_S3_ENDPOINT, R2_ACCESS_ID, R2_ACCESS_SECRET } = process.env;

if (!R2_S3_ENDPOINT) {
  throw new Error("Missing env: R2_S3_ENDPOINT");
}
if (!R2_ACCESS_ID) {
  throw new Error("Missing env: R2_ACCESS_ID");
}
if (!R2_ACCESS_SECRET) {
  throw new Error("Missing env: R2_ACCESS_SECRET");
}
export const s3Client = new S3Client({
  region: "apac",
  endpoint: process.env.R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_ID,
    secretAccessKey: process.env.R2_ACCESS_SECRET,
  },
});