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
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTQxNzViOTM1ZWYxODY1YmRjMDRmNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MjIzODY2NywiZXhwIjoxNjcyNjcwNjY3fQ.R99XRjYNMSy0jF7glDx9WVsDLYoVAeOcjTB8kEdf4yQ",
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
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 40 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="movie" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
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
                <span>{movie.duration}</span>
                <span className="age-limit">+{movie.limit}</span>
                <span className="year">{movie.year}</span>
              </div>
              <div className="desc">
                {movie.desc}
              </div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
