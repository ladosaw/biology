import React from "react";
import pyramid from "../../../assets/images/pyramid.png";

const Worksheet4 = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-2">
        Worksheet No. 4: FOOD PYRAMID
      </h1>
      <p className="text-center text-gray-700 mb-4 max-w-lg">
        Direction: Identify the trophic level of the given organisms. Write your
        answer in the text field.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 w-full max-w-4xl">
        <img
          src={pyramid}
          alt="Food Pyramid"
          className="w-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md"
        />
        <div className="flex flex-col space-y-4 w-full max-w-sm">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-semibold">Enter Answer {index + 1}:</label>
              <input
                type="text"
                className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your answer here"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Worksheet4;
