import "./listitem.scss";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
// import { WatchContext } from "../../watchlistContext/WatchContext";

export default function Listitem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjMxYjU1YTFjNjcyMmYzYjMwODZlYiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI2ODIzNDQsImV4cCI6MTY3Mzk3ODM0NH0.wg2Q0fvjJ6V2uC4dNnCyMvFmHfQHXnqd9zd3NByCXi8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  // console.log(movie);

  let strIsSeries = movie.isSeries;
  strIsSeries = strIsSeries === true ? "TV" : "Movie";

  //Add to Watchlist
  // const { addMovieToWatchList, watchlist } = useContext(WatchContext);

  // let storedMovie = watchlist.find((obj) => obj._id === movie.id);
  // const watchListDisabled = storedMovie ? true : false;

  return (
    <div>
      <div
        className="listItem"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="movieCard">
          <div className="moviePoster">
            <img className="movieImg" src={movie.imgSm} alt={movie.title} />
          </div>
          {isHovered && (
            <video
              src={movie.trailer}
              className="movieTrailer"
              autoPlay
            ></video>
          )}
          <div
            onClick={() =>
              navigate("/watchdetail", { state: { movie: movie } })
            }
            className="movieInfo"
            style={{ cursor: "pointer" }}
          >
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
            <Link
              to="/watch"
              state={{
                movie: movie,
              }}
              style={{ color: "white", textDecoration: "none" }}
            >
              <PlayCircleRoundedIcon className="playIcon" />
            </Link>
            <AddCircleRoundedIcon className="addMovie" />
          </div>
        </div>
      </div>
    </div>
  );
}
