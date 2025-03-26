import S3 from "aws-sdk/clients/s3";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  // Extract the key of the file to be deleted from the request
  const { file_key } = await req.json();

  // Initialize the S3 client
  const client_s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  try {
    // Deleting the file from the specified bucket
    await client_s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME ?? "",
        Key: file_key,
      })
      .promise();

    // Sending a success response
    return NextResponse.json({ message: "success - file deleted" });
  } catch (error) {
    console.log("AWS S3 API - delete_file.tsx - DELETE Error:", error);
    // Sending an error response if the deletion fails
    return NextResponse.json({ message: "error - could not delete file" });
  }
};
