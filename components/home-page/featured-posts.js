import PostsGrid from "../restaurant-reviews/restaurants-grid";
import styles from "./featured-posts.module.css";

const FeaturedPosts = (props) => {
  return (
    <div className={styles.container}>
      <PostsGrid posts={props.posts} />
    </div>
  );
};

export default FeaturedPosts;
