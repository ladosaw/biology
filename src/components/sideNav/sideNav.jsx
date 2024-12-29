import React, { useState } from "react";

const SideNav = ({ onLessonSelect }) => {
  const [expandedTopic, setExpandedTopic] = useState(0);
  const [activeLesson, setActiveLesson] = useState({
    topicIndex: 0,
    lessonIndex: 0,
  });
  const [isNavOpen, setIsNavOpen] = useState(false);

  const topics = [
    {
      title: "Digestive System",
      lesson: ["Lesson 1", "Lesson 2", "Lesson 3"],
    },
    {
      title: "Meiosis",
      lesson: ["Lesson 1", "Lesson 2", "Lesson 3"],
    },
    {
      title: "Stages of Mitosis",
      lesson: ["Lesson 1", "Lesson 2", "Lesson 3"],
    },
  ];

  const toggleTopic = (index) => {
    // Toggle the topic visibility
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  const handleActiveLesson = (topicIndex, lessonIndex) => {
    // Set the active lesson
    setActiveLesson({ topicIndex, lessonIndex });

    // Pass the selected lesson to the parent
    const selected = {
      topic: topics[topicIndex].title,
      lesson: topics[topicIndex].lesson[lessonIndex],
    };
    onLessonSelect(selected);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="relative">
      {/* Floating button on small devices */}
      <button
        onClick={toggleNav}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg sm:hidden"
      >
        {/* Add an icon or text to represent the button */}
        <span>≡</span>
      </button>

      {/* SideNav */}
      <div
        className={`${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:block fixed inset-0 sm:relative bg-gray-100 p-4 rounded-md shadow-md max-w-sm z-40 transition-transform duration-300 ease-in-out  pt-16 md:pt-4`}
      >
        {topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="mb-6 last:mb-0">
            <h1
              className="text-xl font-bold text-gray-800 mb-3 cursor-pointer"
              onClick={() => toggleTopic(topicIndex)}
            >
              {topic.title}
            </h1>
            <div
              className={`${
                expandedTopic === topicIndex
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden transition-all duration-300 ease-in-out`}
            >
              <div className="flex flex-col space-y-2 pl-4 border-l-2 border-gray-300">
                {topic.lesson.map((lesson, lessonIndex) => (
                  <p
                    key={lessonIndex}
                    className={`${
                      activeLesson.topicIndex === topicIndex &&
                      activeLesson.lessonIndex === lessonIndex
                        ? "text-primary " // Active lesson with border
                        : "text-black hover:text-primary"
                    } transition-colors cursor-pointer`}
                    onClick={() => handleActiveLesson(topicIndex, lessonIndex)}
                  >
                    {lesson}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
