import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../../utils/api/api.js";
import SubmitDatePicker from "../../../../components/date-input/SubmitDatePicker.jsx";

// Image imports
import Worksheet1A from "../../../../assets/images/WorksheetA1A.png";
import worksheetImageQuestion from "../../../../assets/images/Worksheet1b/mitosis_worksheet2.png";
import num1 from "../../../../assets/images/Worksheet1b/num1.png";
import num2 from "../../../../assets/images/Worksheet1b/num2.png";
import num3 from "../../../../assets/images/Worksheet1b/num3.png";
import num4 from "../../../../assets/images/Worksheet1b/num4.png";
import num5 from "../../../../assets/images/Worksheet1b/num5.png";
import num6 from "../../../../assets/images/Worksheet1b/num6.png";

const IMAGES = {
  worksheet1A: Worksheet1A,
  worksheetQuestion: worksheetImageQuestion,
  phases: [num1, num2, num3, num4, num5, num6],
};

const QUESTIONS = [
  "What stage of mitosis when chromosomes move to the middle of the cell?",
  "When are chromosomes separate?",
  "How many daughter cells are produced during mitosis division?",
];

const Worksheet = ({
  titles,
  worksheet_no,
  setIsModalWorksheetModalOpen,
  setIsModalWorksheet2ModalOpenNext,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);
  const [answers, setAnswers] = useState({
    labels: Array(10).fill(""),
    phases: Array(6).fill(""),
    questions: Array(3).fill(""),
  });

  const handleInputChange = (section, index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? value.toLowerCase() : item
      ),
    }));
  };
  const handleReset = () => {
    setAnswers({
      labels: Array(10).fill(""),
      phases: Array(6).fill(""),
      questions: Array(3).fill(""),
    });
    setSubmitDate(null);
  };

  const constructPayload = () => {
    const labelAnswers = answers.labels.map((answer, index) => ({
      id: String.fromCharCode(65 + index),
      question: `Label the cell cycle part: Label ${String.fromCharCode(
        65 + index
      )}`,
      answer,
    }));

    const phaseAnswers = answers.phases.map((answer, index) => ({
      id: `Phase${index + 1}`,
      question: `Identify mitosis phase: Phase${index + 1}`,
      answer,
    }));

    const questionAnswers = answers.questions.map((answer, index) => ({
      id: `Q${index + 1}`,
      question: QUESTIONS[index],
      answer,
    }));

    return [...labelAnswers, ...phaseAnswers, ...questionAnswers];
  };

  const createLegacyAnswerObject = () => {
    const labelsObject = answers.labels.reduce((acc, answer, index) => {
      acc[String.fromCharCode(65 + index)] = answer;
      return acc;
    }, {});

    const phasesObject = answers.phases.reduce((acc, answer, index) => {
      acc[`Phase${index + 1}`] = answer;
      return acc;
    }, {});

    const questionsObject = answers.questions.reduce((acc, answer, index) => {
      acc[`question${index + 1}`] = answer;
      return acc;
    }, {});

    return [
      {
        ...labelsObject,
        ...phasesObject,
        ...questionsObject,
      },
    ];
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonColor: "#dc2626",
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        showErrorAlert("You are not logged in. Please log in again.");
        return;
      }

      const response = await API.post(
        "/worksheets/checker",
        {
          answer: createLegacyAnswerObject(),
          inputAnswer: constructPayload(),
          user_id: localStorage.getItem("id"),
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
              <span class="result ${
                result.is_correct ? "correct" : "incorrect"
              }">
                ${result.user_answer} -
                ${result.is_correct ? "Correct ✔️" : "Incorrect ❌"}
              </span>
            </div>
          `
            )
            .join("")}
    
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
          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              Swal.close();
              setIsModalWorksheet2ModalOpenNext(true);
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
      setIsModalWorksheetModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Labeling Section */}
      <section className="mb-12">
        <h1 className="text-2xl font-bold mb-4">
          Activity 1a: Label the Cell Cycle
        </h1>
        <p className="text-gray-600 mb-6">
          Label the sequence of events in cell cycle represented by letters.
          Write only the name of event on the box. (Please refer to the table
          below containing letters that correspond to the events and
          description)
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img
              src={IMAGES.worksheet1A}
              alt="Cell Cycle Diagram"
              className="w-full rounded-lg shadow-md"
            />
            <img
              src={IMAGES.worksheetQuestion}
              alt="Cell Cycle Diagram"
              className="w-full mt-4 rounded-lg shadow-md"
            />
          </div>

          <div className="lg:w-1/2 space-y-4">
            {answers.labels.map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <label className="font-semibold w-8">
                  {String.fromCharCode(65 + index)}:
                </label>
                <input
                  type="text"
                  placeholder={`Enter label ${String.fromCharCode(65 + index)}`}
                  className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    handleInputChange("labels", index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitosis Phases Section */}
      <section className="mb-12">
        <h1 className="text-2xl font-bold mb-4">Activity 1b: Name Me</h1>
        <p className="text-gray-600 mb-6">
          Label each stage/phase of mitosis in the animal cell.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMAGES.phases.map((src, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={src}
                alt={`Mitosis phase ${index + 1}`}
                className="w-full h-32 object-contain mb-4"
              />
              <input
                type="text"
                placeholder={`Phase ${index + 1}`}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  handleInputChange("phases", index, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Questions Section */}
      <section className="bg-gray-50 p-6 rounded-xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Guide Questions</h2>
          <div className="space-y-6">
            {answers.questions.map((_, index) => (
              <div key={index}>
                <label className="block font-medium mb-2">
                  {index + 1}. {QUESTIONS[index]}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your answer"
                  onChange={(e) =>
                    handleInputChange("questions", index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default Worksheet;
