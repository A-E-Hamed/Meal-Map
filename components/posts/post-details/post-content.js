import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../spinner/Spinner";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import styles from "./post-content.module.css";

// Define a fetcher function that uses the native fetch API.
// This function can be reused by SWR for multiple requests.
const fetcher = (url) => fetch(url).then((res) => res.json());

const PostContent = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL

  // Use the useSWR hook to fetch post data.
  // The key is the API URL, which depends on the slug.
  // If slug is undefined, SWR will not fetch the data.
  const { data: post, error } = useSWR(
    slug ? `/api/post/${slug}` : null,
    fetcher
  );

  if (error) return <div>Failed to load post</div>; // Error state
  if (!post) return <Spinner />; // Loading state
  console.log(post);
  // Destructure post data for easy access
  const { restaurantName, title, image, content, AuthorName, address, date } =
    post;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const imagePath = `/images/posts/${image}`;
  const userImagePath = `/images/users/user-img.png`;

  return (
    <div className={styles.mainContainer}>
      <Card className={styles.container}>
        <Card.Header className={styles.cardHeader}>
          <Card.Text className={styles.cardName}>{restaurantName}</Card.Text>
          <Card.Text>{address}</Card.Text>
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Container className={styles.cardSection}>
            <Card.Text className={styles.cardText}>{content}</Card.Text>
            <Image src={imagePath} alt={title} width={300} height={200} />
          </Container>
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Image src={userImagePath} alt="user" width={50} height={50} />
          <Card.Text>{AuthorName}</Card.Text>
          <Card.Text>{formattedDate}</Card.Text>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default PostContent;
