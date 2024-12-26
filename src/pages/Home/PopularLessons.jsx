import React from "react";

const PopularLessons = () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-full px-4">
      <section className="text-center mb-6">
        <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl mb-4">
          Most Popular Lessons
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
      <section className="w-full">
        <div className="bg-bglightBlue w-full p-4 rounded-lg flex items-center justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <li className="text-sm sm:text-base lg:text-lg">Digestive</li>
            <li className="text-sm sm:text-base lg:text-lg">
              Mandelian Genetics
            </li>
            <li className="text-sm sm:text-base lg:text-lg">Meiosis</li>
            <li className="text-sm sm:text-base lg:text-lg">Stages Mitosis</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PopularLessons;
