import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  BarChart,
  MovieOutlined,
  List,
  VideoCallOutlined,
  PersonAddOutlined,
  PlaylistAddRounded,
  CloseRounded,
  ArrowForwardIosRounded
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  const toggle = () => {
    setOpen(!open);
  };

  const setActiveItem = (item) => {
    setActive(item);
  }

  return (
    <div className="sidebar" style={{width: open ? "200px" : "50px"}}>
    {open ? <CloseRounded className="menu" onClick={toggle} /> : <ArrowForwardIosRounded className="menu" onClick={toggle} /> }  
      {open && (
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className={`sidebarListItem ${active === 'home' ? 'active' : ''}`} onClick={() => setActiveItem('home')}>
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </Link>
              <li className={`sidebarListItem ${active === 'analytics' ? 'active' : ''}`} onClick={() => setActiveItem('analytics')}>
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className={`sidebarListItem ${active === 'sales' ? 'active' : ''}`} onClick={() => setActiveItem('sales')}>
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className={`sidebarListItem ${active === 'users' ? 'active' : ''}`} onClick={() => setActiveItem('users')}>
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link to="/movies" className="link">
                <li className={`sidebarListItem ${active === 'movies' ? 'active' : ''}`} onClick={() => setActiveItem('movies')}>
                  <MovieOutlined className="sidebarIcon" />
                  Movies
                </li>
              </Link>
              <Link to="/lists" className="link">
                <li className={`sidebarListItem ${active === 'lists' ? 'active' : ''}`} onClick={() => setActiveItem('lists')}>
                  <List className="sidebarIcon" />
                  Lists
                </li>
              </Link>
              <li className={`sidebarListItem ${active === 'reports' ? 'active' : ''}`} onClick={() => setActiveItem('reports')}>
                <BarChart className="sidebarIcon" />
                  Reports
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Create</h3>
            <ul className="sidebarList">
              <Link to="/newuser" className="link">
                <li className={`sidebarListItem ${active === 'adduser' ? 'active' : ''}`} onClick={() => setActiveItem('adduser')}>
                  <PersonAddOutlined className="sidebarIcon" />
                  Add User
                </li>
              </Link>
              <Link to="/newmovie" className="link">
                <li className={`sidebarListItem ${active === 'addmovie' ? 'active' : ''}`} onClick={() => setActiveItem('addmovie')}>
                  <VideoCallOutlined className="sidebarIcon" />
                  Upload Movie
                </li>
              </Link>
              <Link to="/newlist" className="link">
                <li className={`sidebarListItem ${active === 'addlist' ? 'active' : ''}`} onClick={() => setActiveItem('addlist')}>
                  <PlaylistAddRounded className="sidebarIcon" />
                  Create List
                </li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
