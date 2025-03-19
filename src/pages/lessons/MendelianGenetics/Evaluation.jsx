import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../../../utils/api/api";
import { mendelianGeneticsQuestions } from "./ConstantData";
import FiveMinuteTimer from "../../../components/timer/FiveMinuteTimer.jsx";

const Evaluation = ({ titles, worksheet_no, setEvaluationOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});

  const [invalidQuestions, setInvalidQuestions] = useState([]); // Track unanswered questions

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value.toLowerCase() });
    setInvalidQuestions(invalidQuestions.filter((qid) => qid !== id)); // Remove from invalid state if answered
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
      <h1 className="text-3xl font-bold text-center">
        Mandellian Genetics Evaluation
      </h1>
      <FiveMinuteTimer onSubmit={handleSubmit} initialTime={600} />
      {mendelianGeneticsQuestions.map((q) => (
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

      <LoadingButton
        variant="contained"
        color="primary"
        sx={{
          mt: 4,
          ml: "auto", // This will push the button to the right
          display: "block", // Ensures the button takes up its own line
        }}
        loading={isLoading}
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
    </div>
  );
};

export default Evaluation;
