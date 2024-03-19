import { Fragment, useState, useEffect } from "react";
import useSWR from "swr";
import StartingPageContent from "../../../components/starting-page/starting-page";
import FeaturedPosts from "../../../components/home-page/featured-posts";
import Spinner from "../../../components/spinner/Spinner";
import Pagination from "react-bootstrap/Pagination";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function AllPostsPage() {
  const { data: posts, error } = useSWR("/api/post/get-posts", fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts?.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (error) return <div>Failed to load</div>;
  if (!posts) return <Spinner />;

  const pagination = (
    <Pagination>
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );

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
        <FeaturedPosts posts={currentPosts} />
        {pagination}
      </div>
    </Fragment>
  );
}

export default AllPostsPage;
