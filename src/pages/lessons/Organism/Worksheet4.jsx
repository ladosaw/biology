import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";
import pyramid from "../../../assets/images/pyramid.png";
import SubmitDatePicker from "../../../components/date-input/SubmitDatePicker.jsx";

const Worksheet4 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet4ModalOpen,
  setIsModalWorksheet3ModalOpenPrevious,
  setEvaluationOpenNext,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);
  const [formData, setFormData] = useState({
    tableData: Array(4).fill({ trophicLevel: "", organisms: "" }),
    guideQuestions: {
      greatestBiomass: "",
      greatestEnergy: "",
      leastBiomass: "",
      energyGainedByOwl: "",
      biomassReceivedByEagle: "",
      biomassChange: "",
    },
  });

  const handleInputChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      if (section === "tableData") {
        const updatedTableData = [...prev.tableData];
        updatedTableData[index] = {
          ...updatedTableData[index],
          [field]: value,
        };
        return { ...prev, tableData: updatedTableData };
      } else if (section === "guideQuestions") {
        return {
          ...prev,
          guideQuestions: { ...prev.guideQuestions, [field]: value },
        };
      }
      return prev;
    });
  };

  const handleReset = () => {
    setFormData({
      tableData: Array(4).fill({ trophicLevel: "", organisms: "" }),
      guideQuestions: {
        greatestBiomass: "",
        greatestEnergy: "",
        leastBiomass: "",
        energyGainedByOwl: "",
        biomassReceivedByEagle: "",
        biomassChange: "",
      },
    });
    setSubmitDate(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const combinedData = formData.tableData.reduce(
        (acc, row, index) => {
          acc[`trophicLevel${index}`] = row.trophicLevel?.toLowerCase();
          acc[`organisms${index}`] = row.organisms?.toLowerCase();
          return acc;
        },
        { ...formData.guideQuestions }
      );

      const user_id = localStorage.getItem("id");
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
          confirmButtonColor: "#dc2626",
        });
        setIsLoading(false);
        setIsModalWorksheet4ModalOpen(false);
        return;
      }

      const inputAnswer = [];

      // Format table data answers
      formData.tableData.forEach((row, index) => {
        inputAnswer.push({
          question: `Trophic Level ${index + 1}`,
          answer: row.trophicLevel,
        });
        inputAnswer.push({
          question: `Organisms ${index + 1}`,
          answer: row.organisms,
        });
      });

      // Format guide question answers
      const guideQuestionLabels = {
        greatestBiomass: "Organism with greatest biomass",
        greatestEnergy: "Organism with greatest energy",
        leastBiomass: "Organism with least biomass",
        energyGainedByOwl: "% Energy gained by owl",
        biomassReceivedByEagle: "Biomass received by eagle",
        biomassChange: "Biomass change from bottom to top of pyramid",
      };

      Object.entries(formData.guideQuestions).forEach(([key, value]) => {
        inputAnswer.push({
          question: guideQuestionLabels[key] || key,
          answer: value,
        });
      });

      const payload = {
        answer: [combinedData],
        inputAnswer,
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

      // Extracting score and worksheet details
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
      setIsModalWorksheet4ModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-2">
        Activity 4: FOOD PYRAMID
      </h1>
      <p className="text-center text-gray-700 mb-4 max-w-lg mx-auto">
        Direction: Look at food pyramid diagram. For each level identify the
        trophic level, the list the organisms from left to right as they appear
        in diagram. Type your answer in text field, then click submit.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 w-full max-w-4xl">
        <img
          src={pyramid}
          alt="Food Pyramid"
          className="w-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-md"
        />
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border border-gray-300 text-center rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Trophic Level</th>
                <th className="border p-2">Organisms</th>
              </tr>
            </thead>
            <tbody>
              {formData.tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <textarea
                      className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
                      value={row.trophicLevel}
                      onChange={(e) =>
                        handleInputChange(
                          "tableData",
                          "trophicLevel",
                          e.target.value?.toLowerCase(),
                          index
                        )
                      }
                      placeholder="Enter Trophic Level"
                      rows="3"
                    />
                  </td>
                  <td className="border p-2">
                    <textarea
                      className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
                      value={row.organisms}
                      onChange={(e) =>
                        handleInputChange(
                          "tableData",
                          "organisms",
                          e.target.value?.toLowerCase(),
                          index
                        )
                      }
                      placeholder="Enter Organisms"
                      rows="3"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 mx-auto mt-6 w-full max-w-4xl">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-xl text-gray-700 mb-4">
            Guide Questions
          </h2>
          <ol className="list-decimal pl-6 text-gray-800 space-y-4">
            <li>
              Which organism has the:
              <ol className="list-lower-alpha pl-6 mt-2 space-y-2">
                {[
                  "greatestBiomass",
                  "greatestEnergy",
                  "leastBiomass",
                  "energyGainedByOwl",
                  "biomassReceivedByEagle",
                ].map((key) => (
                  <li key={key} className="lg:flex lg:items-center lg:gap-2">
                    <span className="capitalize whitespace-nowrap">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                    </span>
                    <textarea
                      value={formData.guideQuestions[key]}
                      onChange={(e) =>
                        handleInputChange(
                          "guideQuestions",
                          key,
                          e.target.value?.toLowerCase()
                        )
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 sm:w-full"
                      placeholder="Enter answer"
                      rows="4"
                    />
                  </li>
                ))}
              </ol>
            </li>
            <li>
              What happens to the biomass amount from the bottom to the top of
              the pyramid?
              <textarea
                value={formData.guideQuestions.biomassChange}
                onChange={(e) =>
                  handleInputChange(
                    "guideQuestions",
                    "biomassChange",
                    e.target.value?.toLowerCase()
                  )
                }
                className="mt-2 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter answer"
                rows="4"
              />
            </li>
          </ol>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
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

export default Worksheet4;
