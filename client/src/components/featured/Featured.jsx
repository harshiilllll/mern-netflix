import React, { useEffect, useState } from "react";

import "./featured.scss";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "axios";
import { Link } from "react-router-dom";

function Featured({ type, setGenre }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const res = await axios.get(`movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    const interval = setInterval(() => {
      getRandomMovie();
    }, [8000]);

    return () => clearInterval(interval);
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="sports">Sports</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="anime">Anime</option>
            <option value="drama">Drama</option>
            <option value="documentry">Documentry</option>
          </select>
        </div>
      )}

      <img src={movie.img} alt="" />
      <div className="info">
        {/* <img src={movie.imgTitle} className="info-subtitle" /> */}
        <h2 className="info-title">{movie.title}</h2>
        <span className="desc">{movie.desc}</span>
        <div className="buttons">
          <Link
            to="/watch"
            style={{ textDecoration: "none" }}
            state={{ movie: movie }}
          >
            <button className="play">
              <PlayCircleRoundedIcon className="icon" />
              <span>Play</span>
            </button>
          </Link>
          <Link
            to="/watchdetail"
            style={{ textDecoration: "none" }}
            state={{ movie: movie }}
          >
            <button className="more">
              <InfoOutlinedIcon className="icon" />
              <span>Info</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="card">
        <Link
          to="/watchdetail"
          style={{ textDecoration: "none" }}
          state={{ movie: movie }}
        >
          <img src={movie.imgSm} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default Featured;
