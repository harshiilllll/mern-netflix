import React, { useEffect, useState } from 'react';

import "./featured.scss";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from 'axios';

function Featured({ type }) {
  const [content, setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`movies/random?type=${type}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTQxNzViOTM1ZWYxODY1YmRjMDRmNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MjIzODY2NywiZXhwIjoxNjcyNjcwNjY3fQ.R99XRjYNMSy0jF7glDx9WVsDLYoVAeOcjTB8kEdf4yQ",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
        })
        setContent(res.data[0])
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type])
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

      <img src={content.img} alt="" />
      <div className="info">
        {/* <img src={content.imgTitle} className="info-subtitle" /> */}
        <h2 className="info-title">{content.title}</h2>
        <span className="desc">
          {content.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayCircleRoundedIcon className="icon" />
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
