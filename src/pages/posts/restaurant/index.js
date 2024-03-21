import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const CategoryPage = () => {
  const router = useRouter();
  const { categorySlug } = router.query;

  // Use SWR for data fetching
  const { data, error } = useSWR(categorySlug ? `/api/category/${categorySlug}` : null, fetcher);

  if (error) return <div>Failed to load the restaurants.</div>;
  if (!data) return <div>Loading...</div>;

  // Assuming your API returns an object with a "restaurants" property
  const { restaurants } = data;

  return (
    <div>
      <h1>Restaurants in {decodeURIComponent(categorySlug?.replace(/-/g, ' ') || '')}</h1>
      {restaurants?.map((restaurant, index) => (
        <div key={index}>
          <h2>{restaurant.restaurantName}</h2>
          {/* Display more restaurant details here */}
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
