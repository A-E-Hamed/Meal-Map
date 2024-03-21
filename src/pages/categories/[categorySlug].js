import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../../components/spinner/Spinner"; // Adjust the path as necessary
import Restaurants from "../../../components/restaurants/restaurants";

const fetcher = (url) => fetch(url).then((res) => res.json());

function CategoryPage() {
  const router = useRouter();
  const { categorySlug } = router.query;

  // Decode and capitalize the categorySlug for display
  const categoryNameDisplay = decodeURIComponent(
    categorySlug?.replace(/-/g, " ") || ""
  )
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { data: restaurants, error } = useSWR(
    categorySlug ? `/api/category/${categorySlug}` : null,
    fetcher
  );

  if (error) return <div>Failed to load.</div>;
  if (!restaurants) return <Spinner />; // Show spinner while loading
  console.log(restaurants);

  return (
    <div>
      <h1>Restaurants in {categoryNameDisplay}</h1>
      <Restaurants restaurants={restaurants} />
    </div>
  );
}

export default CategoryPage;
