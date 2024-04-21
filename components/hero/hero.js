// components/Hero.js
import { Button } from "react-bootstrap";
import styles from "./hero.module.css";
import { useState } from "react";
import ReviewForm from "../ui/review-form";

const Hero = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.container}>
      <Button onClick={() => setShowForm(true)}>Add Your Review</Button>
      {showForm && (
        <ReviewForm status="success" onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Hero;
