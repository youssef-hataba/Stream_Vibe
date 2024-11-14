import {FaPlus} from "react-icons/fa";
import {FaHeart} from "react-icons/fa";
import {FaPlay} from "react-icons/fa6";
import { GrLinkPrevious } from "react-icons/gr";

// Next Button Component
export const NextButton = ({onClick}) => {
  return (
    <div
      className="flex items-center w-12 h-12 justify-center rounded-lg border rotate-180
    border-black-12 bg-black-6 hover:bg-black-12 duration-100 transition-all cursor-pointer"
      onClick={onClick}>
      <GrLinkPrevious className="text-xl text-gray-90" />
    </div>
  );
};

// Previous Button Component
export const PrevButton = ({onClick}) => {
  return (
    <div
      className="flex items-center w-12 h-12 justify-center rounded-lg border
    border-black-12 bg-black-6 hover:bg-black-12 duration-100 transition-all cursor-pointer"
      onClick={onClick}>
      <GrLinkPrevious className="text-xl text-gray-90" />
    </div>
  );
};


export const MediaActions = ({classes}) => {
  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <button
        className={`bg-red-45 flex text-white gap-2 justify-center rounded-lg 
                items-center w-[19.5rem] lg:w-[8rem] h-[3rem] group ${classes}`}>
        <FaPlay className="transition-transform duration-500 transform group-hover:scale-150" />
        Play Now
      </button>

      <div className="flex gap-4 justify-center">
        <button className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center justify-center group">
          <FaPlus className="group-hover:text-red-45 duration-200 transition-all transform group-hover:scale-125" />
        </button>
        <button className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center justify-center group">
          <FaHeart className="group-hover:text-red-45 duration-200 transition-all transform group-hover:scale-125" />
        </button>
      </div>
    </div>
  );
};


