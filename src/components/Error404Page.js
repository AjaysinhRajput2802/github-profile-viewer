import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faHome } from "@fortawesome/free-solid-svg-icons";

library.add(faHome, fas);

const Error404Page = ({ goHome }) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center p-3"
      style={{ backgroundColor: "#CACACA", width: "100vw", height: "100vh" }}
    >
      <h1>Error 404</h1>
      <h1>User not found !!!</h1>
      <div
        style={{
          cursor: "pointer",
        }}
        className="p-2"
        onClick={goHome}
      >
        <FontAwesomeIcon icon={["fas", "home"]} size="lg" />
      </div>
    </div>
  );
};

export default Error404Page;
