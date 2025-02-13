import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../../../../utils/api/api.js";

const Worksheet2 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet2ModalOpen,
}) => {
  const activities = [
    "Cytokinesis and karyokinesis occur",
    "Cells grow, and organelles increase in number",
    "Chromosomes align at the equatorial plane",
    "DNA is replicated",
    "Two daughter cells are produced",
    "The period of growth",
    "The period of division",
    "The chromosomes are separated to the opposite pole",
    "The chromatin becomes double-stranded known as sister chromatids",
    "Consists of G1, S, and G2",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState(
    Array(activities.length).fill({ interphase: false, mitosis: false })
  );

  const handleCheckboxChange = (index, phase) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = {
        interphase:
          phase === "interphase" ? !prevAnswers[index].interphase : false,
        mitosis: phase === "mitosis" ? !prevAnswers[index].mitosis : false,
      };
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    try {
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

      const payloadObject = {};

      activities.forEach((_, index) => {
        if (answers[index].interphase) {
          payloadObject[index + 1] = "interphase";
        } else if (answers[index].mitosis) {
          payloadObject[index + 1] = "mitosis";
        }
      });

      const payload = {
        answer: [payloadObject],
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
        html: `
                <p><strong>Worksheet:</strong> ${worksheet.titles}</p>
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
      setIsModalWorksheet2ModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Worksheet 2</h1>
      <p className="mb-4">
        Complete the table by checking the correct column for each description
        of the cell cycle.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">
                Activity in the Cell
              </th>
              <th className="p-2 border border-gray-300">Interphase</th>
              <th className="p-2 border border-gray-300">Mitosis</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">{`${
                  index + 1
                }. ${activity}`}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    checked={answers[index].interphase}
                    onChange={() => handleCheckboxChange(index, "interphase")}
                  />
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    checked={answers[index].mitosis}
                    onChange={() => handleCheckboxChange(index, "mitosis")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          table {
            font-size: 14px;
          }
          input[type="checkbox"] {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Worksheet2;
