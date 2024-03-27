// pages/api/restaurants-names.js
import { connectToDatabase } from "../../../../lib/db"; // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const db = client.db();

      // Fetch all documents from the "main" collection
      const categories = await db.collection("main").find({}).toArray();
      
      // Extract the restaurant names from each category
      let restaurantNames = [];
      categories.forEach(category => {
        const names = category.restaurants.map(restaurant => restaurant.restaurantName);
        restaurantNames = restaurantNames.concat(names);
      });

      client.close();
      res.status(200).json(restaurantNames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch restaurant names", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
