import React, { useState, useEffect } from "react";
import SideNav from "../../components/sideNav/sideNav";
import Lesson1 from "./DigestiveSystem/Lesson1";

const Lessons = () => {
  const [selectedLesson, setSelectedLesson] = useState({
    topic: "Digestive System",
    lesson: "Lesson 1",
  });

  const handleLessonSelect = (selected) => {
    setSelectedLesson(selected);
    console.log("Selected Lesson:", selected);
  };

  useEffect(() => {
    handleLessonSelect({
      topic: "Digestive System",
      lesson: "Lesson 1",
    });
  }, []);

  const renderLessonContent = () => {
    switch (selectedLesson.topic) {
      case "Digestive System":
        switch (selectedLesson.lesson) {
          case "Lesson 1":
            return <Lesson1 />;
          case "Lesson 2":
            return <div>Digestive System - Lesson 2 content here</div>;
          case "Lesson 3":
            return <div>Digestive System - Lesson 3 content here</div>;
          default:
            return <div>Lesson content not available</div>;
        }
      case "Meiosis":
        switch (selectedLesson.lesson) {
          case "Lesson 1":
            return <div>Meiosis - Lesson 1 content here</div>;
          case "Lesson 2":
            return <div>Meiosis - Lesson 2 content here</div>;
          case "Lesson 3":
            return <div>Meiosis - Lesson 3 content here</div>;
          default:
            return <div>Lesson content not available</div>;
        }
      case "Stages of Mitosis":
        switch (selectedLesson.lesson) {
          case "Lesson 1":
            return <div>Stages of Mitosis - Lesson 1 content here</div>;
          case "Lesson 2":
            return <div>Stages of Mitosis - Lesson 2 content here</div>;
          case "Lesson 3":
            return <div>Stages of Mitosis - Lesson 3 content here</div>;
          default:
            return <div>Lesson content not available</div>;
        }
      default:
        return <div>Topic content not available</div>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-6 p-4">
      {/* Side Navigation */}
      <div className="w-full sm:w-1/4">
        <SideNav onLessonSelect={handleLessonSelect} />
      </div>

      {/* Selected Lesson Content */}
      <div className="w-full sm:w-3/4 mt-4 sm:mt-0 flex-grow">
        <div className="mt-4">{renderLessonContent()}</div>
      </div>
    </div>
  );
};

export default Lessons;
