import { useState, useContext } from "react";
import styles from "./new-review-form.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import useSWR from "swr";
import Spinner from "../spinner/Spinner";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const NewReviewForm = (props) => {
  const { data: categories, error } = useSWR(
    "/api/get-all/get-all-data",
    fetcher
  );
  const { data: session } = useSession();

  const [selectedCategory, setSelectedCategory] = useState({
    name: "Select a category",
    id: null,
  });

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    "Select a restaurant"
  );
  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [newRestaurantAddress, setNewRestaurantAddress] = useState("");
  const [addNewRestaurant, setAddNewRestaurant] = useState(false);
  const [reviewText, setReviewText] = useState("");

  if (error) return <div>Failed to load categories</div>;
  if (!categories) return <Spinner />;

  const handleSelectCategory = (eventKey) => {
    const category = categories.find(
      (cat) => cat.categoryId.toString() === eventKey
    );
    setSelectedCategory({
      name: category.categoryName,
      id: category.categoryId,
    }); // Store both name and ID
    setRestaurants(category.restaurants || []); // Ensure restaurants are set or default to empty array
    setSelectedRestaurant("Select a restaurant"); // Reset the selected restaurant
  };

  const handleSelectRestaurant = (eventKey) => {
    const restaurant = restaurants.find((res) => res.restaurantId == eventKey);
    setSelectedRestaurant(restaurant.restaurantName);
  };

  const handleToggleNewRestaurant = (e) => {
    setAddNewRestaurant(e.target.checked);
    setNewRestaurantName(""); // Clear the new restaurant input field
    setNewRestaurantAddress("");
    setSelectedRestaurant("Select a restaurant"); // Reset the dropdown
  };

  const handleSubmit = async () => {
    if (!session) {
      alert("Please log in to submit a review.");
      return;
    }

    const apiUrl = "/api/post/add-new-restaurant"; // Change as necessary
    console.log(selectedCategory);
    const review = {
      author: session?.user?.username || "Anonymous",
      email: session?.user.email,
      authorImage: session?.user?.image || "user-img.png",
      date: new Date().toISOString(),
      comment: reviewText,
      rating: 5, // Modify as necessary to capture actual rating from user input
    };

    const body = addNewRestaurant
      ? {
          categoryId: selectedCategory.id,
          restaurantName: newRestaurantName,
          address: newRestaurantAddress,
          review,
        }
      : {
          restaurantId: selectedRestaurant.restaurantId,
          review,
        };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      alert(result.message); // Display success message
    } catch (error) {
      alert("Failed to submit review: " + error.message); // Display error message
    }
  };

  return (
    <div className={styles.container}>
      <Form>
        <div className={styles.topControllersContainer}>
          <Dropdown
            className="d-inline mx-2"
            onSelect={handleSelectCategory}
            disabled={addNewRestaurant}
          >
            <Dropdown.Toggle id="dropdown-autoclose-true">
              {selectedCategory.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category.categoryId}
                  eventKey={category.categoryId}
                >
                  {category.categoryName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            className="d-inline mx-2"
            onSelect={handleSelectRestaurant}
            disabled={addNewRestaurant}
          >
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              disabled={addNewRestaurant}
            >
              {selectedRestaurant}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {restaurants.map((restaurant) => (
                <Dropdown.Item
                  key={restaurant.restaurantId}
                  eventKey={restaurant.restaurantId}
                >
                  {restaurant.restaurantName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Add New Restaurant"
          checked={addNewRestaurant}
          onChange={handleToggleNewRestaurant}
          style={{ paddingLeft: "4rem", marginBottom: "2rem" }}
        />

        {addNewRestaurant && (
          <div className={styles.dataInputs}>
            <Form.Control
              type="text"
              placeholder="Enter new restaurant name"
              value={newRestaurantName}
              onChange={(e) => setNewRestaurantName(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <Form.Control
              type="text"
              placeholder="Enter restaurant address"
              value={newRestaurantAddress}
              onChange={(e) => setNewRestaurantAddress(e.target.value)}
            />
          </div>
        )}

        {(selectedRestaurant !== "Select a restaurant" ||
          (newRestaurantName && newRestaurantAddress)) && (
          <div>
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
          </div>
        )}
        <div className={styles.controllers}>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Review
          </Button>
          <Button onClick={props.onClose}>Close</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewReviewForm;
