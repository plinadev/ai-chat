import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import pdf from "pdf-parse/lib/pdf-parse.js";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  console.log("ExtractText input:", JSON.stringify(event, null, 2));

  const { bucket, key, fileId, userEmail } = event;

  if (!bucket || !key) {
    throw new Error("Bucket or key missing in event");
  }

  try {
    // Step 1: Download PDF from S3
    const response = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    console.log("S3 object received:", !!response.Body);

    // Step 2: Convert S3 stream to Buffer
    const stream = response.Body;
    if (!stream) throw new Error("S3 response Body is empty");

    const chunks: Uint8Array[] = [];
    for await (const chunk of stream as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    console.log("Total buffer length:", buffer.length);

    if (buffer.length === 0) {
      throw new Error("Buffer is empty, cannot parse PDF");
    }

    // Step 3: Extract text from buffer
    const data = await pdf(buffer);
    console.log("Extracted text length:", data.text?.length ?? 0);

    return {
      statusCode: 200,
      body: {
        fileId,
        userEmail,
        text: data.text || "",
        metadata: {
          numpages: data.numpages,
          numrender: data.numrender,
          info: data.info,
          version: data.version,
        },
      },
    };
  } catch (err) {
    console.error("Error extracting text:", err);
    throw new Error(
      `ExtractText failed for fileId=${fileId}, userEmail=${userEmail}: ${err}`
    );
  }
};
