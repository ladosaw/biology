import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button, Divider } from "@mui/material";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";
import SubmitDatePicker from "../../../components/date-input/SubmitDatePicker.jsx";

const Worksheet2 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet2ModalOpen,
  setIsModalWorksheet3ModalOpenNext,
  setIsModalWorksheetModalOpenPrevious,
}) => {
  const [answers, setAnswers] = useState({
    genotypic: {},
    phenotypic: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);

  const handleInputChange = (section, key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleReset = () => {
    setAnswers({
      genotypic: {},
      phenotypic: {},
    });
    setSubmitDate(null);
  };

  const handleSubmit = async () => {
    try {
      const combinedAnswers = [{ ...answers.genotypic, ...answers.phenotypic }];
      setIsLoading(true);
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
        setIsModalWorksheet2ModalOpen(false);
        return;
      }

      const inputAnswer = crosses.map((cross, i) => ({
        question: cross,
        answer: `Genotypic: ${
          answers.genotypic[`genotypic${i}`] || ""
        }, Phenotypic: ${answers.phenotypic[`phenotypic${i}`] || ""}`,
      }));

      const payload = {
        answer: combinedAnswers,
        inputAnswer,
        user_id,
        titles,
        worksheet_no,
        submit_date: submitDate?.toISOString(),
        isLowerCase: false,
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
              setIsModalWorksheet3ModalOpenNext(true);
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
        text:
          error.response?.data?.message ||
          "An error occurred while submitting the answers.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
      setIsModalWorksheet2ModalOpen(false);
    }
  };

  const crosses = [
    "DD x DD",
    "DD x Dd",
    "DD x dd",
    "Dd x Dd",
    "Dd x dd",
    "dd x dd",
  ];

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">
        Mendelian Genetics Worksheet 2
      </h1>
      <p className="mb-6">
        Fill in the Genotypic and Phenotypic Ratios for each cross based on the
        given table.
      </p>

      {/* Table for larger screens */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 hidden sm:table">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Cross</th>
              <th className="border border-gray-300 p-2">
                Genotypic Percentage
              </th>
              <th className="border border-gray-300 p-2">
                Phenotypic Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            {crosses.map((cross, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {cross}
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    // value={answers[i].genotypic}
                    value={answers.genotypic[`genotypic${i}`] || ""}
                    onChange={(e) =>
                      // handleInputChange(i, "genotypic", e.target.value)
                      handleInputChange(
                        "genotypic",
                        "genotypic" + i,
                        e.target.value?.toLowerCase()
                      )
                    }
                    className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter genotypic ratio"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    // value={answers[i].phenotypic}
                    value={answers.phenotypic[`phenotypic${i}`] || ""}
                    onChange={(e) =>
                      // handleInputChange(i, "phenotypic", e.target.value)
                      handleInputChange(
                        "phenotypic",
                        "phenotypic" + i,
                        e.target.value?.toLowerCase()
                      )
                    }
                    className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phenotypic ratio"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive layout for small screens */}
      <div className="sm:hidden">
        {crosses.map((cross, i) => (
          <div key={i} className="mb-4 p-3 border rounded-lg bg-gray-50">
            <p className="font-medium text-lg">{cross}</p>
            <div className="mt-2">
              <label className="block text-sm font-semibold">
                Genotypic Percentage
              </label>
              <input
                type="text"
                // value={answers[i].genotypic}
                value={answers.genotypic[`genotypic${i}`] || ""}
                onChange={(e) =>
                  handleInputChange(
                    "genotypic",
                    "genotypic" + i,
                    e.target.value?.toLowerCase()
                  )
                }
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter genotypic ratio"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-semibold">
                Phenotypic Percentage
              </label>
              <input
                type="text"
                // value={answers[i].phenotypic}
                value={answers.phenotypic[`phenotypic${i}`] || ""}
                onChange={(e) =>
                  handleInputChange(
                    "phenotypic",
                    "phenotypic" + i,
                    e.target.value?.toLowerCase()
                  )
                }
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phenotypic ratio"
              />
            </div>
          </div>
        ))}
      </div>
      <Divider sx={{ mt: 4, width: "100%" }} />

      <div className="flex justify-end gap-4 mt-4">
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
