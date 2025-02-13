import React, { useState } from "react";

const Worksheet2 = () => {
  const [answers, setAnswers] = useState(Array(15).fill(""));

  const handleInputChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const formattedAnswers = answers.reduce((obj, answer, index) => {
      obj[index + 1] = answer;
      return obj;
    }, {});

    console.log(formattedAnswers);
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">Worksheet 2: TELL ME MORE</h1>
      <p>
        Direction: The table below summarizes the difference between mitosis and
        meiosis. Write M1 for mitosis, M2 for meiosis, and B3 for both if it
        describes mitosis or meiosis or both.
      </p>
      <p className="mb-6">Basis for Comparison</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 hidden sm:table">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">
                Basis for Comparison
              </th>
              <th className="border border-gray-300 p-2">
                Mitosis (M1) | Meiosis (M2) | Both (B3)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              "Produce body cell",
              "Ensure genetic stability",
              "Divide the parent cell once",
              "Produce four daughter cells",
              "Gives way to genetic diversity",
              "Divide the cell twice",
              "Produce daughter cells with the same number of chromosomes as the mother",
              "Aids in genetic defects",
              "Associated with asexual reproduction",
              "Associated with sexual reproduction",
              "Helps in the repair of damaged cells and tissues",
              "Occurs in the testes and ovaries (gametogenesis)",
              "Produce diploid or haploid daughter cells",
              "Produce two identical daughter cells",
              "Gives variation to organisms",
            ].map((cross, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2">{cross}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={answers[i]}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your answer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Responsive Layout for Small Screens */}
        <div className="sm:hidden">
          {[
            "Produce body cell",
            "Ensure genetic stability",
            "Divide the parent cell once",
            "Produce four daughter cells",
            "Gives way to genetic diversity",
            "Divide the cell twice",
            "Produce daughter cells with the same number of chromosomes as the mother",
            "Aids in genetic defects",
            "Associated with asexual reproduction",
            "Associated with sexual reproduction",
            "Helps in the repair of damaged cells and tissues",
            "Occurs in the testes and ovaries (gametogenesis)",
            "Produce diploid or haploid daughter cells",
            "Produce two identical daughter cells",
            "Gives variation to organisms",
          ].map((cross, i) => (
            <div key={i} className="mb-4 p-2 border rounded-lg bg-gray-50">
              <p className="font-medium">{cross}</p>
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleInputChange(i, e.target.value)}
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your answer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default Worksheet2;
