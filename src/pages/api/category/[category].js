// pages/api/category/[category].js
import { connectToDatabase } from "../../../../lib/db";

async function handler(req, res) {
  const { category } = req.query;

  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const db = client.db();

      // Decode the category from URL format to plain text
      const decodedCategory = decodeURIComponent(category.replace(/-/g, " "));

      // Find posts that match the decoded category
      const posts = await db
        .collection("posts")
        .find({ category: decodedCategory })
        .toArray();
      client.close();

      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failed to connect to database",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
