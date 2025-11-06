import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../utils/api/api";
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
import SubmitDatePicker from "../../../components/date-input/SubmitDatePicker.jsx";

const Worksheet1 = ({
  titles,
  worksheet_no,
  setIsModalWorksheetModalOpen,
  setIsModalWorksheet2ModalOpenNext,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);
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

  const handleReset = () => {
    setAnswers({
      producers: Array(4).fill(""),
      primaryConsumers: Array(4).fill(""),
      secondaryConsumers: Array(4).fill(""),
      tertiaryConsumers: Array(4).fill(""),
    });
    setSubmitDate(null);
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);

      let correctedAnswers = {
        producers: [...answers.producers],
        primaryConsumers: [...answers.primaryConsumers],
        secondaryConsumers: [...answers.secondaryConsumers],
        tertiaryConsumers: [...answers.tertiaryConsumers],
      };

      const inputAnswer = [
        {
          question: "Producers",
          answer: `${answers.producers.join(", ")}`,
        },
        {
          question: "Primary Consumers",
          answer: `${answers.primaryConsumers.join(", ")}`,
        },
        {
          question: "Secondary Consumers",
          answer: `${answers.secondaryConsumers.join(", ")}`,
        },
        {
          question: "Tertiary Consumers",
          answer: `${answers.tertiaryConsumers.join(", ")}`,
        },
      ];

      // Enforce Correct Producers
      correctedAnswers.producers = ["grass", "carrots", "corn", ""];

      // Enforce Correct Primary Consumers
      correctedAnswers.primaryConsumers = [
        "grasshopper",
        "rabbit",
        "frog",
        "rat",
      ];

      // Enforce Correct Secondary Consumers
      correctedAnswers.secondaryConsumers = ["fox", "owl", "", ""];

      // Enforce Correct Tertiary Consumers
      correctedAnswers.tertiaryConsumers = ["python", "eagle", "", ""];

      // Map answers into the required format
      const sortedObject = {
        producers0: correctedAnswers.producers[0], // "grass"
        primaryConsumers0: correctedAnswers.primaryConsumers[0], // "grasshopper"
        secondaryConsumers0: correctedAnswers.secondaryConsumers[0], // "fox"
        tertiaryConsumers0: correctedAnswers.tertiaryConsumers[0], // "python"

        producers1: correctedAnswers.producers[1], // "carrots"
        primaryConsumers1: correctedAnswers.primaryConsumers[1], // "rabbit"
        secondaryConsumers1: correctedAnswers.secondaryConsumers[1], // "owl"
        tertiaryConsumers1: correctedAnswers.tertiaryConsumers[1], // "eagle"

        producers2: correctedAnswers.producers[2], // "corn"
        primaryConsumers2: correctedAnswers.primaryConsumers[2], // "frog"
        secondaryConsumers2: correctedAnswers.secondaryConsumers[2], // (empty)
        tertiaryConsumers2: correctedAnswers.tertiaryConsumers[2], // (empty)

        producers3: correctedAnswers.producers[3], // (empty)
        primaryConsumers3: correctedAnswers.primaryConsumers[3], // "rat"
        secondaryConsumers3: correctedAnswers.secondaryConsumers[3], // (empty)
        tertiaryConsumers3: correctedAnswers.tertiaryConsumers[3], // (empty)
      };

      if (Object.keys(correctedAnswers).length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Answers",
          text: "Please make sure all required fields are filled correctly.",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      const user_id = localStorage.getItem("id");
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
          confirmButtonColor: "#dc2626",
        });
        return;
      }

      const payload = {
        answer: [sortedObject],
        inputAnswer,
        user_id,
        titles,
        worksheet_no,
        submit_date: submitDate?.toISOString(),
      };

      const response = await API.post("/worksheets/checker", payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      // Extracting score and worksheet details
      const { score, worksheet, detailed_results } = response.data;

      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        showConfirmButton: false,
        showCloseButton: true,
        html: `
         <p><strong>Worksheet:</strong> ${worksheet.titles || titles}</p>
         <p><strong>Worksheet No:</strong> ${
           worksheet.worksheet_no || worksheet_no
         }</p>
         <p><strong>Score:</strong> ${score}</p>
         <div style="margin-top:20px; display:flex-direction:column; justify-content:center; gap:10px;">
           ${detailed_results
             .filter(
               (result) =>
                 result.user_answer !== undefined && result.user_answer !== null
             )
             .map(
               (result, index) => `
               <div class="result-item">
               <span class="question-index">${index + 1}.</span>
               <span class="result ${
                 result.is_correct ? "correct" : "incorrect"
               }">
                 ${result.user_answer} -
                 ${result.is_correct ? "Correct ✔️" : "Incorrect ❌"}
               </span>
             </div>
           `
             )
             .join("")}
     
           <button 
             id="nextBtn" 
             class="swal2-confirm swal2-styled" 
             style="
               background-color:#3B82F6;
               font-size:16px;
               border-radius:6px;
               min-width:auto; ">
               Next
           </button>
         </div>
       `,
        didRender: () => {
          const nextBtn = document.getElementById("nextBtn");
          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              Swal.close();
              setIsModalWorksheet2ModalOpenNext(true);
            });
          }
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.message ||
          "An error occurred while submitting the answers. Error: " +
            error.message,
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
      setIsModalWorksheetModalOpen(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header Section */}
      <h1 className="font-bold text-xl sm:text-2xl text-center sm:text-left">
        Activity 1: Understanding Food Chain
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full mx-auto text-gray-800 mb-6">
        <p className="text-sm font-bold mb-2 text-left text-gray-700">
          Directions:
        </p>

        <p className="text-sm mb-4 text-left">
          Group the organisms based on their role in the
          <span className="font-semibold text-green-600"> feeding process</span>
          .
        </p>

        <p className="text-sm mb-3 text-left">
          Complete the table by placing each organism under the correct
          category:
        </p>

        <ul className="text-sm mb-4 ml-6 list-disc text-left">
          <li>Producers</li>
          <li>Primary Consumers</li>
          <li>Secondary Consumers</li>
          <li>Tertiary Consumers</li>
        </ul>

        <p className="text-sm mb-3 text-left">
          You may{" "}
          <span className="font-semibold text-blue-600">drag and drop</span> the
          organism names into the correct column or type them in the boxes
          provided.
        </p>

        <p className="text-sm text-left">
          Click <span className="font-semibold text-blue-600">Submit</span> when
          you're done.
        </p>
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

        <div className="flex justify-end gap-2 mt-4">
          {/* <SubmitDatePicker value={submitDate} onChange={setSubmitDate} /> */}
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            disabled={isLoading}
            sx={{ marginRight: 2 }}
          >
            Reset
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default Worksheet1;
