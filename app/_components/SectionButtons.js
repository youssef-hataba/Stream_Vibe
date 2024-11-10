"use client";
import { GrLinkPrevious } from "react-icons/gr";

const SectionButtons = ({ scrollId }) => {
  return (
    <div className="flex gap-4">
      <div
        className="flex items-center w-12 h-12 justify-center rounded-lg border
        border-black-12 bg-black-6 hover:bg-black-12 duration-100 transition-all cursor-pointer"
        onClick={() => scrollLeft(scrollId)}
      >
        <GrLinkPrevious className="text-xl text-gray-90" />
      </div>

      <div
        className="flex items-center w-12 h-12 justify-center rounded-lg border rotate-180
        border-black-12 bg-black-6 hover:bg-black-12 duration-100 transition-all cursor-pointer"
        onClick={() => scrollRight(scrollId)} 
      >
        <GrLinkPrevious className="text-xl text-gray-90" />
      </div>
    </div>
  );
};
export default SectionButtons;


function scrollLeft(scrollId) {
  const container = document.getElementById(scrollId);
  container?.scrollBy({ left: -450, behavior: "smooth" });
}

function scrollRight(scrollId) {
  const container = document.getElementById(scrollId);
  container?.scrollBy({ left: 450, behavior: "smooth" });
}
