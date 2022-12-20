import React from 'react';

import "./list.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Listitem from "../listitem/Listitem";
import { useRef, useState } from "react";

export default function List() {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowBackIosIcon
          className="sliderArrow left"
          style={{ display: !isMoved && "none" }}
          onClick={() => handleClick("left")}
        />
        <div className="container" ref={listRef}>
          <Listitem index={0} />
          <Listitem index={1} />
          <Listitem index={2} />
          <Listitem index={3} />
          <Listitem index={4} />
          <Listitem index={5} />
          <Listitem index={6} />
          <Listitem index={7} />
          <Listitem index={8} />
          <Listitem index={9} />
        </div>
        <ArrowForwardIosIcon
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
