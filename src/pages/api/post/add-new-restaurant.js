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

    const categoriesCollection = db.collection("main");

    // Find the category
    const category = await categoriesCollection.findOne({
      categoryId: parseInt(categoryId, 10),
    });

    if (!category) {
      throw new Error("Category not found");
    }

    // Check if restaurant already exists
    const existingRestaurantIndex = category.restaurants.findIndex(
      (r) => r.restaurantName.toLowerCase() === restaurantName.toLowerCase()
    );

    if (existingRestaurantIndex !== -1) {
      // Restaurant exists, add new review
      const newReviewId =
        category.restaurants[existingRestaurantIndex].reviews.reduce(
          (max, review) => Math.max(max, review.reviewId),
          0
        ) + 1;

      const updateResult = await categoriesCollection.updateOne(
        {
          categoryId: parseInt(categoryId, 10),
          "restaurants.restaurantName": restaurantName,
        },
        {
          $push: {
            "restaurants.$.reviews": {
              reviewId: newReviewId,
              author: review.author,
              authorImage: review.authorImage,
              date: review.date || new Date().toISOString(),
              comment: review.comment,
              rating: review.rating,
            },
          },
        }
      );

      if (!updateResult.modifiedCount) {
        throw new Error("Failed to add review to existing restaurant");
      }

      res.status(200).json({
        message: "Review added to existing restaurant successfully",
        restaurantId:
          category.restaurants[existingRestaurantIndex].restaurantId,
        reviewId: newReviewId,
      });
    } else {
      // Restaurant does not exist, create new
      const newRestaurantId =
        category.restaurants.reduce(
          (max, restaurant) => Math.max(max, restaurant.restaurantId),
          0
        ) + 1;
      const newReviewId = 1; // Start with review ID 1 for new restaurant

      const newRestaurant = {
        restaurantId: newRestaurantId,
        restaurantName,
        restaurantImage: "restaurant2.png", // Default image or dynamic if you prefer
        totalReview: review.rating, // Initialize with the first review's rating
        address,
        reviews: [
          {
            reviewId: newReviewId,
            author: review.author,
            authorImage: review.authorImage,
            date: review.date || new Date().toISOString(),
            comment: review.comment,
            rating: review.rating,
          },
        ],
      };

      const insertResult = await categoriesCollection.updateOne(
        { categoryId: parseInt(categoryId, 10) },
        { $push: { restaurants: newRestaurant } }
      );

      if (!insertResult.modifiedCount) {
        throw new Error("Failed to add new restaurant to the category");
      }

      res.status(200).json({
        message: "New restaurant and review added successfully",
        restaurantId: newRestaurantId,
        reviewId: newReviewId,
      });
    }

    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to post new restaurant and review",
      error: error.message,
    });
  }
}
