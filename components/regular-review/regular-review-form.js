import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";

const RegularReviewForm = ({ restaurantId }) => {
  const { data: session } = useSession();
  const [reviewText, setReviewText] = useState("");
  const router = useRouter();

  console.log(session);

  const handleSubmit = async () => {
    if (!session) {
      router.replace("/auth");
    }

    if (!reviewText.trim()) return;

    const review = {
      author: session?.user?.username || "Anonymous",
      email: session?.user.email,
      authorImage: session?.user?.image || "user-img.png", // Use session image or default
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD
      comment: reviewText,
      rating: 5, // Example: fixed rating, integrate your rating component if needed
    };

    try {
      const response = await fetch("/api/post/post-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId, // Pass the restaurantId to your API
          review, // Pass the constructed review
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      // Reset review text and optionally refresh the reviews or show a success message
      setReviewText("");
      // Consider fetching the updated reviews here or indicating success to the user
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <FloatingLabel
        controlId="floatingTextarea"
        label="Add New Review"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </FloatingLabel>
      <Button className="button" onClick={handleSubmit}>Add Review</Button>
    </div>
  );
};

export default RegularReviewForm;
