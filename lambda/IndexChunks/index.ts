import { Pinecone } from "@pinecone-database/pinecone";

interface Embedding {
  fileId: string;
  userEmail: string;
  chunkId: string;
  text: string;
  vector: number[];
}

export const handler = async (event: any) => {
  try {
    const input = event.body ?? event.input?.body ?? event;
    const { fileId, userEmail, embeddings } =
      typeof input === "string" ? JSON.parse(input) : input;

    if (!embeddings || embeddings.length === 0) {
      throw new Error("No embeddings found in input");
    }

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const indexName = "ai-chat-index";
    const index = pinecone.index(indexName);

    // Prepare vectors
    const upsertVectors = embeddings.map((emb: Embedding) => ({
      id: emb.chunkId,
      values: emb.vector,
      metadata: {
        fileId: emb.fileId,
        userEmail: emb.userEmail,
        chunk_text: emb.text,
      },
    }));

    await index.upsert(upsertVectors);

    return {
      statusCode: 200,
      body: {
        message: "Chunks indexed successfully",
        fileId,
        userEmail,
        totalChunks: upsertVectors.length,
      },
    };
  } catch (error) {
    console.error("IndexChunks failed", error);
    throw error;
  }
};
