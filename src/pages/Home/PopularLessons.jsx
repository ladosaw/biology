import React, { useState } from "react";
import Card from "../../components/card/Card.jsx";
import digestiveData from "../../components/constant/digestiveCard.jsx";

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

  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-full px-4">
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

      <section className="mt-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedLesson === "Digestive" && digestiveCards}
        </div>
      </section>
    </div>
  );
};

export default PopularLessons;
