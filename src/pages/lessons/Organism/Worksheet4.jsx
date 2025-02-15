import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";
import pyramid from "../../../assets/images/pyramid.png";

const Worksheet4 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet4ModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState(
    Array(4).fill({ trophicLevel: "", organisms: "" })
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index] = { ...newData[index], [field]: value };
    setTableData(newData);
  };

  const normalizeOrganisms = (organisms) => {
    return organisms
      .split(", ")
      .map((org) => {
        org = org.toLowerCase();
        if (org === "corn" || org === "carrots") return "grass";
        if (org === "rabbits" || org === "grasshopper") return "rat";
        if (org === "fox" || org === "python") return "owl";
        return org;
      })
      .join(", ");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const combinedData = tableData.reduce((acc, row, index) => {
        acc[`trophicLevel${index}`] = row.trophicLevel.toLowerCase();
        acc[`organisms${index}`] = normalizeOrganisms(row.organisms);
        return acc;
      }, {});

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

      const payload = {
        answer: [combinedData],
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

      console.log(combinedData);
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
    <div className="flex flex-col items-center justify-center px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-2">
        Worksheet No. 4: FOOD PYRAMID
      </h1>
      <p className="text-center text-gray-700 mb-4 max-w-lg">
        Direction: Identify the trophic level of the given organisms. Write your
        answer in the text fields.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 w-full max-w-4xl">
        <img
          src={pyramid}
          alt="Food Pyramid"
          className="w-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md"
        />
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Trophic Level</th>
                <th className="border p-2">Organisms</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={row.trophicLevel}
                      onChange={(e) =>
                        handleInputChange(index, "trophicLevel", e.target.value)
                      }
                      placeholder="Enter Trophic Level"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={row.organisms}
                      onChange={(e) =>
                        handleInputChange(index, "organisms", e.target.value)
                      }
                      placeholder="Enter Organisms"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
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

export default Worksheet4;
