import React, { useState } from "react";
import Card from "../../components/card/Card";
import digestiveData from "../../components/constant/digestiveCard";
import mandelianData from "../../components/constant/mandelianCard";
import meiosisData from "../../components/constant/meiosisCard";
import mitosisData from "../../components/constant/mitosisCard";

const PopularLessons = () => {
  const [selectedLesson, setSelectedLesson] = useState("Digestive");

  const lessons = [
    "Digestive",
    "Mandelian Genetics",
    "Meiosis",
    "Stages Mitosis",
  ];

  const digestiveCards = digestiveData.map((digData, index) => (
    <Card
      key={index}
      lesson={digData.lessonTitle}
      gradeLevel={digData.gradeLevel}
      image={digData.digImage}
      btnText="Read More"
    />
  ));

  const mandelianCards = mandelianData.map((digData, index) => (
    <Card
      key={index}
      lesson={digData.lessonTitle}
      gradeLevel={digData.gradeLevel}
      image={digData.digImage}
      btnText="Read More"
    />
  ));

  const meiosisCards = meiosisData.map((digData, index) => (
    <Card
      key={index}
      lesson={digData.lessonTitle}
      gradeLevel={digData.gradeLevel}
      image={digData.digImage}
      btnText="Read More"
    />
  ));

  const mitosisCards = mitosisData.map((digData, index) => (
    <Card
      key={index}
      lesson={digData.lessonTitle}
      gradeLevel={digData.gradeLevel}
      image={digData.digImage}
      btnText="Read More"
    />
  ));

  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-full">
      {/* Header Section */}
      <section className="text-center mb-6">
        <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl mb-4">
          Most Popular Lessons
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      {/* Navigation Section */}
      <section className="w-full">
        <div className="bg-bglightBlue w-full p-4 rounded-lg flex items-center justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            {lessons.map((lesson) => (
              <li
                key={lesson}
                className={`text-sm sm:text-base lg:text-lg cursor-pointer ${
                  selectedLesson === lesson ? "font-bold text-blue-500" : ""
                }`}
                onClick={() => setSelectedLesson(lesson)}
              >
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mt-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedLesson === "Digestive"
            ? digestiveCards
            : selectedLesson === "Mandelian Genetics"
            ? mandelianCards
            : selectedLesson === "Meiosis"
            ? meiosisCards
            : mitosisCards}
        </div>
      </section>

      {/* Banner Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white py-8 sm:py-12 lg:py-16 relative overflow-hidden rounded-3xl mt-8">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 bg-blue-700 rounded-full opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-green-700 rounded-full opacity-20"></div>

        <div className="text-center relative z-10 px-4 sm:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-4">
            Become part of my lesson
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6">
            Join today and unlock the tools for a brighter future. Learn, grow,
            and achieve success!
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded transform hover:scale-105 transition-transform duration-300">
            Study Today!
          </button>
        </div>
      </section>
    </div>
  );
};

export default PopularLessons;
