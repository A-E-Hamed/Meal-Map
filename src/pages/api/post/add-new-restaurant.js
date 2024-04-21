// pages/api/post/post-restaurant-with-review.js
import { connectToDatabase } from "../../../../lib/db"; // Adjust the import path as necessary

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const { categoryId, restaurantName, address, review } = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    // Assuming 'main' is your collection name
    const categoriesCollection = db.collection("main");

    // Fetch the category to find the current max restaurantId and reviewId
    const category = await categoriesCollection.findOne({
      categoryId: parseInt(categoryId, 10),
    });

    if (!category) {
      throw new Error("Category not found");
    }

    // Determine new restaurantId
    let maxRestaurantId = 0;
    if (category.restaurants && category.restaurants.length > 0) {
      maxRestaurantId = category.restaurants.reduce(
        (max, restaurant) => Math.max(max, restaurant.restaurantId),
        0
      );
    }
    const newRestaurantId = maxRestaurantId + 1;

    // Determine new reviewId
    let maxReviewId = 0;
    if (category.restaurants) {
      category.restaurants.forEach((restaurant) => {
        if (restaurant.reviews && restaurant.reviews.length > 0) {
          const maxId = restaurant.reviews.reduce(
            (max, review) => Math.max(max, review.reviewId),
            0
          );
          maxReviewId = Math.max(maxReviewId, maxId);
        }
      });
    }
    const newReviewId = maxReviewId + 1;

    // Create a new restaurant object
    const newRestaurant = {
      restaurantId: newRestaurantId,
      restaurantName,
      restaurantImage: "restaurant2.png",
      totalReview: 4.5,
      address,
      reviews: [
        {
          reviewId: newReviewId,
          author: review.author,
          authorImage: review.authorImage,
          date: review.date || new Date().toISOString(), // Use the provided date or the current date
          comment: review.comment,
          rating: review.rating,
        },
      ],
    };

    // Add the new restaurant with its initial review to the specified category
    const updateResult = await categoriesCollection.updateOne(
      { categoryId: parseInt(categoryId, 10) },
      { $push: { restaurants: newRestaurant } }
    );

    if (!updateResult.modifiedCount) {
      throw new Error("Restaurant could not be added to the category");
    }

    client.close();
    res.status(200).json({
      message: "Restaurant and review added successfully",
      restaurantId: newRestaurantId,
      reviewId: newReviewId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to post new restaurant and review",
      error: error.message,
    });
  }
}
