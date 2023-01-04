import "./list.scss";
import ChevronLeftRoundedIcon  from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon  from "@mui/icons-material/ChevronRightRounded";

import Listitem from "../listitem/Listitem";
import { useRef, useState } from "react";

export default function List({ list }) {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [clicklimit, setClicklimit] = useState(window.innerWidth / 230)

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clicklimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <Listitem index={i} key={i} item={item} />
          ))}
        </div>
        <div className="arrows">
          <ChevronRightRoundedIcon 
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
          <ChevronLeftRoundedIcon 
            className="sliderArrow left"
            // style={{ display: !isMoved && "none" }}
            onClick={() => handleClick("left")}
          />
        </div>
      </div>
    </div>
  );
}
