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
          {/* <a
            href={WorksheetData.worksheet1.link}
            target="_blank"
            onClick={() => handleLinkClick("worksheet1")}
            className="text-blue-600 hover:underline"
          >
            {WorksheetData.worksheet1.title}
          </a> */}
          <button onClick={toggleModalWorksheet}>
            {WorksheetData.worksheet1.title}
          </button>
        </li>
        <li className="hover:text-blue-600">
          {/* <a
            href={WorksheetData.worksheet2.link}
            target="_blank"
            onClick={() => handleLinkClick("worksheet2")}
            className="text-blue-600 hover:underline"
          >
            {WorksheetData.worksheet2.title}
          </a> */}
          <button onClick={toggleModalWorksheet2}>
            {WorksheetData.worksheet2.title}
          </button>
        </li>

        <li className="hover:text-blue-600">
          {/* <a
            href={WorksheetData.worksheet3.link}
            target="_blank"
            onClick={() => handleLinkClick("worksheet3")}
            className="text-blue-600 hover:underline"
          >
            {WorksheetData.worksheet3.title}
          </a> */}
          <button onClick={toggleEvaluation}>
            {WorksheetData.evaluation.title}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Worksheet;
