import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";

const Worksheet3 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet3ModalOpen,
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
        setIsModalWorksheet3ModalOpen(false);
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
      const { score, worksheet } = response.data;
      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        html: `<p><strong>Worksheet:</strong> ${worksheet.titles}</p>
                            <p><strong>Worksheet No:</strong> ${worksheet.worksheet_no}</p>
                            <p><strong>Your Score:</strong> ${score}</p>
                          `,
        confirmButtonColor: "#10B981",
      }).then(() => {
        navigate("/lessons");
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
      setIsModalWorksheet3ModalOpen(false);
    }
  };

  const crosses = [
    "1. Decomposer",
    "2. Energy Source",
    "3. Primary Consumer",
    "4. Producer",
    "5. Secondary Consumer",
    "6. Tertiary Consumer",
  ];

  const crossess = [
    "A. Bacteria",
    "B. Hawk",
    "C. Rat",
    "D. Rice Plant",
    "E. Snake",
    "F. Sunlight ",
  ];

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">Worksheet No. 3: Who Am I?</h1>
      <p className="mb-6">
        Direction: Determine the role of organism in the trophic level. Write
        your answer on the second column ex. Decomposer
      </p>

      {/* Table for larger screens */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300 hidden sm:table">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Column A</th>
              <th className="border border-gray-300 p-2">Column B</th>
            </tr>
          </thead>
          <tbody>
            {crossess.map((cross, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {cross}
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
                    placeholder="Enter Answer"
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
            <p className="font-medium text-lg">{crossess[i]}</p>

            <div className="mt-2">
              <input
                type="text"
                onChange={(e) =>
                  handleInputChange(
                    "phenotypic",
                    "phenotypic" + i,
                    e.target.value?.toLowerCase()
                  )
                }
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Answer"
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

export default Worksheet3;
