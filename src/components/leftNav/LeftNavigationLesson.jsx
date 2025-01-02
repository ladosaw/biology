import React, { useState, useEffect } from "react";

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
  const [activeIndicator, setActiveIndicator] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1).toLowerCase();
    if (hash) {
      let module = null;
      switch (hash) {
        case "digestive":
          module = {
            sectionTitle: "Digestive System",
            subsubtitle: "Lesson 1",
            item: "Module 1",
          };
          break;
        case "meiosis":
          module = {
            sectionTitle: "Meiosis",
            subsubtitle: "Lesson 1",
            item: "Module 1",
          };
          break;
        case "mendelian-genetics":
          module = {
            sectionTitle: "Mendelian Genetics",
            subsubtitle: "Lesson 1",
            item: "Module 1",
          };
          break;
        default:
          console.warn("Invalid hash provided in URL.");
      }

      if (module) {
        setSelectedModule(module);
        setActiveIndicator({
          [`${module.sectionTitle}-${module.subsubtitle}-${module.item}`]: true,
        });
        setExpandedSections({
          [module.sectionTitle]: true,
          [`${module.sectionTitle}-${module.subsubtitle}`]: true,
        });
      }
    }
  }, []);

  const toggleExpand = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigation = (sectionTitle, subsubtitle, item) => {
    const key = `${sectionTitle}-${subsubtitle}-${item}`;
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
          <button
            className="block w-full text-left text-lg font-medium text-gray-700 py-2 px-4 hover:bg-gray-100 rounded transition"
            aria-expanded={expandedSections[section.title]}
            onClick={() => toggleExpand(section.title)}
          >
            {section.title}
          </button>
          {expandedSections[section.title] && (
            <div className="ml-4">
              {section.subtitle.map((sub) => (
                <div key={sub.subsubtitle} className="mb-3">
                  <button
                    className="block w-full text-left text-md text-gray-600 py-2 px-3 hover:bg-gray-50 rounded transition"
                    aria-expanded={
                      expandedSections[`${section.title}-${sub.subsubtitle}`]
                    }
                    onClick={() =>
                      toggleExpand(`${section.title}-${sub.subsubtitle}`)
                    }
                  >
                    {sub.subsubtitle}
                  </button>
                  {expandedSections[`${section.title}-${sub.subsubtitle}`] && (
                    <div className="py-2">
                      {sub.items.map((item) => {
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
