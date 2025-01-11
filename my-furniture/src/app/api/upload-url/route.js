import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    const { fileName, fileType } = await request.json();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({ uploadUrl }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
