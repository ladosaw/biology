import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";

const Worksheet2 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet2ModalOpen,
}) => {
  const [answers, setAnswers] = useState({
    genotypic: {},
    phenotypic: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [answers, setAnswers] = useState(
  //   Array(6).fill({ genotypic: "", phenotypic: "" })
  // );

  // const handleInputChange = (index, type, value) => {
  //   const updatedAnswers = answers.map((answer, i) =>
  //     i === index ? { ...answer, [type]: value } : answer
  //   );
  //   setAnswers(updatedAnswers);
  // };

  const handleInputChange = (section, key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
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

      const payload = {
        answer: combinedAnswers,
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

      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        html: `
              <p><strong>Worksheet:</strong> ${worksheet.titles}</p>
                     <p><strong>Worksheet No:</strong> ${
                       worksheet.worksheet_no
                     }</p>
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
                Genotypic Ratio
              </label>
              <input
                type="text"
                // value={answers[i].genotypic}
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
                Phenotypic Ratio
              </label>
              <input
                type="text"
                // value={answers[i].phenotypic}
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

      <div className="mt-4 flex justify-end">
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
    </div>
  );
};

export default Worksheet2;
