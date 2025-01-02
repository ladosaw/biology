import React, { useState } from "react";

const sections = [
  {
    title: "Digestive System",
    subtitle: [
      {
        subsubtitle: "Lesson 1",
        items: ["Module 1", "Module 2", "Module 3"],
      },
    ],
  },
  {
    title: "Meiosis",
    subtitle: [
      {
        subsubtitle: "Lesson 1",
        items: ["Module 1", "Module 2", "Module 3"],
      },
    ],
  },
  {
    title: "Mendelian Genetics",
    subtitle: [
      {
        subsubtitle: "Lesson 1",
        items: ["Module 1", "Module 2", "Module 3"],
      },
    ],
  },
  {
    title: "Stages of Mitosis",
    subtitle: [
      {
        subsubtitle: "Lesson 3",
        items: ["Module 1", "Module 2", "Module 3"],
      },
    ],
  },
];

const LeftNavigationLesson = ({ onModuleClick }) => {
  const [activeIndicator, setActiveIndicator] = useState({
    "Digestive System-Lesson 1-Module 1": true,
  });

  const [openSections, setOpenSections] = useState({
    "Digestive System": true,
  });

  const [openSubtitles, setOpenSubtitles] = useState({
    "Digestive System-Lesson 1": true,
  });

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleSubtitle = (sectionTitle, subsubtitle) => {
    const key = `${sectionTitle}-${subsubtitle}`;
    setOpenSubtitles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigation = (sectionTitle, subsubtitle, item) => {
    const key = `${sectionTitle}-${subsubtitle}-${item}`;
    setActiveIndicator({ [key]: true });
    if (onModuleClick) {
      onModuleClick({ sectionTitle, subsubtitle, item });
    }
  };

  return (
    <div className="p-4 md:mt-24 max-w-md mx-auto bg-white rounded-lg shadow-md border">
      {sections.map((section) => (
        <div key={section.title} className="mb-4">
          <button
            className="block w-full text-left text-lg font-medium text-gray-700 py-2 px-4 hover:bg-gray-100 rounded transition"
            onClick={() => toggleSection(section.title)}
          >
            {section.title}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openSections[section.title] ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="ml-4">
              {section.subtitle.map((sub) => (
                <div key={sub.subsubtitle} className="mb-3">
                  <button
                    className="block w-full text-left text-md text-gray-600 py-2 px-3 hover:bg-gray-50 rounded transition"
                    onClick={() =>
                      toggleSubtitle(section.title, sub.subsubtitle)
                    }
                  >
                    {sub.subsubtitle}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSubtitles[`${section.title}-${sub.subsubtitle}`]
                        ? "max-h-screen"
                        : "max-h-0"
                    }`}
                  >
                    <div className="py-2">
                      {sub.items.map((item) => {
                        const key = `${section.title}-${sub.subsubtitle}-${item}`;
                        return (
                          <div
                            key={key}
                            className="flex items-center gap-2 py-1"
                          >
                            {/* Progress indicator */}
                            <button
                              className={`h-3 w-3 rounded-full focus:outline-none transition-colors ${
                                activeIndicator[key]
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              }`}
                              onClick={() =>
                                handleNavigation(
                                  section.title,
                                  sub.subsubtitle,
                                  item
                                )
                              }
                            ></button>
                            {/* Module title */}
                            <button
                              className="text-left text-gray-600 hover:text-blue-500 transition"
                              onClick={() =>
                                handleNavigation(
                                  section.title,
                                  sub.subsubtitle,
                                  item
                                )
                              }
                            >
                              {item}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftNavigationLesson;
