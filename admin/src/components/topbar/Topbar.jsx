import React from "react";
import "./topbar.css";
import { ExitToApp } from "@mui/icons-material";
import { logout } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();


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
