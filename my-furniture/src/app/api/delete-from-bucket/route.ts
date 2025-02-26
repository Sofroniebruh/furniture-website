import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function DeleteFromBucket(fileName: string) {
  const bucketName = process.env.AWS_BUCKET_NAME;

  const params = {
    Bucket: bucketName,
    Key: fileName.split(".net/")[1],
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);

      return false;
    }
  }
}
