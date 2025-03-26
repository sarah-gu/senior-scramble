import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { file_key } = await req.json();
  const client_s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
  });
  try {
    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: file_key,
      Expires: 10,
    };

    const url = await client_s3.getSignedUrlPromise("getObject", fileParams);

    return NextResponse.json({ message: "success", url: url });
  } catch (error) {
    console.log("AWS S3 API - get_file.tsx - POST Error:", error);

    return NextResponse.json({ message: "error - could not push" });
  }
};
