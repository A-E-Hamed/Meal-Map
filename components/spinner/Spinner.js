import React from "react";
import { BeatLoader } from "react-spinners";

// Style overrides for the spinner
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const spinnerContainerStyle = {
  height: "70vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Spinner = ({ loading = true, color = "#0d6efd" }) => {
  return (
    <div style={spinnerContainerStyle} className="sweet-loading">
      <BeatLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
