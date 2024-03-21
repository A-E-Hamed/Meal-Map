// pages/api/post/get-reviews/[slug].js
import { connectToDatabase } from "../../../../lib/db"; // Adjust the import path as necessary

// Utility function to convert slug to title case
function slugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { slug } = req.query;
    const restaurantName = slugToTitle(slug);

    try {
      const client = await connectToDatabase();
      const db = client.db();

      // Assuming each document in the "main" collection represents a category
      const categories = await db.collection("main").find({}).toArray();
      let reviews = [];

      // Find the specific restaurant and its reviews
      categories.forEach((category) => {
        category.restaurants.forEach((restaurant) => {
          if (restaurant.restaurantName === restaurantName) {
            // Assuming you want to return the restaurant details along with the reviews
            reviews = [restaurant];
          }
        });
      });

      client.close();
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to fetch reviews", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
