import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../../utils/api/api.js";
import SubmitDatePicker from "../../../../components/date-input/SubmitDatePicker.jsx";

const Worksheet2 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet2ModalOpen,
  setEvaluationOpenPrevious,
  setEvaluationOpenNext,
}) => {
  const ACTIVITIES = [
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

  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);
  const [selections, setSelections] = useState(
    Array(ACTIVITIES.length).fill("")
  );

  const handleRadioChange = (index, phase) => {
    setSelections((prev) => {
      const newSelections = [...prev];
      newSelections[index] = newSelections[index] === phase ? "" : phase;
      return newSelections;
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonColor: "#dc2626",
    });
  };

  const handleReset = () => {
    setSelections(Array(ACTIVITIES.length).fill(""));
    setSubmitDate(null);
  };

  const constructPayload = () => {
    return ACTIVITIES.map((activity, index) => ({
      id: (index + 1).toString(),
      question: `${index + 1}. ${activity}`,
      answer: selections[index] || "",
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("id");

      if (!authToken) {
        showErrorAlert("You are not logged in. Please log in again.");
        return;
      }

      const payloadObject = {};

      selections.forEach((phase, index) => {
        if (phase === "interphase") {
          payloadObject[index + 1] = "interphase";
        } else if (phase === "mitosis") {
          payloadObject[index + 1] = "mitosis";
        }
      });

      const response = await API.post(
        "/worksheets/checker",
        {
          answer: [payloadObject],
          inputAnswer: constructPayload(),
          user_id: userId,
          titles,
          worksheet_no,
          submit_date: submitDate?.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

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
          <span class="result ${result.is_correct ? "correct" : "incorrect"}">
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
              setEvaluationOpenNext(true);
            });
          }
          if (previousBtn) {
            previousBtn.addEventListener("click", () => {
              Swal.close();
              setEvaluationOpenPrevious(true);
            });
          }
        },
      });
    } catch (error) {
      showErrorAlert(
        error.response?.data?.message || "Submission failed. Please try again."
      );
    } finally {
      setIsLoading(false);
      setIsModalWorksheet2ModalOpen(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Worksheet 2</h1>
      <p className="mb-6 text-gray-600">
        Complete the table by selecting the correct phase for each description
        of the cell cycle.
      </p>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left border-b">Activity in the Cell</th>
              <th className="p-3 text-center border-b">Interphase</th>
              <th className="p-3 text-center border-b">Mitosis</th>
            </tr>
          </thead>
          <tbody>
            {ACTIVITIES.map((activity, index) => (
              <tr key={index} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3 border-b">{`${index + 1}. ${activity}`}</td>
                <td className="p-3 border-b text-center">
                  <input
                    type="radio"
                    name={`phase-${index}`}
                    className="w-5 h-5 accent-blue-500"
                    checked={selections[index] === "interphase"}
                    onChange={() => handleRadioChange(index, "interphase")}
                  />
                </td>
                <td className="p-3 border-b text-center">
                  <input
                    type="radio"
                    name={`phase-${index}`}
                    className="w-5 h-5 accent-blue-500"
                    checked={selections[index] === "mitosis"}
                    onChange={() => handleRadioChange(index, "mitosis")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-end gap-4">
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

export default Worksheet2;
