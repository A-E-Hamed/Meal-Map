import { Fragment, useState } from "react";
import useSWR from "swr";
import StartingPageContent from "../../components/starting-page/starting-page";
import FeaturedPosts from "../../components/home-page/featured-posts";
import Categories from "../../components/categories/categories";
import Spinner from "../../components/spinner/Spinner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function HomePage() {
  const { data: posts, error } = useSWR("/api/post/get-posts", fetcher);


  if (error) return <div>Failed to load</div>;
  if (!posts) return <Spinner />;

  return (
    <Fragment>
      <StartingPageContent />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Categories posts={posts} />
      </div>
    </Fragment>
  );
}

export default HomePage;
