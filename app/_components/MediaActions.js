import {Image} from "next/image";

const MediaActions = () => {
  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <button className="bg-red-45 flex text-white gap-2 justify-center rounded-lg 
                items-center w-[19.5rem] lg:w-[8rem] h-[3rem]">
        <img src="/images/icons/play.png" alt="vector image"/>
        Play Now
      </button>
      <div className="flex gap-4 justify-center">
        <button
          className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center 
              justify-center">
          <img src="/images/icons/plus.png" alt="vector image" />
        </button>
        <button
          className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center 
      justify-center">
          <img src="/images/icons/like.png" alt="vector image" />
        </button>
      </div>
    </div>
  );
};

export default MediaActions;
