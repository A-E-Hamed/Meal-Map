import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import styles from "./post-item.module.css";
import BasicRating from "../rating-stars/rating-stars";

const PostItem = (props) => {
  const {
    title,
    date,
    content,
    image,
    slug,
    restaurantName,
    address,
    AuthorName,
    rating
  } = props.post;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${image}`;
  const linkPath = `/posts/${slug}`;
  const userImagePath = `/images/users/user-img.png`;
  return (
    <Card className={styles.container}>
      <Link href={linkPath}>
        <Card.Header>{restaurantName}</Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Container className={styles.cardSection}>
            <Card.Text className={styles.cardText}>{content}</Card.Text>
            <Image src={imagePath} alt={title} width={300} height={200} />
          </Container>
          <BasicRating value={rating} />
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Image src={userImagePath} alt="user" width={50} height={50} />
          <Card.Text>{AuthorName}</Card.Text>
          <Card.Text>{formattedDate}</Card.Text>
        </Card.Footer>
      </Link>
    </Card>
  );
};

export default PostItem;
