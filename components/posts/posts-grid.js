import PostItem from "./post-item";
import styles from "./posts-grid.module.css";

const PostsGrid = (props) => {
  const { posts } = props;
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostsGrid;
