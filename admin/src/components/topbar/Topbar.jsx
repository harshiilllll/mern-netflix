import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, ExitToApp } from "@material-ui/icons";
import { logout } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">harshiladmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <ExitToApp onClick={() => dispatch(logout())} />
          </div>
          <img src="https://placebeard.it/500.500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
