import React, { useState } from "react";
import { EvaluationQuestion } from "./ConstantDigestive";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../../utils/api/api";
import FiveMinuteTimer from "../../../../components/timer/FiveMinuteTimer.jsx";

const Evaluation = ({ titles, worksheet_no, setEvaluationOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [invalidQuestions, setInvalidQuestions] = useState([]); // Track unanswered questions

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value.toLowerCase() });
    setInvalidQuestions(invalidQuestions.filter((qid) => qid !== id)); // Remove from invalid state if answered
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setInvalidQuestions([]);
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
      // Ensure all organs are placed
      if (Object.keys(answers).length !== 10) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Answers",
          text: "Please Answer all questions before submitting.",
          confirmButtonColor: "#f59e0b", // Yellow warning color
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
      };

      const response = await API.post("/worksheets/checker", payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      // Extracting score and worksheet details
      const { score, worksheet, detailed_results } = response.data;

      setEvaluationOpen(false);

      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        html: `
        <p><strong>Worksheet:</strong> ${worksheet.titles}</p>
        <p><strong>Worksheet No:</strong> Evaluation</p>
        <p><strong>Your Score:</strong> ${score}</p>
        <ul>
        <p><strong> Your Answer: </strong></p>
          ${detailed_results
            .map(
              (result) =>
                `<li>${result.user_answer.toUpperCase()} is ${
                  result.is_correct ? "correct ✔️" : "incorrect ❌"
                }</li>`
            )
            .join("")}
        </ul>
      `,
        confirmButtonColor: "#10B981",
      });
    } catch (error) {
      console.error(error);
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
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              placeholder="Answer"
              className={`border p-2 rounded-md w-full md:w-48 focus:outline-none uppercase ${
                invalidQuestions.includes(q.id)
                  ? "border-red-500 focus:border-red-500"
                  : "focus:ring focus:border-blue-300"
              }`}
            />
            <p className="font-medium flex-1">{`${q.id}. ${q.question}`}</p>
          </div>
          <ul className="mt-2 pl-6">
            {q.choices.map((choice, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 font-bold">{choiceLetters[index]}.</span>
                <span>{choice}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {submitted && (
        <p className="text-xl font-bold text-center">
          Your Score: {score}/{EvaluationQuestion.length}
        </p>
      )}

      <div className="flex justify-end gap-4 mt-4">
        <Button
          variant="contained"
          color="error"
          onClick={handleReset}
          sx={{
            px: 4,
            py: 1,
          }}
        >
          Reset
        </Button>

        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading}
          onClick={handleSubmit}
          sx={{
            px: 4,
            py: 1,
          }}
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
};

export default Evaluation;
