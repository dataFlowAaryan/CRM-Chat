import React, { useContext } from "react";
import Styles from "./styles/WelcomeAndStatusStyles.module.css";
import { user } from "../providers/UserProvider";

function WelcomeAndStatus() {
  const userContext = useContext(user);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "20%",
        gap: "5vh",
      }}
    >
      <h1 className={Styles.mainHeading}>
        Welcome, {userContext.user.firstName}
      </h1>
    </div>
  );
}

export default WelcomeAndStatus;
