import React, { useState } from "react";
import { EvaluationQuestion } from "./ConstantDigestive";
import { LoadingButton } from "@mui/lab";
import { Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../../utils/api/api";
import FiveMinuteTimer from "../../../../components/timer/FiveMinuteTimer.jsx";

const Evaluation = ({
  titles,
  worksheet_no,
  setEvaluationOpen,
  setIsModalWorksheet3ModalOpenPrevious,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [invalidQuestions, setInvalidQuestions] = useState([]);
  const [submitDate, setSubmitDate] = useState(null);

  const handleChange = (id, value) => {
    // Store A/B/C/D (uppercase)
    setAnswers({ ...answers, [id]: value.toUpperCase() });
    setInvalidQuestions(invalidQuestions.filter((qid) => qid !== id));
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setInvalidQuestions([]);
    setSubmitDate(null);
  };

  const inputAnswersData = () => {
    return EvaluationQuestion.map((q) => ({
      id: q.id,
      question: q.question,
      answer: answers[q.id]?.trim() || "",
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Ensure all questions are answered
      if (Object.keys(answers).length !== EvaluationQuestion.length) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Answers",
          text: "Please answer all questions before submitting.",
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
          <div style="margin-top:20px;">
            ${detailed_results
              .map(
                (result, index) => `
              <div style="margin-bottom:8px;">
                <span><strong>${index + 1}.</strong> ${result.user_answer} - ${
                  result.is_correct ? "✅ Correct" : "❌ Incorrect"
                }</span>
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
                margin-top:12px;">
              Previous
            </button>
          </div>
        `,
        didRender: () => {
          const previousBtn = document.getElementById("previousBtn");
          if (previousBtn) {
            previousBtn.addEventListener("click", () => {
              Swal.close();
              setIsModalWorksheet3ModalOpenPrevious(true);
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
      setEvaluationOpen(false);
    }
  };

  const choiceLetters = ["A", "B", "C", "D"];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Digestive System Quiz</h1>
      <FiveMinuteTimer onSubmit={handleSubmit} initialTime={600} />

      {EvaluationQuestion.map((q) => (
        <div key={q.id} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <p className="font-medium mb-3">
            {q.id}. {q.question}
          </p>

          {/* Radio Buttons */}
          <RadioGroup
            value={answers[q.id] || ""}
            onChange={(e) => handleChange(q.id, e.target.value)}
          >
            {q.choices.map((choice, index) => (
              <FormControlLabel
                key={index}
                value={choiceLetters[index]} // Store A/B/C/D
                control={<Radio color="primary" />}
                label={`${choiceLetters[index]}. ${choice}`}
              />
            ))}
          </RadioGroup>

          {invalidQuestions.includes(q.id) && (
            <p className="text-red-500 text-sm mt-1">
              Please select an answer.
            </p>
          )}
        </div>
      ))}

      {submitted && (
        <p className="text-xl font-bold text-center">
          Your Score: {score}/{EvaluationQuestion.length}
        </p>
      )}

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
