import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../../utils/api/api";
import { MitosisQuestions } from "../ConstantMitosis";
import FiveMinuteTimer from "../../../../components/timer/FiveMinuteTimer.jsx";

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
    setAnswers({ ...answers, [id]: value.toLowerCase() });
    setInvalidQuestions(invalidQuestions.filter((qid) => qid !== id));
  };

  const inputAnswersData = () => {
    return MitosisQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      answer: answers[q.id]?.trim() || "",
    }));
  };

  const handleReset = () => {
    setAnswers({});
    setInvalidQuestions([]);
    setSubmitDate(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Validate all answers
      const unanswered = MitosisQuestions.filter((q) => {
        const answer = answers[q.id];
        return !answer || answer.trim() === "";
      }).map((q) => q.id);

      if (unanswered.length > 0) {
        setInvalidQuestions(unanswered);
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
                     ${result.user_answer} - ${
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
      <FiveMinuteTimer onSubmit={handleSubmit} initialTime={600} />
      <h1 className="text-3xl font-bold text-center">Mitosis</h1>

      {MitosisQuestions.map((q) => (
        <div key={q.id} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <p
            className={`font-medium mb-2 ${
              invalidQuestions.includes(q.id) ? "text-red-500" : ""
            }`}
          >
            {`${q.id}. ${q.question}`}
          </p>

          <ul className="space-y-2">
            {q.choices.map((choice, index) => {
              const letter = choiceLetters[index];
              return (
                <li
                  key={index}
                  className={`flex items-center p-2 rounded-md ${
                    answers[q.id] === letter.toLowerCase() ? "" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={`${q.id}-${letter}`}
                    name={`question-${q.id}`}
                    value={letter.toLowerCase()}
                    checked={answers[q.id] === letter.toLowerCase()}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    className="mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor={`${q.id}-${letter}`}
                    className="cursor-pointer flex items-center"
                  >
                    <span className="font-bold mr-2">{letter}.</span>
                    {choice}
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
