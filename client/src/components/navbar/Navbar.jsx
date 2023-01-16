import { Link, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./navbar.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import NARUTOLOGO from "../../img/NARUTOLOGO.png";
import LOGO from "../../img/LOGO.png";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch, user } = useContext(AuthContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInput = useRef(null);

  const navigate = useNavigate();
  const [q, setQ] = useState("");

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!q) return;
    navigate(`/search?q=${q}`);
    setIsOpen(false);
    setIsSearchOpen(false);
  };

  const setActiveItem = (item) => {
    setActive(item);
  };

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      window.scrollTo(0, window.pageYOffset - 1);
    } else {
      setIsOpen(true);
      if (window.pageYOffset === 0) {
        window.scrollTo(0, 1);
      }
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "popup" || e.target.id === "closeSearch") {
      setIsSearchOpen(false);
    }
  };
  
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          
          <Link to="/" className="link" style={{ textDecoration: "none" }}>
            <img
              className="logo-img"
              style={{ height: "30px" }}
              src={LOGO}
              alt=""
            />
            <img className="logo-text" src={NARUTOLOGO} />
          </Link>
        </div>

        <nav className={`mobile-nav ${isOpen ? "opened" : ""}`}>
          <Link
            to="/"
            className={`link ${active === "home" ? "active" : ""}`}
            onClick={() => {
              setActiveItem("home");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <span>Home</span>
          </Link>
          <Link
            to="/series"
            className={`link ${active === "series" ? "active" : ""}`}
            onClick={() => {
              setActiveItem("series");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <span>Series</span>
          </Link>
          <Link
            to="/movies"
            className={`link ${active === "movies" ? "active" : ""}`}
            onClick={() => {
              setActiveItem("movies");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <span>Movies</span>
          </Link>
          <Link
            className={`link ${active === "new" ? "active" : ""}`}
            onClick={() => {
              setActiveItem("new");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <span>New and Popular</span>
          </Link>
          <Link
            to="/watchlist"
            className={`link ${active === "playlist" ? "active" : ""}`}
            onClick={() => {
              setActiveItem("playlist");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <span>My playlist</span>
          </Link>
          <form onSubmit={handleSearch} className="search">
            <>
              <input
                type="text"
                placeholder="Search.."
                onChange={(e) => setQ(e.target.value)}
              />
              <SearchIcon
                className="icon"
                onClick={handleSearch}
                style={{ zIndex: 200 }}
              />
            </>
          </form>
        </nav>

        <nav className="nav center">
          <Link
            to="/"
            className={`link ${active === "home" ? "active" : ""}`}
            onClick={() => setActiveItem("home")}
          >
            <span>Home</span>
          </Link>
          <Link
            to="/series"
            className={`link ${active === "series" ? "active" : ""}`}
            onClick={() => setActiveItem("series")}
          >
            <span>Series</span>
          </Link>
          <Link
            to="/movies"
            className={`link ${active === "movies" ? "active" : ""}`}
            onClick={() => setActiveItem("movies")}
          >
            <span>Movies</span>
          </Link>
          <Link
            to="/watchlist"
            className={`link ${active === "playlist" ? "active" : ""}`}
            onClick={() => setActiveItem("playlist")}
          >
            <span>Playlist</span>
          </Link>
          <div
            className="search"
            onClick={() => {
              setIsSearchOpen(true);
            }}
          >
            <SearchIcon
              className="icon"
              onClick={handleSearch}
              style={{ zIndex: 200 }}
            />
            Search
          </div>
          {isSearchOpen && (
            <div
              id="popup"
              className="searchPopup"
              onClick={handleBackgroundClick}
            >
              <form onSubmit={handleSearch}>
                <div
                  className="icons"
                  id="closeSearch"
                  title="Back"
                  onClick={handleBackgroundClick}
                >
                  <KeyboardBackspaceRoundedIcon className="icon" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  ref={searchInput}
                  onChange={(e) => setQ(e.target.value)}
                />
              </form>
            </div>
          )}
        </nav>

        <div className="right">
          <form onSubmit={handleSearch} className="search"></form>
          <div className="profile">
            <img src={user.profilePic} alt="user-pic" />
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <Link
                style={{ textDecoration: "none", color: "var(--font-color)" }}
                to="/settings"
              >
                <span>Settings</span>
              </Link>
              <span
                style={{ textDecoration: "none", color: "var(--font-color)" }}
                onClick={() => {
                  if (window.confirm("Are u sure u want to logout?")) {
                    dispatch(logout());
                    navigate("/login");
                  }
                }}
              >
                <span>Logout</span>
              </span>
            </div>
          </div>
          {isOpen ? (
            <CloseRoundedIcon className="menu-icon" onClick={toggleMenu} />
          ) : (
            <MenuRoundedIcon className="menu-icon" onClick={toggleMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
