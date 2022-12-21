import React from 'react';

import "./featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function Featured({ type }) {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="anime">Anime</option>
            <option value="drama">Drama</option>
            <option value="documentry">Documentry</option>
          </select>
        </div>
      )}

      <img src="https://images.alphacoders.com/927/927310.jpg" alt="" />
      <div className="info">
        <div className="info-subtitle">Action Movies</div>
        <h2 className="info-title">Spider-man</h2>
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsum
          doloremque nobis obcaecati laudantium perferendis aspernatur tempore
          cumque, animi nulla, rem inventore recusandae odit quisquam pariatur
          repellat modi? Ipsum, nobis.
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon className="icon" />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon className="icon" />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
