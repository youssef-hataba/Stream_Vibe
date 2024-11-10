import React from 'react';

export const Spinner1 = () => {
  return (
    <div className="relativ flex justify-center items-center h-[720px] bg-black-8">
      <img src="/loading1.gif" className=" "/>
    </div>
  );
};


export const Spinner2 = () => {
  return (
    <div className="relativ flex justify-center items-center h-[320px] bg-black-8">
    <div className="relative w-16 h-16">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-red-45 rounded-full absolute"
            style={{
              transform: `rotate(${i * 30}deg) translate(0, -250%)`,
              animation: `spin 1.2s linear infinite`,
              animationDelay: `${-i * 0.1}s`,
              opacity: `${1 - i * 0.08}`,
            }}
          />
        ))}
      </div>
      </div>
  );
};

