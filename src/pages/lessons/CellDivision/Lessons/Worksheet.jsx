import React, { useState } from "react";
import Worksheet1A from "../../../../assets/images/WorksheetA1A.png";
import num1 from "../../../../assets/images/Worksheet1b/num1.png";
import num2 from "../../../../assets/images/Worksheet1b/num2.png";
import num3 from "../../../../assets/images/Worksheet1b/num3.png";
import num4 from "../../../../assets/images/Worksheet1b/num4.png";
import num5 from "../../../../assets/images/Worksheet1b/num5.png";
import num6 from "../../../../assets/images/Worksheet1b/num6.png";

const Worksheet = () => {
  const [answers, setAnswers] = useState({
    labels: {},
    phases: {},
    questions: {},
  });

  const handleInputChange = (section, key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Answers: ", answers);
    // Here you can make an API call to send data to the backend.
    // Example:
    // fetch("/api/submit-answers", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(answers),
    // });
  };

  return (
    <div>
      <div className="p-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Worksheet 1a: Label the Cell Cycle
          </h1>
          <p className="text-gray-700 mb-8">
            Label the parts of the cell cycle by filling out the fields below.
            Use the arrows to match the fields with the respective parts of the
            diagram.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="relative w-full lg:w-1/2">
            <img
              src={Worksheet1A}
              alt="Cell Cycle Diagram"
              className="w-full max-w-lg h-auto border shadow-lg rounded"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((label) => (
              <div key={label} className="flex items-center gap-4">
                <label className="font-semibold text-lg w-8">{label}:</label>
                <input
                  type="text"
                  placeholder={`Enter description for ${label}`}
                  className="flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    handleInputChange("labels", label, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 mt-11">
        <div>
          <h1 className="text-2xl font-bold mb-4">WORKSHEET # 1.b: Name Me</h1>
          <p className="text-gray-700 mb-8">
            Direction: The diagram shows the stages of mitosis in an animal
            cell. Label each stage/phase by writing the name and number. Write
            your answer in the box provided. (Ex. Prophase- 1)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[num1, num2, num3].map((num, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white"
            >
              <img
                src={num}
                alt={`Mitosis phase ${index + 1}`}
                className="mb-4 w-full h-32 object-contain"
              />
              <input
                type="text"
                placeholder={`Label ${index + 1}`}
                className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  handleInputChange(
                    "phases",
                    `Phase${index + 1}`,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[num4, num5, num6].map((num, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white"
            >
              <img
                src={num}
                alt={`Mitosis phase ${index + 4}`}
                className="mb-4 w-full h-32 object-contain"
              />
              <input
                type="text"
                placeholder={`Label ${index + 4}`}
                className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  handleInputChange(
                    "phases",
                    `Phase${index + 4}`,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Guide Questions
          </h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="question1" className="block font-medium mb-2">
                1. What stage of mitosis when chromosomes move to the middle of
                the cell?
              </label>
              <input
                type="text"
                id="question1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your answer"
                onChange={(e) =>
                  handleInputChange("questions", "question1", e.target.value)
                }
              />
            </div>

            <div>
              <label htmlFor="question2" className="block font-medium mb-2">
                2. When are chromosomes separate?
              </label>
              <input
                type="text"
                id="question2"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your answer"
                onChange={(e) =>
                  handleInputChange("questions", "question2", e.target.value)
                }
              />
            </div>

            <div>
              <label htmlFor="question3" className="block font-medium mb-2">
                3. How many daughter cells are produced during mitosis division?
              </label>
              <input
                type="text"
                id="question3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your answer"
                onChange={(e) =>
                  handleInputChange("questions", "question3", e.target.value)
                }
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center py-8">
        <button
          type="button"
          className="py-3 px-8 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default Worksheet;
