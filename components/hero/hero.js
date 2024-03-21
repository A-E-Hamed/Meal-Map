import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.container}>
      <Button className={styles.button} href="/posts/">
        View All Reviews
      </Button>
    </div>
  );
};

export default Hero;
