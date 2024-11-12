import downArrowGrey from "../assets/slideArrows/rightArrow-grey.svg";
import downArrowBlack from "../assets/slideArrows/rightArrow-black.svg";
import { useState} from "react";

export default function DownArrow( {onClick } ) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href="#" className="flex items-center p-2 mr-5 text-white rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <img
        src={isHovered ?  downArrowBlack : downArrowGrey }
        className="w-12 h-12 transition duration-50"
        aria-label="Next Slide"
      />
    </a>
  );
}