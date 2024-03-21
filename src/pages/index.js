import { Fragment } from "react";
import useSWR from "swr";
import StartingPageContent from "../../components/starting-page/starting-page";
import Spinner from "../../components/spinner/Spinner";
import Categories from "../../components/categories/categories"; // Ensure this component is ready to display category data

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function HomePage() {
  // Fetching category data instead of posts
  const { data: categories, error } = useSWR(
    "/api/category/get-categories",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!categories) return <Spinner />;

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
        {/* Pass the categories data to the Categories component */}
        <Categories categories={categories} />
      </div>
    </Fragment>
  );
}

export default HomePage;
