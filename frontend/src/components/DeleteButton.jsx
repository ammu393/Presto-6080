import deleteGrey from "../assets/delete-grey.svg";
import deleteRed from "../assets/delete-red.svg";
import { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


export default function DeleteButon () {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a href="#" className="flex items-center p-1 text-white rounded-lg ml-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}     
        >
          <img src={isHovered ? deleteRed : deleteGrey} className="w-12 h-12 transition duration-50" alt="Delete Slide" />
        </a>
      );
    }
