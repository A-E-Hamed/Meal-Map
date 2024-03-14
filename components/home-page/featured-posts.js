import PostsGrid from "../posts/posts-grid";
import styles from "./featured-posts.module.css";

const FeaturedPosts = (props) => {
  return (
    <div className={styles.container}>
      <PostsGrid posts={props.posts} />
    </div>
  );
};

export default FeaturedPosts;
