import Image from "next/image";
import { Container, ListGroup, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import styles from "./restaurant-reviews.module.css";
import BasicRating from "../rating-stars/rating-stars";
import RegularReviewForm from "../regular-review/regular-review-form";
import { useSession } from "next-auth/react";
import { IoTrashOutline } from "react-icons/io5";
import RestaurantMenu from "../ui/restaurant-menu";
import Carousel from "react-bootstrap/Carousel";

const RestaurantReviews = ({ data, menu }) => {
  const { restaurantId, restaurantName, restaurantImage, address } = data[0];
  // Initialize reviews state with the reviews prop
  const [reviews, setReviews] = useState(data[0].reviews);
  const [showForm, setShowForm] = useState(false);

  const { data: session } = useSession();

  const imagePath = `/images/restaurants/${restaurantImage}`;
  const handleDeleteReview = async (reviewId) => {
    console.log("Deleting review with ID:", reviewId);
    try {
      const response = await fetch("/api/post/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, restaurantId }),
      });

      if (!response.ok) throw new Error("Failed to delete review");
      // Remove the deleted review from the local state
      setReviews(reviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className={styles.container}>
      <Card.Header as="h5">{restaurantName}</Card.Header>

      <Card.Body>
        <Container className={styles.cardSection}>
          <Carousel style={{ height: "100%", width: "100%" }}>
            <Carousel.Item interval={2000}>
              <img
                src={imagePath}
                alt={restaurantName}
                style={{ objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                src="/images/restaurants/dummy-restaurant.jpg"
                alt={restaurantName}
                style={{ objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                src="/images/restaurants/dummy-restaurant2.jpg"
                alt={restaurantName}
                style={{ objectFit: "cover" }}
              />
            </Carousel.Item>
          </Carousel>

          <div className={styles.controllers}>
            <Button onClick={() => setShowForm(true)} className="button">
              Menu
            </Button>
            <Button className="button">About</Button>
          </div>
          {showForm && (
            <RestaurantMenu
              status="success"
              onClose={() => setShowForm(false)}
              menu={menu}
            />
          )}
        </Container>
        {reviews && (
          <ListGroup variant="flush">
            {reviews.map((review) => (
              <ListGroup.Item key={review.reviewId}>
                <Container className={styles.reviewHeader}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Image
                      src={`/images/users/${review.authorImage}`}
                      alt={review.author}
                      width={30}
                      height={30}
                    />
                    <Card.Text>{review.author}</Card.Text>
                  </div>

                  <BasicRating value={review.rating} />
                  {session && review.email === session.user.email && (
                    <div className={styles.deleteButton}>
                      <IoTrashOutline
                        onClick={() => handleDeleteReview(review.reviewId)}
                      />
                    </div>
                  )}
                </Container>
                <Card.Text className={styles.cardText}>
                  "{review.comment}"
                </Card.Text>
                <Card.Footer className={styles.cardFooter}>
                  <Card.Text className={styles.date}>{review.date}</Card.Text>
                </Card.Footer>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
      <RegularReviewForm key={restaurantId} restaurantId={restaurantId} />
    </Card>
  );
};

export default RestaurantReviews;
