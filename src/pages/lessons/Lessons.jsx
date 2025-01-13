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
import MendelianGenetics from "./MendelianGenetics/MendelianGenetics.jsx";

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
  const [selectedLesson, setSelectedLesson] = useState({
    sectionTitle: "Overall",
    subsubtitle: "Overall",
  });

  useEffect(() => {
    initializeAnalytics();
    trackPageView(window.location.pathname, "Lessons.jsx");

    const hash = window.location.hash.slice(1).toLowerCase();

    if (hash) {
      switch (hash) {
        case "digestive-system":
          setSelectedLesson({
            sectionTitle: "Digestive System",
            subsubtitle: "Lesson 1",
          });
          break;
        case "mitosis":
          setSelectedLesson({
            sectionTitle: "Mitosis",
            subsubtitle: "Lesson 2",
          });
          break;
        case "meiosis":
          setSelectedLesson({
            sectionTitle: "Meiosis",
            subsubtitle: "Lesson 3",
          });
          break;
        case "mendelian-genetics":
          setSelectedLesson({
            sectionTitle: "Mendelian Genetics",
            subsubtitle: "Lesson 4",
          });
          break;
        case "organism":
          setSelectedLesson({
            sectionTitle: "Mendelian Genetics",
            subsubtitle: "Lesson 5",
          });
          break;
        default:
          setSelectedLesson({
            sectionTitle: "Overall",
            subsubtitle: "Overall",
          });
      }
    }
  }, []);

  const renderLesson = () => {
    const { sectionTitle, subsubtitle } = selectedLesson;

    switch (sectionTitle) {
      case "Digestive System":
        return <Module1 />;
      case "Mitosis":
        return <CellDivision />;
      case "Meiosis":
        return <MitosisAndMiosis />;
      case "Mendelian Genetics":
        return <MendelianGenetics />;
      case "Organism":
        return <UnderMaintenance />;
      default:
        return <Overall />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items">
      <div className="w-full lg:w-1/4 p-4">
        <LeftNavigationLesson onModuleClick={setSelectedLesson} />
      </div>
      <div className="w-full lg:w-3/4 p-4">{renderLesson()}</div>
    </div>
  );
};

export default Lessons;
