import React, { useState, useEffect } from "react";

const sections = [
  {
    title: "Overall",
    subtitle: [
      {
        subsubtitle: "Overall",
        items: ["Overall"],
      },
    ],
  },
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
    title: "Mitosis",
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
    title: "Organism",
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
    "Overall-Overall": true,
  });
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const hash = window.location.hash.slice(1).toLowerCase();

    switch (hash) {
      case "digestive-system":
        setActiveIndicator({
          "Digestive System-Lesson 1-Module 1": true,
        });
        setExpandedSections({
          "Digestive System": true,
          "Digestive System-Lesson 1": true,
        });
        break;
      case "mitosis":
        setActiveIndicator({
          "Mitosis-Lesson 1-Module 1": true,
        });
        setExpandedSections({
          Mitosis: true,
          "Mitosis-Lesson 1": true,
        });
        break;
      case "meiosis":
        setActiveIndicator({
          "Meiosis-Lesson 1-Module 1": true,
        });
        setExpandedSections({
          Meiosis: true,
          "Meiosis-Lesson 1": true,
        });
        break;
      default:
        setActiveIndicator({ "Overall-Overall-Overall": true });
    }
  }, []);

  const handleNavigation = (sectionTitle, subsubtitle, item) => {
    const key = `${sectionTitle}-${subsubtitle}-${item}`;
    console.log(key);
    setActiveIndicator({ [key]: true });

    window.location.hash = sectionTitle.toLowerCase().replace(/ /g, "-");
    if (onModuleClick) {
      onModuleClick({ sectionTitle, subsubtitle, item });
    }
  };

  return (
    <div className="p-4 md:mt-24 max-w-md mx-auto bg-white rounded-lg shadow-md border">
      {sections.map((section) => (
        <div key={section.title} className="mb-4">
          {section.title === "Overall" ? (
            <div className="flex items-center gap-2">
              <button
                className={`h-3 w-3 rounded-full focus:outline-none transition-colors ${
                  activeIndicator["Overall-Overall-Overall"]
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
                onClick={() =>
                  handleNavigation("Overall", "Overall", "Overall")
                }
              ></button>
              <button
                className="text-left text-gray-600 hover:text-blue-500 transition"
                onClick={() =>
                  handleNavigation("Overall", "Overall", "Overall")
                }
              >
                Overall
              </button>
            </div>
          ) : (
            <div>
              <button
                className="block w-full text-left text-lg font-medium text-gray-700 py-2 px-4 hover:bg-gray-100 rounded transition"
                aria-expanded={expandedSections[section.title]}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    [section.title]: !prev[section.title],
                  }))
                }
              >
                {section.title}
              </button>
              {section.subtitle &&
                expandedSections[section.title] &&
                section.subtitle.map((sub) => (
                  <div key={sub.subsubtitle} className="ml-4 mb-3">
                    <button
                      className="block w-full text-left text-md text-gray-600 py-2 px-3 hover:bg-gray-50 rounded transition"
                      aria-expanded={
                        expandedSections[`${section.title}-${sub.subsubtitle}`]
                      }
                      onClick={() =>
                        setExpandedSections((prev) => ({
                          ...prev,
                          [`${section.title}-${sub.subsubtitle}`]:
                            !prev[`${section.title}-${sub.subsubtitle}`],
                        }))
                      }
                    >
                      {sub.subsubtitle}
                    </button>
                    {expandedSections[`${section.title}-${sub.subsubtitle}`] &&
                      sub.items.map((item) => {
                        const key = `${section.title}-${sub.subsubtitle}-${item}`;

                        return (
                          <div
                            key={key}
                            className="flex items-center gap-2 py-1"
                          >
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
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeftNavigationLesson;
