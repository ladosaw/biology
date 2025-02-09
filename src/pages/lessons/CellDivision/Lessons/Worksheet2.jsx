import React, { useState } from "react";

const Worksheet2 = () => {
  const activities = [
    "Cytokinesis and karyokinesis occur",
    "Cells grow, and organelles increase in number",
    "Chromosomes align at the equatorial plane",
    "DNA is replicated",
    "Two daughter cells are produced",
    "The period of growth",
    "The period of division",
    "The chromosomes are separated to the opposite pole",
    "The chromatin becomes double-stranded known as sister chromatids",
    "Consists of G1, S, and G2",
  ];

  const [answers, setAnswers] = useState(
    Array(activities.length).fill({ interphase: false, mitosis: false })
  );

  const handleCheckboxChange = (index, phase) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = {
        interphase:
          phase === "interphase" ? !prevAnswers[index].interphase : false,
        mitosis: phase === "mitosis" ? !prevAnswers[index].mitosis : false,
      };
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    const payload = activities.map((activity, index) => ({
      activity,
      interphase: answers[index].interphase,
      mitosis: answers[index].mitosis,
    }));

    console.log(payload);

    // try {
    //   const response = await fetch("https://your-backend-api-url.com/submit", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   const data = await response.json();
    //   alert("Submission successful! " + JSON.stringify(data));
    // } catch (error) {
    //   alert("Error submitting data: " + error.message);
    // }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Worksheet 2</h1>
      <p className="mb-4">
        Complete the table by checking the correct column for each description
        of the cell cycle.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">
                Activity in the Cell
              </th>
              <th className="p-2 border border-gray-300">Interphase</th>
              <th className="p-2 border border-gray-300">Mitosis</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">{activity}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    checked={answers[index].interphase}
                    onChange={() => handleCheckboxChange(index, "interphase")}
                  />
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    checked={answers[index].mitosis}
                    onChange={() => handleCheckboxChange(index, "mitosis")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          table {
            font-size: 14px;
          }
          input[type="checkbox"] {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Worksheet2;
