import React from "react";
import Btn from "../buttons/buttons";

const Card = (props) => {
  return (
    <div
      onClick={props.onClick}
      className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white max-w-sm mx-auto transform transition-transform duration-200 sm:hover:scale-105 cursor-pointer"
    >
      <section>
        <img
          src={props.image}
          alt={props.altText || "Image"}
          className="w-full h-48 sm:h-56 object-cover"
        />
      </section>

      <section className="p-4">
        <p className="text-sm text-gray-500 font-medium uppercase mb-2">
          {props.gradeLevel}
        </p>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          {props.lesson}
        </h1>
        <div className="flex justify-between sm:justify-end">
          <Btn text={props.btnText} onClick={props.click} />{" "}
        </div>
      </section>
    </div>
  );
};

export default Card;
