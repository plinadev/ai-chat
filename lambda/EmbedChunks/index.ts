import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler = async (event: any) => {
  try {
    const input = event.body ?? event.input?.body ?? event;
    const { fileId, userEmail, chunks } = input;

    if (!chunks || !Array.isArray(chunks)) {
      throw new Error("No chunks array found in input");
    }

    // Generate embeddings for each chunk
    const embeddings = await Promise.all(
      chunks.map(async (chunk: any) => {
        const response = await client.embeddings.create({
          model: "text-embedding-3-small",
          input: chunk.content,
        });

        return {
          fileId,
          userEmail,
          chunkId: chunk.id,
          text: chunk.content,
          vector: response.data[0].embedding,
        };
      })
    );

    return {
      statusCode: 200,
      body: {
        fileId,
        userEmail,
        embeddings,
        metadata: {
          totalChunks: chunks.length,
        },
      },
    };
  } catch (err) {
    console.error("EmbedChunks error:", err);
    throw err;
  }
};
