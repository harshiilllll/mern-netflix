import React from "react";
import "./topbar.css";
import { DarkMode, ExitToApp, LightMode } from "@mui/icons-material";
import { logout } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [darkMode, setDarkMode] = useState(true);


  const toggleMode = () => {
    const root = document.querySelector(":root");

    if (darkMode) {
      root.style.setProperty("--back-color", "#ededed");
      root.style.setProperty("--main-color", "#e0e0e0");
      root.style.setProperty("--sidebar-color", "#ffffff");
      root.style.setProperty("--border-color", "#d2d2d2");
      root.style.setProperty("--accent-color", "#cbcbcb");
      root.style.setProperty("--font-color", "#000000");
      root.style.setProperty("--line-color", "#000000");
      root.style.setProperty("--tick-color", "rgb(149, 211, 255)");
      root.style.setProperty("--border-radius", "4px");
      root.style.setProperty("--chart-background", "linear-gradient(30deg, rgba(0 0 0 / 85%) 30%, rgba(0 0 0 / 75%)), url(https://wallpaperaccess.com/full/324626.jpg);");

    } else {
      root.style.setProperty("--back-color", "#25272a");
      root.style.setProperty("--main-color", "#1a1c1e");
      root.style.setProperty("--sidebar-color", "#141414");
      root.style.setProperty("--border-color", "#373a3f");
      root.style.setProperty("--accent-color", "#141414");
      root.style.setProperty("--font-color", "#FFFFFF");
      root.style.setProperty("--line-color", "#929292");
      root.style.setProperty("--tick-color", "#2d7d46");
      root.style.setProperty("--button-color", "#5865f2");
      root.style.setProperty("--border-radius", "6px");
      root.style.setProperty("--chart-background", "linear-gradient(30deg, rgba(0 0 0 / 15%) 30%, rgba(0 0 0 / 25%)), url(https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);");
    }

    setDarkMode(!darkMode);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">harshiladmin</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
            {darkMode ? (
              <LightMode className="theme-icon" onClick={toggleMode} />
            ) : (
              <DarkMode className="theme-icon" onClick={toggleMode} />
            )}

            <Link
              to="/login"
              className="logout-btn"
              onClick={() => {
                if (window.confirm("Are u sure u want to logout?")) {
                  dispatch(logout());
                  history.push("/login");
                }
              }}
            >
              <ExitToApp />
            </Link>
          </div>
          {/* <img
            src={"https://placebeard.it/500.500"}
            alt=""
            className="topAvatar"
          /> */}
        </div>
      </div>
    </div>
  );
}
