import React, { useState } from "react";
import axios from "axios";
import Pencil from "../../../assets/images/Pencil.png";
import grass from "../../../assets/images/OrganismWorksheet1/grass.png";
import carrots from "../../../assets/images/OrganismWorksheet1/carrots.png";
import corn from "../../../assets/images/OrganismWorksheet1/corn.png";
import eagle from "../../../assets/images/OrganismWorksheet1/eagle.png";
import fox from "../../../assets/images/OrganismWorksheet1/fox.png";
import frog from "../../../assets/images/OrganismWorksheet1/frog.png";
import grasshoppers from "../../../assets/images/OrganismWorksheet1/grasshoppers.png";
import owl from "../../../assets/images/OrganismWorksheet1/owl.png";
import python from "../../../assets/images/OrganismWorksheet1/python.png";
import rabbits from "../../../assets/images/OrganismWorksheet1/rabbits.png";
import rat from "../../../assets/images/OrganismWorksheet1/rat.png";

const Worksheet1 = () => {
  const [answers, setAnswers] = useState({
    producers: Array(4).fill(""),
    primaryConsumers: Array(4).fill(""),
    secondaryConsumers: Array(4).fill(""),
    tertiaryConsumers: Array(4).fill(""),
  });

  const handleChange = (category, index, value) => {
    setAnswers((prev) => {
      const updatedCategory = [...prev[category]];
      updatedCategory[index] = value;
      return { ...prev, [category]: updatedCategory };
    });
  };

  const images = [
    grass,
    owl,
    rat,
    carrots,
    rabbits,
    grasshoppers,
    frog,
    fox,
    eagle,
    corn,
    python,
  ];

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "https://your-backend-endpoint.com/submit",
    //     answers
    //   );
    //   if (response.status === 200) {
    //     alert("Answers submitted successfully!");
    //   } else {
    //     alert("Submission failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting answers:", error);
    //   alert("An error occurred while submitting.");
    // }
    console.log(answers);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <img src={Pencil} alt="Pencil" className="w-12" />
        <div>
          <h1 className="font-bold text-xl sm:text-2xl text-center sm:text-left">
            WORKSHEET No. 1: Understanding Food Chain
          </h1>
          <p className="text-sm sm:text-base text-center sm:text-left">
            Direction: Group the organisms according to their classification in
            the feeding process. Complete the table below by indicating the name
            of the organisms. Write your answer in the box.
          </p>
        </div>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
        {images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Organism ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </div>

      {/* Editable Table */}
      <form onSubmit={handleSubmit} className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300 mb-4">
            <thead className="bg-blue-200">
              <tr>
                <th className="border px-2 py-1">Producers</th>
                <th className="border px-2 py-1">
                  Primary Consumers (Herbivores)
                </th>
                <th className="border px-2 py-1">
                  Secondary Consumers (Carnivores)
                </th>
                <th className="border px-2 py-1">
                  Tertiary Consumers (Omnivores)
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(answers).map((category) => (
                    <td key={category} className="border px-2 py-1">
                      <input
                        type="text"
                        value={answers[category][rowIndex]}
                        onChange={(e) =>
                          handleChange(category, rowIndex, e.target.value)
                        }
                        className="w-full p-1 border rounded-lg"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default Worksheet1;
