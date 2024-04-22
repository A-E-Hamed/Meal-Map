import ReactDOM from "react-dom";
import classes from "./restaurant-menu.module.css";
import MenuList from "../restaurant-menu/menu-list";
import Button from "react-bootstrap/Button";

function RestaurantMenu({ onClose, menu }) {
  const cssClasses = `${classes.notification} ${classes.success}`;

  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={onClose}>
      {/* Backdrop which closes modal on click */}
      <div className={cssClasses} onClick={(e) => e.stopPropagation()}>
        {/* Stop propagation to prevent clicks within the form from closing it */}
        <div className={classes.header}></div>
        <MenuList onClose={onClose} menu={menu} />
      </div>
    </div>,
    document.getElementById("restaurantMenu") || document.body // Fallback to document.body in case the target doesn't exist
  );
}

export default RestaurantMenu;
