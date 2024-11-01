import Image from 'next/image';

// Next Button Component
export const NextButton = ({ onClick }) => {
  return (
    <div
      className='flex items-center w-12 h-12 justify-center rounded-lg border
    border-black-12 bg-black-6 hover:bg-black-12 hover:scale-95 duration-100 transition-all cursor-pointer' 
      onClick={onClick}
    >
      <Image
        src="/images/icons/Vector.png"
        alt="Next icon"
        width={21} 
        height={17}
      />
    </div>
  );
};

// Previous Button Component
export const PrevButton = ({ onClick }) => {
  return (
    <div
      className="flex items-center w-12 h-12 justify-center rounded-lg border rotate-180
    border-black-12 bg-black-6 hover:bg-black-12 hover:scale-95 duration-100 transition-all cursor-pointer"
      onClick={onClick}
    >
      <Image
        src="/images/icons/Vector.png"
        alt="Previous icon"
        width={21}
        height={17}
      />
    </div>
  );
};

// Media Actions Component
export const MediaActions = () => {
  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <button className="bg-red-45 flex text-white gap-2 justify-center rounded-lg 
                items-center w-[19.5rem] lg:w-[8rem] h-[3rem]">
        <img src="/images/icons/play.png" alt="Play icon" />
        Play Now
      </button>
      <div className="flex gap-4 justify-center">
        <button
          className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center 
              justify-center">
          <img src="/images/icons/plus.png" alt="Add icon" />
        </button>
        <button
          className="w-[3rem] h-[3rem] bg-black-6 rounded-lg flex items-center 
      justify-center">
          <img src="/images/icons/like.png" alt="Like icon" />
        </button>
      </div>
    </div>
  );
};

export default { NextButton, PrevButton, MediaActions };
