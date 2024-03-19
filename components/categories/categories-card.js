import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CategoryCard = ({ category, categoryImage }) => {
  const router = useRouter(); // Hook for programmatic navigation
  const imagePath = `/images/categories/${categoryImage}`;

  const navigateToCategory = () => {
    // Replace spaces with hyphens and encode URI for special characters
    const categorySlug = encodeURIComponent(
      category.toLowerCase().replace(/\s+/g, "-")
    );
    router.push(`posts/category/${categorySlug}`);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imagePath} />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Button variant="primary" onClick={navigateToCategory}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
