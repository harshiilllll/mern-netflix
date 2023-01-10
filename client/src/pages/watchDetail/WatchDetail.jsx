import "./watchDetail.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { WatchContext } from "../../watchlistContext/WatchContext";
import { useContext } from "react";
import Footer from "../../components/footer/Footer";

export default function WatchDetail() {
  const location = useLocation();
  const movie = location.state.movie;
  let strIsSeries = movie.isSeries.toString();
  strIsSeries = strIsSeries === "true" ? "TV" : "Movie";

  //Add to Watchlist
  const { addMovieToWatchList, watchlist } = useContext(WatchContext);

  let storedMovie = watchlist.find((obj) => obj._id === movie._id);
  const watchListDisabled = storedMovie ? true : false;

  return (
    <>
      <div className="navbar-watchdetail">
        <Navbar />
      </div>
      <div className="watchDetail">
        <div className="container">
          <div
            className="background"
            style={{ backgroundImage: `url(${movie.img})` }}
          >
            <div className="content">
              <img src={movie.imgSm} alt="" />
              <div className="info">
                <h1>{movie.title}</h1>
                <div className="topInfo">
                  <span className="duration">{movie.duration}</span>
                  <span>{movie.genre}</span>
                </div>
                <div className="buttons">
                  <Link
                    className="watch-btn"
                    to="/watch"
                    state={{ movie: movie }}
                  >
                    <PlayArrowIcon className="icon" />
                    <p>Watch Now</p>
                  </Link>
                  <button
                    onClick={() => addMovieToWatchList(movie)}
                    disabled={watchListDisabled}
                    className="watch-btn watchlist-btn"
                  >
                    <AddBoxRoundedIcon className="icon" />
                    <p>Add to Watchlist</p>
                  </button>
                </div>
                <p>{movie.desc}</p>
                <div className="bottomInfo">
                  <span className="year">{movie.year}</span>
                  <span>{strIsSeries}</span>
                  <span className="limit">+{movie.limit}</span>
                </div>
              </div>
            </div>
      <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
