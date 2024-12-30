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
    title: "Mendelian Genetics",
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
    title: "Stages of Mitosis",
    subtitle: [
      {
        subsubtitle: "Lesson 1",
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
    <div className="p-4">
      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <button
            className="flex items-center justify-between w-full text-lg font-bold mb-2"
            onClick={() => toggleSection(section.title)}
          >
            {section.title}
          </button>
          {openSections[section.title] && (
            <div className="ml-4">
              {section.subtitle.map((sub) => (
                <div key={sub.subsubtitle} className="mb-4">
                  <button
                    className="flex items-center justify-between w-full text-md font-semibold mb-2"
                    onClick={() =>
                      toggleSubtitle(section.title, sub.subsubtitle)
                    }
                  >
                    {sub.subsubtitle}
                  </button>
                  {openSubtitles[`${section.title}-${sub.subsubtitle}`] && (
                    <div className="flex items-start gap-3">
                      {/* Progress indicator */}
                      <div className="flex flex-col items-center">
                        {sub.items.map((item, index) => {
                          const key = `${section.title}-${sub.subsubtitle}-${item}`;
                          return (
                            <React.Fragment key={key}>
                              <button
                                className={`h-3 w-3 rounded-full focus:outline-none ${
                                  activeIndicator[key]
                                    ? "bg-green-500"
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
                              {index < sub.items.length - 1 && (
                                <div className="h-6 w-[3px] bg-gray-300"></div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Lesson and module titles */}
                      <ul className="space-y-2">
                        {sub.items.map((item) => {
                          const key = `${section.title}-${sub.subsubtitle}-${item}`;
                          return (
                            <li key={key}>
                              <button
                                className="text-left text-blue-500 hover:underline"
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
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeftNavigationLesson;
