// pages/api/post/post-review.js
import { connectToDatabase } from "../../../../lib/db"; // Adjust the import path as necessary
import { ObjectId } from 'mongodb'; // Import ObjectId for generating unique IDs

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const { restaurantId, review } = req.body; // Now we expect restaurantId directly

    // Generate a unique ObjectId for this review
    review.reviewId = new ObjectId().toString(); // Add a unique ID to the review object

    const client = await connectToDatabase();
    const db = client.db();

    // Assuming 'main' is your collection name
    const categoriesCollection = db.collection("main");

    // Ensure restaurantId is handled according to how it's stored (as a string or number)
    const parsedRestaurantId = typeof restaurantId === 'number' ? restaurantId : parseInt(restaurantId, 10);

    // Find the restaurant to add a review using restaurantId
    const updateResult = await categoriesCollection.updateOne(
      { "restaurants.restaurantId": parsedRestaurantId }, // Match by restaurantId
      { $push: { "restaurants.$.reviews": review } } // Push the review (now with an ID) into the reviews array
    );

    if (!updateResult.modifiedCount) {
      throw new Error("Review could not be added");
    }

    client.close();
    // Include the reviewId in the response for potential client-side use
    res.status(200).json({ message: "Review added successfully", reviewId: review.reviewId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to post review", error: error.message });
  }
}
