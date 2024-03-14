import classes from "./starting-page.module.css";

function StartingPageContent() {
  // Show Link to Login page if NOT auth

  return (
    <section className={classes.starting}>
      <p>
        Welcome to MealMap - your go-to destination for dining inspiration! Dive
        into our curated reviews and discover culinary delights from around the
        globe. Whether you are seeking fine dining elegance or cozy comfort, let
        us guide you to the perfect spot for your next memorable meal.
      </p>
    </section>
  );
}

export default StartingPageContent;
