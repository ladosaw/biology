import LeftNavigationLesson from "../../components/leftNav/LeftNavigationLesson.jsx";
import Module1 from "./DigestiveSystem/Lesson1/Module1.jsx";
import MitosisAndMiosis from "./MitosisAndMiosis/MitosisAndMiosis.jsx";
import CellDivision from "./CellDivision/Lessons/CellDivision.jsx";
import React, { useState, useEffect } from "react";
import {
  initializeAnalytics,
  trackPageView,
} from "../../components/analytics/Analytics";
import undermaintenance from "../../assets/images/undermaintenance.png";
import Overall from "./Overall/Overall.jsx";

const UnderMaintenance = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center">
      {/* Left Section - Text */}
      <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
        <h1 className="text-4xl font-extrabold text-primary mb-4">
          Oops! <span className="text-secondary">Under Construction</span>
        </h1>
        <p className="text-textPrimary text-lg mb-6">
          We're currently improving this page to serve you better. Please check
          back later!
        </p>
        <button
          className="px-6 py-3 bg-primary text-backgroundWhite font-bold rounded-md shadow hover:bg-secondary hover:text-white"
          onClick={() => (window.location.href = "/")}
        >
          Go Back Home
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="lg:w-1/2 flex justify-center items-center">
        <img
          src={undermaintenance}
          alt="Under Construction"
          className="w-full max-w-lg lg:max-w-xl"
        />
      </div>
    </div>
  </div>
);

const Lessons = () => {
  const [selectedModule, setSelectedModule] = useState({
    sectionTitle: "Overall",
    subsubtitle: "Overall",
    item: "Overall",
  });

  useEffect(() => {
    initializeAnalytics();
    trackPageView(window.location.pathname, "Lessons.jsx");

    const hash = window.location.hash.slice(1).toLowerCase();

    if (hash) {
      switch (hash) {
        case "digestive-system":
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
          break;
        case "meiosis":
          setSelectedModule({
            sectionTitle: "Meiosis",
            subsubtitle: "Lesson 1",
            item: "Module 1",
          });
          break;
        case "mendelian-genetics":
          setSelectedModule({
            sectionTitle: null,
            subsubtitle: null,
            item: null,
          });
          break;
        case "organism":
          setSelectedModule({
            sectionTitle: null,
            subsubtitle: null,
            item: null,
          });
          break;
        default:
          setSelectedModule({
            sectionTitle: "Overall",
            subsubtitle: "Overall",
            item: "Overall",
          });
      }
    }
  }, []);

  const renderModule = () => {
    const { sectionTitle, subsubtitle, item } = selectedModule;

    switch (sectionTitle) {
      case "Digestive System":
        return renderDigestiveSystem(subsubtitle, item);
      case "Meiosis":
        return renderMandelianGenetics(subsubtitle, item);
      case "Mitosis":
        return renderMand(subsubtitle, item);
      case "Overall":
        return renderOverall(sectionTitle, item);
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

  const renderOverall = (sectionTitle, item) => {
    switch (sectionTitle) {
      case "Overall":
        switch (item) {
          case "Overall":
            return <Overall />;
          case "Module 2":
            return <UnderMaintenance />;
          case "Module 3":
            return <UnderMaintenance />;
          default:
            return <UnderMaintenance />;
        }
      default:
        return <UnderMaintenance />;
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
