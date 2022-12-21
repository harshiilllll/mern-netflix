import React from 'react';
import "./listitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import { useState } from "react";
import Video from './Avatar_Video.mp4'

export default function Listitem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  // const trailer = "";
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src="https://picsum.photos/400/300" alt="movie" />
      {isHovered && (
        <>
          <video src={Video} autoPlay={true} loop />
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
              <span>1 hour 14 mins</span>
              <span className="age-limit">+16</span>
              <span className="year">2022</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
              debitis! Inventore aliquam praesentium veniam reiciendis eius
              beatae, quas, provident, aut aperiam voluptate nostrum minus illum
              cum numquam totam. Obcaecati, ducimus!
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
}
