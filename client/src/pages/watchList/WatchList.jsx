import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { WatchContext } from "../../watchlistContext/WatchContext";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./watchList.scss";

const WatchList = () => {
  const { watchlist } = useContext(WatchContext);
  const { removieMovieFromWatchList } = useContext(WatchContext);
  return (
    <>
      <Navbar />
      <div className="watchListPage">
        {watchlist.length > 0 ? (
          <>
            {watchlist.map((movie) => {
              let strIsSeries = movie.isSeries.toString();
              strIsSeries = strIsSeries === "true" ? "TV" : "Movie";
              return (
                <Link
                  className="movieCard"
                  key={movie._id}
                  to="/watchdetail"
                  state={{ movie: movie }}
                >
                  <Link
                    to="/watchlist"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <CloseRoundedIcon
                      onClick={() => {
                        removieMovieFromWatchList(movie._id);
                      }}
                      className="removeMovie"
                    ></CloseRoundedIcon>
                  </Link>
                  <div className="moviePoster">
                    <img
                      className="movieImg"
                      src={movie.imgSm}
                      alt={movie.title}
                    />
                  </div>
                  <div className="movieInfo">
                    <h3 className="movieTitle">{movie.title}</h3>
                    <div className="movieBottomInfo">
                      <span className="movieGenre">{movie.genre}</span>
                      <span className="dot"></span>
                      <span className="movieDuration">{movie.duration}</span>
                    </div>
                    <p className="movieDesc">{movie.desc}</p>
                    <div className="tags">
                      <span className="movieYear">{movie.year}</span>
                      <span className="movieIsSeries">{strIsSeries}</span>
                      <span className="movieLimit">{movie.limit}+</span>
                    </div>
                    <PlayCircleRoundedIcon className="playIcon" />
                  </div>
                </Link>
              );
            })}
          </>
        ) : (
          <h2 className="noMovies">No moives or series in your watch list. Browse and add some!</h2>
        )}
      </div>
    </>
  );
};

export default WatchList;
