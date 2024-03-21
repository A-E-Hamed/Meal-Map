import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const RestaurantCard = ({ restaurant, restaurantImage }) => {
  const router = useRouter();
  const imagePath = `/images/restaurants/${restaurantImage}`;

  const navigateToRestaurant = () => {
    // Replace spaces with hyphens and encode URI for special characters
    const restaurantSlug = encodeURIComponent(
      restaurant.toLowerCase().replace(/\s+/g, "-")
    );
    router.push(`/posts/restaurant/${restaurantSlug}`);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imagePath} height={220} />
      <Card.Body>
        <Card.Title>{restaurant}</Card.Title>
        <Button variant="primary" onClick={navigateToRestaurant}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
