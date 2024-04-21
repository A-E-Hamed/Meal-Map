import React from "react";
import CategoryCard from "./categories-card";
import styles from "./categories.module.css";

const Categories = ({ categories }) => {
  console.log(categories);
  if (categories.message) {
    return <div className={styles.container}>{categories.message}</div>;
  }

  return (
    <div className={styles.container}>
      {categories.map(({ categoryId, categoryName, categoryImage }) => (
        <CategoryCard
          key={categoryId}
          category={categoryName}
          categoryImage={categoryImage}
        />
      ))}
    </div>
  );
};

export default Categories;
