import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler = async (event: any) => {
  try {
    const input = event.body ?? event.input?.body ?? event;
    const { fileId, userEmail, chunks } =
      typeof input === "string" ? JSON.parse(input) : input;

    if (!chunks || !Array.isArray(chunks)) {
      throw new Error("No chunks array found in input");
    }

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const index = pinecone.index("ai-chat-index");

    // Process chunks sequentially or in small batches
    for (const chunk of chunks) {
      const response = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk.content,
      });

      const embedding = response.data[0].embedding;

      await index.upsert([
        {
          id: chunk.id,
          values: embedding,
          metadata: {
            fileId,
            userEmail,
            chunk_text: chunk.content,
          },
        },
      ]);
    }

    return {
      statusCode: 200,
      body: {
        message: "Chunks embedded and indexed successfully",
        fileId,
        userEmail,
        totalChunks: chunks.length,
      },
    };
  } catch (err) {
    console.error("EmbedAndIndexChunks error:", err);
    throw err;
  }
};
