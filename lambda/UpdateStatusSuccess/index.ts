import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = process.env.MONGO_URI!;

const COLLECTION = "files";

export const handler = async (event: any) => {
  try {
    const input = event.body ?? event.input?.body ?? event;
    const { fileId } = input;

    if (!fileId) throw new Error("Missing fileId");

    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection(COLLECTION);

    const result = await collection.updateOne(
      { _id: new ObjectId(fileId as string) },
      { $set: { status: "success" } }
    );

    await client.close();

    return {
      statusCode: 200,
      body: {
        message: "Upload status updated to success",
        modifiedCount: result.modifiedCount,
      },
    };
  } catch (error) {
    console.error("UpdateStatusSuccess failed", error);
    throw error;
  }
};
