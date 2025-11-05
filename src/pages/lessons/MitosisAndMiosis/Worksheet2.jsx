import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";
import SubmitDatePicker from "../../../components/date-input/SubmitDatePicker.jsx";

const QUESTIONS = [
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
];

const Worksheet2 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet2ModalOpen,
  setIsModalWorksheetModalOpenPrevious,
  setEvaluationOpenNext,
}) => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);

  const handleInputChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setSubmitDate(null);
  };

  const constructPayload = () => {
    return QUESTIONS.map((question, index) => ({
      id: `Q${index + 1}`,
      question,
      answer: answers[index] || "N/A",
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const authToken = localStorage.getItem("authToken");
      const user_id = localStorage.getItem("id");

      if (!authToken) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Please log in to submit answers",
          confirmButtonColor: "#dc2626",
        });
        return;
      }

      const payload = {
        answer: [Object.fromEntries(answers.map((a, i) => [i + 1, a]))],
        inputAnswer: constructPayload(),
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
            ${result.user_answer} -
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
              setIsModalWorksheetModalOpenPrevious(true);
            });
          }
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.message || "Error submitting answers",
      });
    } finally {
      setIsLoading(false);
      setIsModalWorksheet2ModalOpen(false);
    }
  };

  const renderQuestionRow = (question, index) => (
    <tr key={index} className="odd:bg-white even:bg-gray-50">
      <td className="border border-gray-300 p-2">{question}</td>
      <td className="border border-gray-300 p-2">
        <input
          type="text"
          value={answers[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="w-full p-1 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="M1, M2, B3"
          maxLength="2"
        />
      </td>
    </tr>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Activity 2: TELL ME MORE</h1>
      <div className="mb-6 space-y-2">
        <p className="text-gray-600">
          Direction: Compare mitosis and meiosis by writing:
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>M1</strong> for Mitosis
          </li>
          <li>
            <strong>M2</strong> for Meiosis
          </li>
          <li>
            <strong>B3</strong> for Both
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Basis for Comparison</th>
              <th className="p-3 text-center">Answer</th>
            </tr>
          </thead>
          <tbody>{QUESTIONS.map(renderQuestionRow)}</tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-4">
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
