import React, { useState } from "react";

const Worksheet2 = () => {
  const [answers, setAnswers] = useState(
    Array(6).fill({ genotypic: "", phenotypic: "" })
  );

  const handleInputChange = (index, type, value) => {
    const updatedAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, [type]: value } : answer
    );
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log("User Answers:", answers);
    alert("Answers submitted successfully!");
  };

  const crosses = [
    "DD x DD",
    "DD x Dd",
    "DD x dd",
    "Dd x Dd",
    "Dd x dd",
    "dd x dd",
  ];

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">
        Mendelian Genetics Worksheet 2
      </h1>
      <p className="mb-6">
        Fill in the Genotypic and Phenotypic Ratios for each cross based on the
        given table.
      </p>

      {/* Table for larger screens */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 hidden sm:table">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Cross</th>
              <th className="border border-gray-300 p-2">Genotypic Ratio</th>
              <th className="border border-gray-300 p-2">Phenotypic Ratio</th>
            </tr>
          </thead>
          <tbody>
            {crosses.map((cross, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {cross}
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={answers[i].genotypic}
                    onChange={(e) =>
                      handleInputChange(i, "genotypic", e.target.value)
                    }
                    className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter genotypic ratio"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={answers[i].phenotypic}
                    onChange={(e) =>
                      handleInputChange(i, "phenotypic", e.target.value)
                    }
                    className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phenotypic ratio"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive layout for small screens */}
      <div className="sm:hidden">
        {crosses.map((cross, i) => (
          <div key={i} className="mb-4 p-3 border rounded-lg bg-gray-50">
            <p className="font-medium text-lg">{cross}</p>
            <div className="mt-2">
              <label className="block text-sm font-semibold">
                Genotypic Ratio
              </label>
              <input
                type="text"
                value={answers[i].genotypic}
                onChange={(e) =>
                  handleInputChange(i, "genotypic", e.target.value)
                }
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter genotypic ratio"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-semibold">
                Phenotypic Ratio
              </label>
              <input
                type="text"
                value={answers[i].phenotypic}
                onChange={(e) =>
                  handleInputChange(i, "phenotypic", e.target.value)
                }
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phenotypic ratio"
              />
            </div>
          </div>
        ))}
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
