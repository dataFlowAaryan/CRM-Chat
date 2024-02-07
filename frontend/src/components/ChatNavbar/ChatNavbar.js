import React from "react";
import { useContext } from "react";
import { user } from "../../providers/UserProvider";
import Styles from "./NavbarStyles.module.css";
import { Link } from "react-router-dom";

const ChatNavbar = () => {
  const userContext = useContext(user);
  return (
    <div className={Styles.navbar}>
      <span className={Styles.logo}>Chat</span>
      <div className={Styles.user}>
        <span>{userContext.user.firstName}</span>
        <Link
          to={localStorage.getItem("token") ? "/auth/login" : "/auth/login"}
        >
          <button className={Styles.button}>
            {localStorage.getItem("token") ? "Logout" : "Login"}
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ChatNavbar;
