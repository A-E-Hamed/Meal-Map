import React from "react";
import RestaurantCard from "./restaurants-card";
import styles from "./restaurants.module.css";

const Restaurants = ({ restaurants }) => {
  
  return (
    <div className={styles.container}>
      {restaurants.map(
        ({
          restaurantId,
          restaurantName,
          restaurantImage,
          address,
          totalReview,
        }) => (
          <RestaurantCard
            key={restaurantId}
            restaurant={restaurantName}
            restaurantImage={restaurantImage}
            address={address}
            totalReview={totalReview}
          />
        )
      )}
    </div>
  );
};

export default Restaurants;
