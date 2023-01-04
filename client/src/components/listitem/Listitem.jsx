import "./listitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

export default function Listitem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item,
          {
            headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjMxYjU1YTFjNjcyMmYzYjMwODZlYiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI2ODIzNDQsImV4cCI6MTY3Mzk3ODM0NH0.wg2Q0fvjJ6V2uC4dNnCyMvFmHfQHXnqd9zd3NByCXi8",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
          })
        setMovie(res.data)

      } catch (err) {
        console.log(err);
      }
    }
    getMovie();
  }, [item])
  // console.log(movie);
  return (
    <Link to='/watch' state={{ movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 40 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.imgSm} alt="movie" />
        
        
        {isHovered && (
          <div>
            <video src={movie.video} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <div>
                  <PlayArrowIcon />
                  <AddIcon />
                </div>
                <div>
                  <ThumbUpOutlinedIcon />
                  <ThumbDownOffAltOutlinedIcon />
                </div>
              </div>
              <div className="itemInfoTop">
                <span className="movie-title">{movie.title}</span>
                <span className="age-limit">+{movie.limit}</span>
                <span className="year">{movie.year}</span>
              </div>
              <div className="desc">
                {movie.desc}
              </div>
              <div className="genre">{movie.genre}</div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
