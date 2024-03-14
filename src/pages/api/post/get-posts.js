// pages/api/get-posts.js
import { connectToDatabase } from "../../../../lib/db";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const db = client.db();

      const posts = await db.collection("posts").find({}).toArray();
      console.log(posts);
      client.close();

      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({
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
