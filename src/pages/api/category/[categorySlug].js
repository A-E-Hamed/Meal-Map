import { connectToDatabase } from "../../../../lib/db"; // Adjust the path as necessary

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { categorySlug } = req.query;
  const client = await connectToDatabase();
  const db = client.db();

  const categoryName = decodeURIComponent(categorySlug.replace(/-/g, " "))
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const categoryDoc = await db.collection("main").findOne({
    categoryName: { $regex: new RegExp("^" + categoryName + "$", "i") },
  });

  client.close();

  if (!categoryDoc) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json(categoryDoc.restaurants);
}
