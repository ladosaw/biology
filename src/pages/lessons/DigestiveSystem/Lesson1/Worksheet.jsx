import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import Swal from "sweetalert2";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import image from "../../../../assets/images/DigestiveWorksheet.png";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { WorksheetsQuestion1 } from "./ConstantDigestive.jsx";
import API from "../../../../utils/api/api.js";

const HTML5toTouch = {
  backends: [
    { backend: HTML5Backend },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      transition: TouchTransition,
    },
  ],
};

const initialOrgans = [
  "Mouth",
  "Esophagus",
  "Stomach",
  "Liver",
  "Pancreas",
  "Small Intestine",
  "Large Intestine",
  "Rectum",
  "Anus",
  "Gallbladder",
];

const Organ = ({ name, onSelect, isSelected }) => {
  return (
    <Box
      sx={{
        p: 1.5,
        color: "#353434",
        fontWeight: "bold",
        borderRadius: "8px",
        cursor: "pointer",
        "&:hover": { bgcolor: "#E0E6F7" },
        transition: "all 0.2s ease",
        border: isSelected ? "2px solid #353434" : "none",
      }}
      onClick={() => onSelect(name)} // Tap to select
    >
      {name}
    </Box>
  );
};

const DropBox = ({ id, onDrop, organ, onTapDrop }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "60px",
        border: "2px dashed",
        borderColor: organ ? "success.main" : "text.disabled",
        bgcolor: organ ? "success.light" : "background.paper",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        fontWeight: "medium",
        cursor: "pointer",
      }}
      onClick={() => onTapDrop(id)} // Tap to drop
    >
      {organ === undefined ? `${id}. Drop here` : `${id}. ${organ}`}
    </Paper>
  );
};

const Worksheet = ({ titles, worksheet_no, setIsModalWorksheetModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assigned, setAssigned] = useState({});
  const [availableOrgans, setAvailableOrgans] = useState(initialOrgans);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [textFieldAnswers, setTextFieldAnswers] = useState(
    new Array(WorksheetsQuestion1.length).fill("")
  );

  const handleDrop = (id, organName) => {
    const previousOrgan = assigned[id];
    if (previousOrgan) {
      setAvailableOrgans((prev) => [...prev, previousOrgan]);
    }

    setAssigned((prev) => ({ ...prev, [id]: organName }));
    setAvailableOrgans((prev) => prev.filter((organ) => organ !== organName));
  };

  const handleSelect = (name) => {
    setSelectedOrgan(name); // Set the selected organ
  };

  const handleTapDrop = (id) => {
    if (selectedOrgan) {
      handleDrop(id, selectedOrgan); // Drop the selected organ into the drop zone
      setSelectedOrgan(null); // Reset selected organ after drop
    }
  };

  const handleTextFieldChange = (index, value) => {
    const updatedAnswers = [...textFieldAnswers];
    updatedAnswers[index] = value;
    setTextFieldAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Combine drag-and-drop and text answers into a single object
      const answers = {};

      // Add drag-and-drop answers
      Object.keys(assigned).forEach((key) => {
        answers[key] = assigned[key]; // Assign organ name
      });

      // Add text-based answers
      WorksheetsQuestion1.forEach((question, index) => {
        const questionId = index + 1 + Object.keys(assigned).length; // Ensure unique ID
        answers[questionId] = textFieldAnswers[index]; // Assign text answer
      });

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
        setIsModalWorksheetModalOpen(false);
        return;
      }

      const payload = {
        answer: [answers],
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

      setIsModalWorksheetModalOpen(false);
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
      setIsLoading(false);
      setIsModalWorksheetModalOpen(false);
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
      setIsModalWorksheetModalOpen(false);
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Box
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          WORKSHEET # 1: FILL ME UP
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          <strong>A. Directions:</strong> Below is the image of the Digestive
          System. Write the names of the organs from the box below.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mb: 4,
          }}
        >
          {availableOrgans.map((organ) => (
            <Organ
              key={organ}
              name={organ}
              onSelect={handleSelect}
              isSelected={selectedOrgan === organ} // Highlight selected organ
            />
          ))}
        </Box>

        <Box sx={{ position: "relative", width: "100%", maxWidth: "960px" }}>
          <img
            src={image}
            alt="Digestive System"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        <Grid container spacing={2} sx={{ justifyContent: "center", mt: 2 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <DropBox
                id={index + 1}
                onDrop={handleDrop}
                organ={assigned[index + 1]}
                onTapDrop={handleTapDrop} // Handle tap to drop
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ p: 3, textAlign: "center", maxWidth: 600, mx: "auto" }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Worksheet {worksheet_no}: {titles}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          B. Direction: Read the sentences below, then write the number of
          events in the digestion process. Write numbers 1-8 before the
          sentences.
        </Typography>
        {WorksheetsQuestion1.map((data, index) => (
          <Box key={data.id} sx={{ textAlign: "left", mb: 2 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              {data.question}
            </Typography>
            <TextField
              value={textFieldAnswers[index]}
              onChange={(e) => handleTextFieldChange(index, e.target.value)}
              fullWidth
              multiline
              rows={3}
              margin="normal"
              variant="outlined"
              sx={{ minWidth: "100%" }}
            />
          </Box>
        ))}
      </Box>

      <Divider sx={{ mt: 4 }} />

      <LoadingButton
        sx={{
          mt: 4,
          ml: "auto", // This will push the button to the right
          display: "block", // Ensures the button takes up its own line
        }}
        variant="contained"
        color="primary"
        loading={isLoading}
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
    </DndProvider>
  );
};

export default Worksheet;
