import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../utils/api/api";
import { mendelianGeneticsQuestions } from "./ConstantData";
import FiveMinuteTimer from "../../../components/timer/FiveMinuteTimer.jsx";
// import SubmitDatePicker from "../../../components/date-input/SubmitDatePicker.jsx";

const Evaluation = ({
  titles,
  worksheet_no,
  setEvaluationOpen,
  setIsModalWorksheet4ModalOpenPrevious,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [invalidQuestions, setInvalidQuestions] = useState([]);
  const [submitDate, setSubmitDate] = useState(null);

  const handleChange = (id, value) => {
    // Save as uppercase A/B/C/D
    setAnswers({ ...answers, [id]: value });
    setInvalidQuestions(invalidQuestions.filter((qid) => qid !== id));
  };

  const handleReset = () => {
    setAnswers({});
    setInvalidQuestions([]);
    setSubmitDate(null);
  };

  const inputAnswersData = () => {
    return mendelianGeneticsQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      answer: answers[q.id] || "",
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Validate completeness
      const unanswered = mendelianGeneticsQuestions
        .filter((q) => !answers[q.id])
        .map((q) => q.id);

      if (unanswered.length > 0) {
        setInvalidQuestions(unanswered);
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
              setIsModalWorksheet4ModalOpenPrevious(true);
            });
          }
        },
      });

      setEvaluationOpen(false);
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
      <h1 className="text-3xl font-bold text-center">
        Mendelian Genetics Evaluation
      </h1>

      <FiveMinuteTimer onSubmit={handleSubmit} initialTime={600} />

      {mendelianGeneticsQuestions.map((q) => (
        <div key={q.id} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <p className="font-medium mb-3">
            {q.id}. {q.question}
          </p>

          {/* Radio buttons for choices */}
          <RadioGroup
            value={answers[q.id] || ""}
            onChange={(e) => handleChange(q.id, e.target.value)}
          >
            {q.choices.map((choice, index) => (
              <FormControlLabel
                key={index}
                value={choiceLetters[index]}
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
