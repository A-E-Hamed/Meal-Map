import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr"; // Assuming you're using SWR for data fetching
import PostItem from "../../../../components/posts/post-item";
import Spinner from "../../../../components/spinner/Spinner";
import styles from "./categorie.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CategoryPostsPage = () => {
  const router = useRouter();
  const { categorySlug } = router.query;

  // Use the SWR hook for data fetching
  const { data: posts, error } = useSWR(
    categorySlug ? `/api/category/${categorySlug}` : null,
    fetcher
  );

  if (error) return <div>Failed to load posts.</div>;
  if (!posts) return <Spinner />;

  const pageTitle = categorySlug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className={styles.container}>
      <h2>{pageTitle}</h2>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPostsPage;
