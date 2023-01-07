import { Link, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./navbar.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [showInput, setShowInput] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!q) return;
    navigate(`/search?q=${q}`);
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const setActiveItem = (item) => {
    setActive(item);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link" style={{ textDecoration: "none" }}>
            <h1 className="logo">NARUTO</h1>
          </Link>
        </div>

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
            className={`link ${active === "new" ? "active" : ""}`}
            onClick={() => setActiveItem("new")}
          >
            <span>New and Popular</span>
          </Link>
          <Link
            to="/watchlist"
            className={`link ${active === "playlist" ? "active" : ""}`}
            onClick={() => setActiveItem("playlist")}
          >
            <span>My playlist</span>
          </Link>
        </nav>

        <div className="right">
          <form onSubmit={handleSearch} className="search">
            {showInput && (
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
            )}
            <SearchIcon className="icon" onClick={toggleInput} />
          </form>
          <div className="profile">
            <img src="https://placebeard.it/480/480" alt="user-pic" />
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>Settings</span>
              <Link
                style={{ textDecoration: "none", color: "var(--font-color)" }}
                to="/login"
                onClick={() => {
                  if (window.confirm("Are u sure u want to logout?")) {
                    dispatch(logout());
                  }
                }}
              >
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
