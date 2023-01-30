import "./list.scss";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Listitem from "../listitem/Listitem";
import { useRef } from "react";

export default function List({ list }) {
  const sliderRef = useRef();

  const slideClick = (direction) => {
    if (direction === "left") {
      sliderRef.current.scrollLeft -= 300;
    }

    if (direction === "right") {
      sliderRef.current.scrollLeft += 300;
    }
  };

  
  return (
    <div className="list">
      <ChevronLeftRoundedIcon
        className={`left`}
        onClick={() => slideClick("left")}
      />
      <span className="listTitle">{list.title}</span>
      <div className="slider" ref={sliderRef}>
        {list.content.map((item, i) => (
          <Listitem index={i} key={i} item={item} />
        ))}
      </div>
      <ChevronRightRoundedIcon
        className={`right`}
        onClick={() => slideClick("right")}
      />
    </div>
  );
}
