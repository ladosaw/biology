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

  const normalizeOrganisms = (organisms) => {
    return organisms
      ?.split(", ")
      .map((org) => {
        const lowerOrg = org.toLowerCase();
        if (["corn", "carrots"].includes(lowerOrg)) return "grass";
        if (["rabbits", "grasshopper"].includes(lowerOrg)) return "rat";
        if (["fox", "python"].includes(lowerOrg)) return "owl";
        return lowerOrg;
      })
      .join(", ");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const combinedData = formData.tableData.reduce(
        (acc, row, index) => {
          acc[`trophicLevel${index}`] = row.trophicLevel?.toLowerCase();
          acc[`organisms${index}`] = normalizeOrganisms(row.organisms);
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

      console.log("Submitted Data:", combinedData);
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
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
                      value={row.trophicLevel}
                      onChange={(e) =>
                        handleInputChange(
                          "tableData",
                          "trophicLevel",
                          e.target.value,
                          index
                        )
                      }
                      placeholder="Enter Trophic Level"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
                      value={row.organisms}
                      onChange={(e) =>
                        handleInputChange(
                          "tableData",
                          "organisms",
                          e.target.value,
                          index
                        )
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
                    <input
                      type="text"
                      value={formData.guideQuestions[key]}
                      onChange={(e) =>
                        handleInputChange("guideQuestions", key, e.target.value)
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter answer"
                    />
                  </li>
                ))}
              </ol>
            </li>
            <li>
              What happens to the biomass amount from the bottom to the top of
              the pyramid?
              <input
                type="text"
                value={formData.guideQuestions.biomassChange}
                onChange={(e) =>
                  handleInputChange(
                    "guideQuestions",
                    "biomassChange",
                    e.target.value
                  )
                }
                className="mt-2 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter answer"
              />
            </li>
          </ol>
        </div>
      </div>

      <LoadingButton
        variant="contained"
        color="primary"
        sx={{ mt: 6, width: "100%", maxWidth: "200px" }}
        loading={isLoading}
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
    </div>
  );
};

export default Worksheet4;
