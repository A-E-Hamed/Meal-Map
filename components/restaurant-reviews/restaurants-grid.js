import RestaurantReviews from "./restaurant-reviews";
import styles from "./restaurants-grid.module.css";

const PostsGrid = (props) => {
  const { posts } = props;
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <RestaurantReviews key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostsGrid;
