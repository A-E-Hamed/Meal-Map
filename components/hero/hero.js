import { Button } from "react-bootstrap";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.container}>
      <Button>Add Your Review </Button>
    </div>
  );
};

export default Hero;
