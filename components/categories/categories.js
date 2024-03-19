import React from "react";
import CategoryCard from "./categories-card";
import styles from "./categories.module.css"

const Categories = ({ posts }) => {
  const uniqueCategories = Array.from(
    new Set(posts.map((post) => post.category))
  ).map((category) => {
    const post = posts.find((p) => p.category === category);
    return { category, categoryImage: post.categoryImage };
  });

  return (
    <div className={styles.container} >
      {uniqueCategories.map(({ category, categoryImage }) => (
        <CategoryCard
          key={category}
          category={category}
          categoryImage={categoryImage}
        />
      ))}
    </div>
  );
};

export default Categories;
