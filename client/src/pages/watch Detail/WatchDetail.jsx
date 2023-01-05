import "./watchDetail.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function WatchDetail() {
  const location = useLocation();
  const movie = location.state.movie;
  return (
    <>
      <div className="navbar-watchdetail">
        <Navbar />
      </div>
      <div className="watchDetail">
        <div
          className="container"
          style={{ backgroundImage: `url(${movie.img})` }}
        >
          <div className="content">
            <img src={movie.imgSm} alt="" />
            <div className="info">
              <h1>{movie.title}</h1>
              <span>{movie.genre}</span>
              <Link className="watch-btn" to="/watch" state={{ movie: movie }}>
                <PlayArrowIcon className="icon" />
                <p>Watch Now</p>
              </Link>
              <p>{movie.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
