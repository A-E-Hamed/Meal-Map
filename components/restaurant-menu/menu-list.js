import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import styles from "./menu-list.module.css";
import CloseButton from "react-bootstrap/CloseButton";

// Assume "menu" prop is an array of menu items
const MenuList = ({ menu, onClose }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  // Set menu items once the component receives the menu prop
  useEffect(() => {
    if (menu) {
      setMenuItems(menu[0].menu);
      setCategoryName(menu[0].categoryName);
      setRestaurantName(menu[0].restaurantName);
    }
  }, [menu]);

  function capitalizeWords(words) {
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  }

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.header}>
        <p>{restaurantName}'s menu</p>
        <CloseButton onClick={onClose} />
      </div>
      {menuItems.map((item) => (
        <Card key={item.mealId} className="mb-2">
          <Card.Header className={styles.fontStyles}>
            {item.mealName}
          </Card.Header>
          <Card.Body className={styles.cardBody}>
            <div className={styles.cardDescription}>
              <Card.Text className={styles.descriptionElement}>
                <span className={styles.fontStyles}>Ingredients: </span>
                {capitalizeWords(item.ingredients).join(", ")}
              </Card.Text>
              <Card.Text>
                <span className={styles.fontStyles}>Price: </span> {item.price}{" "}
                $
              </Card.Text>
            </div>
            <div>
              <Card.Img variant="top" src={`/images/menus/${item.mealImage}`} />
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MenuList;
