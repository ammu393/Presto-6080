import upArrowGrey from "../assets/slideArrows/leftArrow-grey.svg";
import upArrowBlack from "../assets/slideArrows/leftArrow-black.svg";
import { useState} from "react";

export default function UpArrow({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a href="#" className="flex items-center p-2 text-white rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault(); 
        onClick(); 
      }}
    >
      <img src={isHovered ?  upArrowBlack : upArrowGrey } className="w-12 h-12 transition duration-50" alt="Add Slide" />
    </a>
  );
}