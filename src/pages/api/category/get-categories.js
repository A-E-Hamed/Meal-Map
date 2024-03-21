// pages/api/category/get-categories.js
import { connectToDatabase } from "../../../../lib/db"; 

async function handler(req, res) {
  if (req.method === "GET") {
    let client;

    try {
      client = await connectToDatabase();
      const db = client.db();

      // Fetch only the necessary fields from each category document
      const categories = await db
        .collection("main")
        .find(
          {},
          {
            projection: {
              _id: 0,
              categoryId: 1,
              categoryName: 1,
              categoryImage: 1,
            },
          }
        )
        .toArray();

      return res.status(200).json(categories);
    } catch (error) {
      console.error("Failed to retrieve categories:", error);
      return res
        .status(500)
        .json({ message: "Failed to connect to database or fetch data." });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    // If the request is not a GET request, return Method Not Allowed
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
