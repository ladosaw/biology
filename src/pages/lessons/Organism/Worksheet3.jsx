import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";
import SubmitDatePicker from "../../../components/date-input/SubmitDatePicker.jsx";

const Worksheet3 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet3ModalOpen,
  setIsModalWorksheet2ModalOpenPrevious,
  setIsModalWorksheet4ModalOpenNext,
}) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: value.toLowerCase(),
    }));
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitDate(null);
  };

  const handleSubmit = async () => {
    try {
      const inputAnswer = crossess.map((item, index) => ({
        question: item,
        answer: answers[index] || "",
      }));

      const combinedAnswers = [
        crossess.reduce((acc, item, index) => {
          acc[`${item[0].toLowerCase()}`] = answers[index].toLowerCase();
          return acc;
        }, {}),
      ];
      setIsLoading(true);
      const user_id = localStorage.getItem("id");
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
          confirmButtonColor: "#dc2626",
        });
        setIsLoading(false);
        setIsModalWorksheet3ModalOpen(false);
        return;
      }

      const payload = {
        answer: combinedAnswers,
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
             .map(
               (result, index) => `
             <div class="result-item">
               <span class="question-index">${index + 1}.</span>
               <span class="result ${
                 result.is_correct ? "correct" : "incorrect"
               }">
                 ${result.user_answer.toUpperCase()} -
                 ${result.is_correct ? "Correct ✔️" : "Incorrect ❌"}
               </span>
             </div>
           `
             )
             .join("")}
            
              <button 
             id="previousBtn" 
             class="swal2-confirm swal2-styled" 
             style="
               background-color: transparent;
               color: #3B82F6;
               border: 1.5px solid #3B82F6;
               font-size:16px;
               border-radius:6px;
               min-width:auto;">
               Previous
           </button>
     
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
          const previousBtn = document.getElementById("previousBtn");
          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              Swal.close();
              setIsModalWorksheet4ModalOpenNext(true);
            });
          }
          if (previousBtn) {
            previousBtn.addEventListener("click", () => {
              Swal.close();
              setIsModalWorksheet2ModalOpenPrevious(true);
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
          "An error occurred while submitting the answers.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
      setIsModalWorksheet3ModalOpen(false);
    }
  };

  const crossess = [
    "A. Bacteria",
    "B. Hawk",
    "C. Rat",
    "D. Rice Plant",
    "E. Snake",
    "F. Sunlight ",
  ];

  const choices = [
    "Decomposer",
    "Tertiary Consumer",
    "Primary Consumer",
    "Secondary Consumer",
    "Energy Source",
    "Producers",
  ];

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">Worksheet No. 3: Who Am I?</h1>
      <p className="mb-6">
        Determine the role of the organism in the trophic level. Write your
        answer from.the given choices.
      </p>

      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
          background: "#f9f9f9",
          textAlign: "center",
        }}
      >
        {choices.map((choice, index) => (
          <div key={index} style={{ fontSize: "16px", fontWeight: "bold" }}>
            {choice}
          </div>
        ))}
      </div>

      {/* Table for larger screens */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300 hidden sm:table">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Column A</th>
              <th className="border border-gray-300 p-2">Column B</th>
            </tr>
          </thead>
          <tbody>
            {crossess.map((cross, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {cross}
                </td>

                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Answer"
                    value={answers[i] || ""}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive layout for small screens */}
      <div className="sm:hidden">
        {crossess.map((cross, i) => (
          <div key={i} className="mb-4 p-3 border rounded-lg bg-gray-50">
            <p className="font-medium text-lg">{cross}</p>

            <div className="mt-2">
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Answer"
                value={answers[i] || ""}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        {/* <SubmitDatePicker value={submitDate} onChange={setSubmitDate} /> */}
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          disabled={isLoading}
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
    </div>
  );
};

export default Worksheet3;
