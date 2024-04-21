import { connectToDatabase } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const db = client.db();

      // Fetch all documents from the "main" collection
      const categories = await db.collection("main").find({}).toArray();

      client.close();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to fetch categories", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
