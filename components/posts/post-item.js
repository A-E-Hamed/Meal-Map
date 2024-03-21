import Image from "next/image";
import { Container, ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import styles from "./post-item.module.css";
import BasicRating from "../rating-stars/rating-stars";

const PostItem = ({ data }) => {
  const { restaurantName, restaurantImage, reviews, address } = data[0];
  console.log(restaurantImage);

  const imagePath = `/images/restaurants/${restaurantImage}`;

  return (
    <Card className={styles.container}>
      <Card.Header as="h5">{restaurantName}</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        {/* <Card.Text>{address}</Card.Text> */}
        <Container className={styles.cardSection}>
          <Image
            src={imagePath}
            alt={restaurantName}
            width={500}
            height={200}
          />
        </Container>
        {/* Check if reviews is not undefined before mapping */}
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
                  <Card.Text> {review.date}</Card.Text>
                </Container>
                <br />
                <Card.Text>"{review.comment}"</Card.Text>
                <br />
                <BasicRating value={review.rating} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        {/* Footer content if needed */}
      </Card.Footer>
    </Card>
  );
};

export default PostItem;
