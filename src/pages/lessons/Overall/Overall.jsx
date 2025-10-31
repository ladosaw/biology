import React from "react";
import Module1 from "../DigestiveSystem/Lesson1/Module1";
import CellDivision from "../CellDivision/Lessons/CellDivision.jsx";
import MiosisAndMitosis from "../MitosisAndMiosis/MitosisAndMiosis";
import MendelianGenetics from "../MendelianGenetics/MendelianGenetics.jsx";
import Organism from "../Organism/Organism.jsx";
import FloatingButton from "../../../components/FloatingButton/FloatingButton.jsx";

const Overall = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
        Overall Lessons
      </h1>

      <div className="flex flex-col gap-6 sm:gap-8 max-w-6xl mx-auto">
        {/* Digestive System */}
        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
          <Module1 hideFloating={true} hideAdditionalButtons={true} />
        </div>

        {/* Mitosis */}
        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
          <CellDivision hideFloating={true} hideAdditionalButtons={true} />
        </div>

        {/* Meiosis */}
        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
          <MiosisAndMitosis hideFloating={true} hideAdditionalButtons={true} />
        </div>

        {/* Mendelian Genetics */}
        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
          <MendelianGenetics hideFloating={true} hideAdditionalButtons={true} />
        </div>

        {/* Organism */}
        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
          <Organism hideFloating={true} hideAdditionalButtons={true} />
        </div>
      </div>
      <FloatingButton hasDownload={false} hasPrinter={false} />
    </div>
  );
};

export default Overall;
