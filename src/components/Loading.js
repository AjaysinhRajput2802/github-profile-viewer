import React from "react";
import { RotateLoader } from "react-spinners";

const Loading = (loading) => {
  return (
    <div>
      <RotateLoader
        color="#000000"
        loading={loading}
        cssOverride={{ margin: "40px 40px", zIndex: "10" }}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
