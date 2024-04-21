import { useRouter } from "next/router";
import useSWR from "swr";
import PostItem from "../../../../components/restaurant-reviews/restaurant-reviews";
import Spinner from "../../../../components/spinner/Spinner";
import styles from "./categorie.module.css";
import CategoriesColumn from "../../../../components/categories/categories-column";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ReviewsPage = () => {
  const router = useRouter();
  const { restaurantSlug } = router.query;

  const formattedRestaurantSlug = restaurantSlug
    ?.replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { data: restaurantData, error } = useSWR(
    restaurantSlug
      ? `/api/post/get-reviews?slug=${encodeURIComponent(
          formattedRestaurantSlug
        )}`
      : null,
    fetcher
  );

  // const { data: categories } = useSWR("/api/category/get-categories", fetcher);

  if (error) return <div>Failed to load reviews.</div>;
  if (!restaurantData) return <Spinner />;
  if (restaurantData.message) {
    return <div className={styles.container}>{restaurantData.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Reviews for {formattedRestaurantSlug}</h2>
      <div className={styles.innerContainer}>
        <div className={styles.postsContainer}>
          {restaurantData.map((restaurant) => (
            <PostItem key={restaurant.restaurantId} data={restaurantData} />
          ))}
        </div>
        {/* <div className={styles.categoriesContainer}>
          <CategoriesColumn categories={categories} />
        </div> */}
      </div>
    </div>
  );
};

export default ReviewsPage;
