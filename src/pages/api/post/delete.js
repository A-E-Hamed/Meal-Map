import { connectToDatabase } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { reviewId, restaurantId } = req.body;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Removing the nested review within a specific restaurant
    const result = await db.collection("main").updateOne(
      { "restaurants.restaurantId": restaurantId },
      { $pull: { "restaurants.$.reviews": { reviewId: reviewId } } }
    );

    if (!result.modifiedCount) {
      throw new Error("Review could not be deleted");
    }

    client.close();
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete review", error: error.message });
  }
}
