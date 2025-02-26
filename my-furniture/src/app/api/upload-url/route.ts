import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { domain } from "@/lib/data";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

if (!process.env.AWS_REGION || !process.env.AWS_BUCKET_NAME) {
  throw new Error("Missing AWS environment variables.");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file") as File[];
    const names = formData.getAll("fileName") as string[];

    const filesWithNames = files.map((file, index) => ({
      file,
      fileName: names[index],
    }));

    if (files.length === 0) {
      return NextResponse.json({ error: "No files found in the request." }, { status: 400 });
    }

    const uploadUrls: string[] = [];

    for (const file of filesWithNames) {
      const fileStream = file.file.stream();
      const uploadedUrl = await uploadFileToS3(fileStream, file.fileName);
      uploadUrls.push(uploadedUrl);
    }

    return NextResponse.json({ uploadUrls }, { status: 200 });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json({ error: "Failed to upload files." }, { status: 500 });
  }
}

async function uploadFileToS3(fileStream: ReadableStream, fileName: string) {
  const bucketName = process.env.AWS_BUCKET_NAME!;
  const buffer = await streamToBuffer(fileStream);
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return `${process.env.CLOUDFRONT_URL}/${params.Key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file to S3.");
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

async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: any[] = [];

  let done, value;
  while ((({ done, value } = await reader.read()), !done)) {
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}
