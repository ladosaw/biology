import React, { useState } from "react";
import { TextField, Box, Button, Typography, Grid, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../utils/api/api.js";

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
      console.error(error);
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

      {/* Display the worksheet answers */}
      <Grid container spacing={2}>
        {worksheet.answers.map((answer, index) => (
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
                variant="body2"
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  lineHeight: 1.5,
                }}
              >
                <strong>{`${index + 1}.`}</strong> {answer}
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
