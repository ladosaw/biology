import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftNavigationLesson from "../../components/leftNav/LeftNavigationLesson.jsx";
import Module1 from "./DigestiveSystem/Lesson1/Module1.jsx";
import MitosisAndMiosis from "./MitosisAndMiosis/MitosisAndMiosis.jsx";
import CellDivision from "./CellDivision/Lessons/CellDivision.jsx";
import {
  initializeAnalytics,
  trackPageView,
} from "../../components/analytics/Analytics";
import Overall from "./Overall/Overall.jsx";
import MendelianGenetics from "./MendelianGenetics/MendelianGenetics.jsx";
import Organism from "./Organism/Organism.jsx";
import API from "../../utils/api/api.js";

const Lessons = () => {
  const [selectedLesson, setSelectedLesson] = useState({
    sectionTitle: "Overall",
    subsubtitle: "Overall",
  });

  <LeftNavigationLesson
    onModuleClick={{ sectionTitle: "Overall", subsubtitle: "Overall" }}
  />;

  const navigate = useNavigate();

  useEffect(() => {
    initializeAnalytics();
    trackPageView(window.location.pathname, "Lessons.jsx");

    // Check if token exists in localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

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
            sectionTitle: "Organism",
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
        return <Organism />;
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
