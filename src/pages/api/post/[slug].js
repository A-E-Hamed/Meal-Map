// File: /pages/api/posts/[slug].js
import { connectToDatabase } from "../../../../lib/db"; // Adjust the path as necessary

async function getPostBySlug(db, slug) {
  // Assuming your collection is named "posts"
  const post = await db.collection("posts").findOne({ slug: slug });
  return post;
}

export default async function handler(req, res) {
  const { slug } = req.query; // Get the slug from the URL
  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (!client) {
    res.status(500).json({ message: "Database connection failed!" });
    return;
  }

  try {
    const db = client.db();
    const post = await getPostBySlug(db, slug);

    if (!post) {
      client.close();
      res.status(404).json({ message: "Post not found." });
      return;
    }

    // Convert _id (ObjectId) to string
    post._id = post._id.toString();

    client.close();
    res.status(200).json(post);
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Fetching the post failed!" });
  }
}
