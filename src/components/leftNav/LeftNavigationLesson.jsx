import React, { useState, useEffect } from "react";

const sections = [
  { title: "Overall", subsubtitle: "Overall" },
  { title: "Digestive System", subsubtitle: "Lesson 1" },
  { title: "Mitosis", subsubtitle: "Lesson 2" },
  { title: "Meiosis", subsubtitle: "Lesson 3" },
  { title: "Mendelian Genetics", subsubtitle: "Lesson 4" },
  { title: "Organism", subsubtitle: "Lesson 5" },
];

const LeftNavigationLesson = ({ onModuleClick }) => {
  const [activeIndicator, setActiveIndicator] = useState("Overall-Overall");
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const hash = window.location.hash.slice(1).toLowerCase();
    const matchedSection = sections.find(
      (section) => section.title.toLowerCase().replace(/ /g, "-") === hash
    );
    if (matchedSection) {
      setActiveIndicator(
        `${matchedSection.title}-${matchedSection.subsubtitle}`
      );
      setExpandedSections({ [matchedSection.title]: true });
    } else {
      setActiveIndicator("Overall-Overall");
    }
  }, []);

  const handleNavigation = (sectionTitle, subsubtitle) => {
    const key = `${sectionTitle}-${subsubtitle}`;
    setActiveIndicator(key);
    window.location.hash = sectionTitle.toLowerCase().replace(/ /g, "-");

    if (onModuleClick) {
      onModuleClick({ sectionTitle, subsubtitle });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md border">
      {sections.map((section) => (
        <div key={section.title} className="mb-4">
          {/* Special case for "Overall" */}
          {section.title === "Overall" ? (
            <div className="flex items-center gap-2">
              {/* Dot indicator */}
              <button
                className={`h-3 w-3 rounded-full transition-colors ${
                  activeIndicator === "Overall-Overall"
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
                onClick={() => handleNavigation("Overall", "Overall")}
              ></button>
              {/* Title */}
              <button
                className="text-left text-gray-600 hover:text-blue-500 transition"
                onClick={() => handleNavigation("Overall", "Overall")}
              >
                {section.title}
              </button>
            </div>
          ) : (
            <div>
              {/* Section Title */}
              <button
                className="block w-full text-left text-lg font-medium text-gray-700 py-2 px-4 hover:bg-gray-100 rounded transition"
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    [section.title]: !prev[section.title],
                  }))
                }
              >
                {section.title}
              </button>

              {/* Dropdown content */}
              {expandedSections[section.title] && (
                <div className="ml-4 mt-2">
                  <div
                    className="flex items-center gap-2 py-1"
                    key={`${section.title}-${section.subsubtitle}`}
                  >
                    {/* Dot indicator */}
                    <button
                      className={`h-3 w-3 rounded-full transition-colors ${
                        activeIndicator ===
                        `${section.title}-${section.subsubtitle}`
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                      onClick={() =>
                        handleNavigation(section.title, section.subsubtitle)
                      }
                    ></button>
                    {/* Subsubtitle */}
                    <button
                      className="text-left text-gray-600 hover:text-blue-500 transition"
                      onClick={() =>
                        handleNavigation(section.title, section.subsubtitle)
                      }
                    >
                      {section.subsubtitle}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeftNavigationLesson;
