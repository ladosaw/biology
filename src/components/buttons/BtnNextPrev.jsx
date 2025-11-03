import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function BtnNextPrev({ name, handleNextPrevLesson, isNext = true }) {
  return (
    <button
      onClick={handleNextPrevLesson}
      className="flex items-center justify-center gap-2 bg-primary text-white
                px-3 py-2 rounded-lg shadow-md hover:bg-primary-dark active:bg-primary-dark
                transition duration-200 w-full min-h-[44px] touch-manipulation
                sm:px-6 sm:py-3 sm:rounded-xl sm:w-auto sm:min-h-[48px]"
    >
      {!isNext && <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
      <span className="font-medium text-sm sm:text-base">{name}</span>
      {isNext && <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
    </button>
  );
}

export default BtnNextPrev;
