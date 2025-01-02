import LeftNavigationLesson from "../../components/leftNav/LeftNavigationLesson.jsx";
import Module1 from "./DigestiveSystem/Lesson1/Module1.jsx";
import MitosisAndMiosis from "./MitosisAndMiosis/MitosisAndMiosis.jsx";
import Sampleasd from "./Sample.jsx";
import CellDivision from "./CellDivision/Lessons/CellDivision.jsx";
import React, { useState, useEffect } from "react";
import {
  initializeAnalytics,
  trackPageView,
} from "../../components/analytics/Analytics";
import undermaintenance from "../../assets/images/undermaintenance.png";

const UnderMaintenance = () => (
  <div>
    <img src={undermaintenance} alt="" />
  </div>
);

const Lessons = () => {
  const [selectedModule, setSelectedModule] = useState({
    sectionTitle: "Digestive System",
    subsubtitle: "Lesson 1",
    item: "Module 1",
  });

  useEffect(() => {
    initializeAnalytics();
    trackPageView(window.location.pathname, "Lessons.jsx");

    const hash = window.location.hash.slice(1).toLowerCase();
    if (hash) {
      switch (hash) {
        case "digestive":
          setSelectedModule({
            sectionTitle: "Digestive System",
            subsubtitle: "Lesson 1",
            item: "Module 1",
          });
          break;
        case "mitosis":
          setSelectedModule({
            sectionTitle: "Mitosis",
            subsubtitle: "Lesson 1",
            item: "Module 1",
          });
        case "meiosis":
          setSelectedModule({
            sectionTitle: "Meiosis",
            subsubtitle: "Lesson 1",
            item: "Module 1",
          });
          break;

          break;
        default:
          console.warn("Invalid hash provided in URL.");
      }
    }
  }, []);

  const renderModule = () => {
    const { sectionTitle, subsubtitle, item } = selectedModule;

    switch (sectionTitle) {
      case "Digestive System":
        return renderDigestiveSystem(subsubtitle, item);
      case "Mitosis":
        return renderMandelianGenetics(subsubtitle, item);
      case "Meiosis":
        return renderMand(subsubtitle, item);
      default:
        return <UnderMaintenance />;
    }
  };

  const renderDigestiveSystem = (subsubtitle, item) => {
    switch (subsubtitle) {
      case "Lesson 1":
        switch (item) {
          case "Module 1":
            return <Module1 />;
          case "Module 2":
            return <UnderMaintenance />;
          case "Module 3":
            return <UnderMaintenance />;
          default:
            return <div>Select a valid module.</div>;
        }
      default:
        return <div>Select a valid lesson.</div>;
    }
  };

  const renderMandelianGenetics = (subsubtitle, item) => {
    switch (subsubtitle) {
      case "Lesson 1":
        switch (item) {
          case "Module 1":
            return <MitosisAndMiosis />;
          case "Module 2":
            return <UnderMaintenance />;
          case "Module 3":
            return <UnderMaintenance />;
          default:
            return <div>Select a valid module.</div>;
        }
      default:
        return <div>Select a valid lesson.</div>;
    }
  };

  const renderMand = (subsubtitle, item) => {
    switch (subsubtitle) {
      case "Lesson 1":
        switch (item) {
          case "Module 1":
            return <CellDivision />;
          case "Module 2":
            return <UnderMaintenance />;
          case "Module 3":
            return <UnderMaintenance />;
          default:
            return <div>Select a valid module.</div>;
        }
      default:
        return <div>Select a valid lesson.</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items">
      <div className="w-full lg:w-1/4 p-4">
        <LeftNavigationLesson onModuleClick={setSelectedModule} />
      </div>
      <div className="w-full lg:w-3/4 p-4">{renderModule()}</div>
    </div>
  );
};

export default Lessons;
