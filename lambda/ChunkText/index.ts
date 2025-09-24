export const handler = async (event: any) => {
  console.log("ChunkText input:", JSON.stringify(event, null, 2));

  const { fileId, userEmail, text } = event.body || event;

  if (!text) {
    throw new Error("No text provided for chunking");
  }

  // Chunking configuration
  const CHUNK_SIZE = 1000;
  const CHUNK_OVERLAP = 200;

  const chunks: { id: string; content: string }[] = [];
  let start = 0;
  let chunkId = 0;

  while (start < text.length) {
    const end = Math.min(start + CHUNK_SIZE, text.length);
    const chunkText = text.slice(start, end);

    chunks.push({
      id: `${fileId}_chunk_${chunkId}`,
      content: chunkText.trim(),
    });

    chunkId++;
    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }

  console.log(`Created ${chunks.length} chunks`);

  return {
    statusCode: 200,
    body: {
      fileId,
      userEmail,
      chunks,
      metadata: {
        totalChunks: chunks.length,
        chunkSize: CHUNK_SIZE,
        overlap: CHUNK_OVERLAP,
      },
    },
  };
};
