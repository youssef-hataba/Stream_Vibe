"use client";
import { useState } from "react";

const StarRating = ({ StarsNumber = 5, pStyle, StartStyle, actualRating ,color="#E50000"}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating =  actualRating || hoverRating || rating || 0;

  const handleRating = (index, isHalf) => {
    const newRating = isHalf ? index + 0.5 : index + 1;
    setRating(newRating);
  };

  const handleHover = (index, isHalf) => {
    const newHoverRating = isHalf ? index + 0.5 : index + 1;
    setHoverRating(newHoverRating);
  };

  const handleMouseMove = (e, index) => {
    const isHalf = e.nativeEvent.offsetX < e.currentTarget.clientWidth / 2;
    handleHover(index, isHalf);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex">
        {Array.from({ length: StarsNumber }, (_, i) => (
          <div
            key={i}
            onClick={(e) =>
              handleRating(i, e.nativeEvent.offsetX < e.currentTarget.clientWidth / 2)
            }
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHoverRating(0)}
            className={`w-8 h-8 cursor-pointer ${StartStyle}`}
          >
            <Star
              full={displayRating >= i + 1}
              half={displayRating >= i + 0.5 && displayRating < i + 1}
              Style={StartStyle}
              color={color}
            />
          </div>
        ))}
      </div>
      <p className={`m-0 text-red-45 ${pStyle}`}>{displayRating.toFixed(1)}</p>
    </div>
  );
};

function Star({ full, half,Style,color }) {
  return (
    <span className={`w-8 h-8 block cursor-pointer ${Style}`}>
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : half ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <defs>
            <clipPath id="half-star">
              <rect x="0" y="0" width="10" height="20" />
            </clipPath>
          </defs>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill={color}
            clipPath="url(#half-star)"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default StarRating;
