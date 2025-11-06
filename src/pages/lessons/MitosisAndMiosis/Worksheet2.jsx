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
    <p><strong>Activity:</strong> ${worksheet.titles || titles}</p>
    <p><strong>Activity No:</strong> ${
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Pencil Icon */}

        {/* Content */}
        <div className="flex flex-col w-full">
          {/* Directions Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-full text-gray-800">
            <p className="text-sm font-bold mb-2 text-left text-gray-700">
              Directions:
            </p>

            <p className="text-sm mb-2 text-left text-gray-800">
              Compare{" "}
              <span className="font-semibold text-green-600">mitosis</span> and{" "}
              <span className="font-semibold text-purple-600">meiosis</span> by
              writing:
            </p>

            <p className="text-sm mb-2 text-left text-gray-800">
              Read each item under{" "}
              <span className="italic text-gray-700">
                “Basis for Comparison.”
              </span>
            </p>

            <p className="text-sm mb-3 text-left text-gray-800">
              Decide if the statement applies to{" "}
              <span className="font-semibold text-green-600">Mitosis</span>,{" "}
              <span className="font-semibold text-purple-600">Meiosis</span>, or{" "}
              <span className="font-semibold text-blue-600">Both</span>. Type
              the correct code in the answer box:
            </p>

            <ul className="list-disc pl-6 text-sm text-left text-gray-800 space-y-1 mb-4">
              <li>
                <strong className="text-green-600">M1</strong> for Mitosis
              </li>
              <li>
                <strong className="text-purple-600">M2</strong> for Meiosis
              </li>
              <li>
                <strong className="text-blue-600">B3</strong> for Both
              </li>
            </ul>
            <p className="text-sm text-left text-gray-800">
              When you're done, click{" "}
              <span className="font-semibold text-blue-600">Submit</span> to
              check your answers.
            </p>
          </div>
        </div>
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
