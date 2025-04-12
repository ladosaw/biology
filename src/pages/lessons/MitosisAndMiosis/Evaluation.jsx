import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../utils/api/api";
import { MiosisWorksheetsEvaluationQuestions } from "./ConstantData";
import numberSeven from "../../../assets/images/numberSeven.png";
import letterA from "../../../assets/images/letterA.png";
import letterB from "../../../assets/images/letterB.png";
import letterC from "../../../assets/images/letterC.png";
import letterD from "../../../assets/images/letterD.png";
import FiveMinuteTimer from "../../../components/timer/FiveMinuteTimer.jsx";

const Evaluation = ({ titles, worksheet_no, setEvaluationOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [invalidQuestions, setInvalidQuestions] = useState([]);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value.toLowerCase() });
    setInvalidQuestions(invalidQuestions.filter((qid) => qid !== id)); // Remove from invalid state if answered
  };

  const inputAnswersData = () => {
    return MiosisWorksheetsEvaluationQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      answer: answers[q.id] || "", // Now using untrimmed value since we trim on change
    }));
  };

  const handleReset = () => {
    setAnswers({});
    setInvalidQuestions([]);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (Object.keys(answers).length !== 10) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Answers",
          text: "Please Answer all questions before submitting.",
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

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Meiosis</h1>
      <FiveMinuteTimer onSubmit={handleSubmit} initialTime={600} />
      <p>
        Direction: Read and understand each question, then choose the correct
        answer. Write the letter of your choice in the box before each number.
      </p>
      {MiosisWorksheetsEvaluationQuestions.map((q) => (
        <div key={q.id} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          {q.id === 8 && (
            <>
              <h1 className="text-lg font-bold mb-4 text-gray-700">
                For item 8, refer to the table below.
              </h1>
              <div className="overflow-x-auto mb-9">
                <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-blue-500 text-white text-left">
                      <th className="px-6 py-3 border border-blue-600">
                        Basis for Comparison
                      </th>
                      <th className="px-6 py-3 border border-blue-600">
                        Mitosis
                      </th>
                      <th className="px-6 py-3 border border-blue-600">
                        Meiosis
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="hover:bg-blue-100 transition-all duration-200">
                      <td className="px-6 py-3 border border-gray-300">
                        Number of Daughter Cells
                      </td>
                      <td className="px-6 py-3 border border-gray-300">2</td>
                      <td className="px-6 py-3 border border-gray-300"></td>
                    </tr>
                    <tr className="bg-gray-100 hover:bg-blue-100 transition-all duration-200">
                      <td className="px-6 py-3 border border-gray-300">
                        Chromosome Number
                      </td>
                      <td className="px-6 py-3 border border-gray-300">
                        2N (Diploid)
                      </td>
                      <td className="px-6 py-3 border border-gray-300"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

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

          {q.id === 7 && (
            <div className="flex justify-center mt-4">
              <img
                src={numberSeven}
                alt="Seven"
                className="w-52 h-20 md:w-96 md:h-24 p-2 rounded-lg shadow-lg border border-gray-200"
              />
            </div>
          )}

          {q.id === 10 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {[
                {
                  img: letterA,
                  letter: "A",
                  width: "w-100 md:w-[240px]",
                  height: "h-13 md:h-[90px]",
                },
                {
                  img: letterB,
                  letter: "B",
                  width: "w-100 md:w-[240px]",
                  height: "h-15 md:h-[90px]",
                },
                {
                  img: letterC,
                  letter: "C",
                  width: "w-100 md:w-56",
                  height: "h-28 md:h-40",
                },
                {
                  img: letterD,
                  letter: "D",
                  width: "w-100 md:w-[240px]",
                  height: "h-45 md:h-[300px]",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <p className="text-lg font-bold">{item.letter}</p>
                  <img
                    src={item.img}
                    alt={`Choice ${item.letter}`}
                    className={`${item.width} ${item.height}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <ul className="mt-2 pl-6">
              {q.choices.map((choice, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{choice}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <div className="flex justify-end gap-4 mt-4">
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          disabled={isLoading}
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
