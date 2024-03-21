import React from "react";
import CategoryCard from "./categories-card";
import styles from "./categories-column.module.css";

const CategoriesColumn = ({ categories }) => {
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

export default CategoriesColumn;
