import { connectToDatabase } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { reviewId, updatedComment, restaurantId } = req.body;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Updating the nested review within a specific restaurant
    const result = await db.collection("main").updateOne(
      { "restaurants.restaurantId": restaurantId, "restaurants.reviews.reviewId": reviewId },
      { $set: { "restaurants.$.reviews.$[elem].comment": updatedComment } },
      { arrayFilters: [{ "elem.reviewId": reviewId }] }
    );

    if (!result.modifiedCount) {
      throw new Error("Review could not be updated");
    }

    client.close();
    return res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update review", error: error.message });
  }
}
