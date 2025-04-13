import React, { useState } from "react";
import { TextField, Box, Button, Typography, Grid, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../utils/api/api.js";
import image from "../../src/assets/images/DigestiveWorksheet.png";
// Image imports
import Worksheet1A from "../../src/assets/images/WorksheetA1A.png";
import worksheetImageQuestion from "../../src/assets/images/Worksheet1b/mitosis_worksheet2.png";
import num1 from "../../src/assets/images/Worksheet1b/num1.png";
import num2 from "../../src/assets/images/Worksheet1b/num2.png";
import num3 from "../../src/assets/images/Worksheet1b/num3.png";
import num4 from "../../src/assets/images/Worksheet1b/num4.png";
import num5 from "../../src/assets/images/Worksheet1b/num5.png";
import num6 from "../../src/assets/images/Worksheet1b/num6.png";

const IMAGES = {
  worksheet1A: Worksheet1A,
  worksheetQuestion: worksheetImageQuestion,
  phases: [num1, num2, num3, num4, num5, num6],
};

const ManualCheck = ({ worksheet, fetchData, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(worksheet.score || "0");

  // Helper function to show Swal alerts
  const showAlert = (icon, title, text) => {
    Swal.fire({
      icon,
      title,
      text,
      confirmButtonColor: icon === "warning" ? "#f59e0b" : "#10B981", // Set color based on the icon
    });
  };

  // Helper function to handle the save operation
  const handleSave = async () => {
    if (score === "" || score === "0") {
      Swal.fire({
        icon: "warning",
        title: "Fill in the score",
        text: "Please enter the score before saving.",
        confirmButtonColor: "#f59e0b", // Yellow warning color
      });
      return;
    }

    try {
      setIsLoading(true);
      const authToken = localStorage.getItem("authToken");

      const response = await API.put(
        `/worksheets/score/${worksheet.worksheet_id}`,
        { score },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { message } = response.data;

      onClose(); // Close modal after saving
      Swal.fire({
        icon: "success",
        title: message || "Score Saved!",
        html: `<p><strong>Worksheet:</strong> ${worksheet.titles}</p>
                <p><strong>Worksheet No:</strong> ${worksheet.worksheet_no}</p>
                <p><strong>Your Score:</strong> ${score}</p>
                `,
        confirmButtonColor: "#10B981",
      });
      fetchData(); // Fetch updated data
    } catch (error) {
      showAlert("error", "Error", "An error occurred while saving the score.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        Manually Check Worksheet
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          mb: 1,
          fontSize: { xs: "1rem", md: "1.2rem" },
        }}
      >
        {worksheet.titles}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          fontSize: { xs: "0.9rem", md: "1rem" },
          color: "text.secondary",
        }}
      >
        {`Worksheet No. ${worksheet.worksheet_no}`}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 2,
          fontSize: { xs: "0.9rem", md: "1rem" },
          color: "text.secondary",
        }}
      >
        {`Student: ${worksheet.user.lname}, ${worksheet.user.fname} ${
          worksheet.user?.mname || ""
        }`}
      </Typography>

      {worksheet.lesson_key === "lesson1" && worksheet.worksheet_no === 1 && (
        <Box sx={{ position: "relative", width: "100%", maxWidth: "960px" }}>
          <img
            src={image}
            alt="Digestive System"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      )}

      {worksheet.lesson_key === "lesson2" && worksheet.worksheet_no === 1 && (
        <>
          <Box sx={{ position: "relative", width: "100%", mt: 2 }}>
            <div className="flex flex-col lg:flex-row gap-8">
              <img
                src={IMAGES.worksheet1A}
                alt="Cell Cycle Diagram"
                className="w-auto rounded-lg shadow-md"
              />
              <img
                src={IMAGES.worksheetQuestion}
                alt="Cell Cycle Diagram"
                className="w-auto mt-4 rounded-lg shadow-md"
              />
            </div>
          </Box>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            {IMAGES.phases.map((src, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={src}
                  alt={`Mitosis phase ${index + 1}`}
                  className="w-full h-32 object-contain mb-4"
                />
                <p>{`Phase ${index + 1}`}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Display the worksheet questions with answers */}
      <Grid container spacing={2}>
        {worksheet.answers.map((data, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                boxShadow: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                {data.question || `Question ${index + 1}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  color: "text.secondary",
                }}
              >
                {`Answer: ${data.answer}` || "No answer provided"}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Score input */}
      <Box sx={{ mt: 3 }}>
        <TextField
          label="Score"
          variant="outlined"
          fullWidth
          value={score}
          onChange={(e) => setScore(e.target.value)}
          type="number"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              height: "45px",
            },
          }}
        />
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            width: "48%",
            backgroundColor: "#f0f0f0",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
            padding: { xs: "8px 12px", md: "10px 20px" },
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={handleSave}
          loading={isLoading}
          sx={{
            width: "48%",
            padding: { xs: "8px 12px", md: "10px 20px" },
            "&:hover": {
              backgroundColor: "#3f51b5",
            },
          }}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ManualCheck;
