import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../utils/api/api";
import { MiosisWorksheetsEvaluationQuestions } from "./ConstantData";
import numberSeven from "../../../assets/images/numberSeven.png";
import FiveMinuteTimer from "../../../components/timer/FiveMinuteTimer.jsx";

const Evaluation = ({
  titles,
  worksheet_no,
  setEvaluationOpen,
  setIsModalWorksheet2ModalOpenPrevious,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [invalidQuestions, setInvalidQuestions] = useState([]);
  const [submitDate, setSubmitDate] = useState(null);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
    setInvalidQuestions(invalidQuestions.filter((qid) => qid !== id));
  };

  const inputAnswersData = () =>
    MiosisWorksheetsEvaluationQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      answer: answers[q.id] || "",
    }));

  const handleReset = () => {
    setAnswers({});
    setInvalidQuestions([]);
    setSubmitDate(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const unanswered = MiosisWorksheetsEvaluationQuestions.filter(
        (q) => !answers[q.id]
      ).map((q) => q.id);

      if (unanswered.length > 0) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Answers",
          html: `Missing answers for questions: ${unanswered.join(", ")}`,
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      const user_id = localStorage.getItem("id");
      const authToken = localStorage.getItem("authToken");

      const payload = {
        answer: [answers],
        inputAnswer: inputAnswersData(),
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

      setEvaluationOpen(false);

      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        showConfirmButton: false,
        showCloseButton: true,
        html: `
          <p><strong>Worksheet:</strong> ${worksheet.titles || titles}</p>
          <p><strong>Worksheet No:</strong> Evaluation</p>
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
                  ${result.user_answer.toUpperCase()} - ${
                  result.is_correct ? "Correct ✔️" : "Incorrect ❌"
                }
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
          </div>
        `,
        didRender: () => {
          const previousBtn = document.getElementById("previousBtn");
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
    }
  };

  const choiceLetters = ["A", "B", "C", "D"];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Meiosis</h1>
      <FiveMinuteTimer onSubmit={handleSubmit} initialTime={600} />
      <p>
        Direction: Read and understand each question, then choose the correct
        answer by selecting one of the options.
      </p>

      {MiosisWorksheetsEvaluationQuestions.map((q) => (
        <div key={q.id} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          {q.id === 8 && (
            <>
              <h1 className="text-lg font-bold mb-4 text-gray-700">
                For item 8, refer to the table below.
              </h1>
              {/* You can add your table here */}
            </>
          )}

          <p className="font-medium mb-3">{`${q.id}. ${q.question}`}</p>

          {q.id === 7 && (
            <div className="flex justify-center mb-4">
              <img
                src={numberSeven}
                alt="Question 7 Illustration"
                className="w-72 md:w-96 h-auto rounded-lg shadow"
              />
            </div>
          )}

          {/* Radio button choices */}
          <ul className="space-y-2">
            {q.choices.map((choice, index) => {
              const letter = choiceLetters[index];
              return (
                <li key={index}>
                  <label
                    htmlFor={`question-${q.id}-${letter}`}
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                      answers[q.id] === letter.toLowerCase()
                        ? ""
                        : "bg-transparent"
                    }`}
                  >
                    <input
                      type="radio"
                      id={`question-${q.id}-${letter}`}
                      name={`question-${q.id}`}
                      value={letter.toLowerCase()}
                      checked={answers[q.id] === letter.toLowerCase()}
                      onChange={() => handleChange(q.id, letter.toLowerCase())}
                      className="accent-blue-600 cursor-pointer w-5 h-5"
                    />
                    <span className="font-bold">{letter}.</span>
                    <span>{choice}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="flex justify-end gap-4 mt-4">
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          disabled={isLoading}
          sx={{ px: 4, py: 1 }}
        >
          Reset
        </Button>

        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading}
          onClick={handleSubmit}
          sx={{ px: 4, py: 1 }}
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
};

export default Evaluation;
