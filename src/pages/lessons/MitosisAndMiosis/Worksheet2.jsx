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

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">
        Mendelian Genetics Worksheet 2
      </h1>
      <p className="mb-6">
        Fill in the Genotypic and Phenotypic Ratios for each cross based on the
        given table.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">
                Basis for Comparison
              </th>
              <th className="border border-gray-300 p-2">
                Mitosis (M1) Meiosis (M2) Both (B3)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              "Produce body cell",
              "DD x Dd",
              "DD x dd",
              "Dd x Dd",
              "Dd x dd",
              "dd x dd",
            ].map((cross, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {cross}
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
    </div>
  );
};

export default Worksheet2;
