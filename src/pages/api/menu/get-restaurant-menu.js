import { connectToDatabase } from "../../../../lib/db"; // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query; // Extract the 'id' from query parameters
    if (!id) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    try {
      const client = await connectToDatabase();
      const db = client.db();
      const menusData = await db
        .collection("menus")
        .find({ restaurantId: parseInt(id) })
        .toArray();
      res.status(200).json(menusData);
      client.close();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to fetch menu data", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
