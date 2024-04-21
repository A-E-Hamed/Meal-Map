// components/ReviewForm.js
import ReactDOM from "react-dom";
import classes from "./review-form.module.css";
import NewReviewForm from "../review-form/new-review-form";
import Button from "react-bootstrap/Button";

function ReviewForm({ onClose }) {
  const cssClasses = `${classes.notification} ${classes.success}`;

  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={onClose}>
      {/* Backdrop which closes modal on click */}
      <div className={cssClasses} onClick={(e) => e.stopPropagation()}>
        {/* Stop propagation to prevent clicks within the form from closing it */}
        <div className={classes.header}>
          <p>Add Custom Review</p>
        </div>
        <NewReviewForm onClose={onClose} />
      </div>
    </div>,
    document.getElementById("reviewForm") || document.body // Fallback to document.body in case the target doesn't exist
  );
}

export default ReviewForm;
