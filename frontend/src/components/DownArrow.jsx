import downArrowGrey from "../assets/slideArrows/down_arrow_grey.svg";
import downArrowBlack from "../assets/slideArrows/down_arrow_black.svg";
import { useState} from "react";

export default function DownArrow( {onClick } ) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href="#" className="flex items-center p-2 text-white rounded-lg mb-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <img src={isHovered ?  downArrowBlack : downArrowGrey } className="w-12 h-12 transition duration-50" alt="Add Slide" />
    </a>
  );
}