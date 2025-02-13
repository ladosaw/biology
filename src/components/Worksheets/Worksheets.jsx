import React, { useState } from "react";

const Worksheet = ({
  WorksheetData,
  toggleModalWorksheet,
  toggleModalWorksheet2,
  toggleModalWorksheet3,
  toggleEvaluation,
}) => {
  const handleLinkClick = (key) => {
    setClickedLinks((prevState) => ({
      ...prevState,
      [key]: true,
    }));
  };

  return (
    <div className="w-full flex flex-col items-start gap-6 p-4">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-snug text-gray-800">
        WORKSHEET
      </h1>
      <ul className="list-disc pl-6 text-lg text-gray-700 flex flex-col gap-5">
        <li className="hover:text-blue-600">
          <button onClick={toggleModalWorksheet}>
            {WorksheetData.worksheet1.title}
          </button>
        </li>
        <li className="hover:text-blue-600">
          <button onClick={toggleModalWorksheet2}>
            {WorksheetData.worksheet2.title}
          </button>
        </li>

        {/* <li className="hover:text-blue-600">
          <button onClick={toggleModalWorksheet3}>
            {WorksheetData.worksheet3.title}
          </button>
        </li> */}

        <li className="hover:text-blue-600">
          <button onClick={toggleEvaluation}>
            {WorksheetData.evaluation.title}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Worksheet;
