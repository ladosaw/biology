import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import image from "../../../../assets/images/DigestiveWorksheet.png";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { WorksheetsQuestion1 } from "./ConstantDigestive.jsx";
import TextField from "../../../../components/TextField/TextField.jsx";

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
        bgcolor: "primary.main",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
        cursor: "pointer",
        "&:hover": { bgcolor: "primary.dark" },
        transition: "all 0.2s ease",
        border: isSelected ? "2px solid blue" : "none",
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

const Worksheet = () => {
  const [assigned, setAssigned] = useState({});
  const [availableOrgans, setAvailableOrgans] = useState(initialOrgans);
  const [selectedOrgan, setSelectedOrgan] = useState(null); // Track selected organ
  const [submittedAnswers, setSubmittedAnswers] = useState(false); // Track submission status

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

  const handleSubmit = () => {
    // Collect all the assigned answers
    const answers = Object.keys(assigned).map((key) => ({
      dropZone: key,
      organ: assigned[key],
    }));
    console.log("Submitted Answers: ", answers);
    setSubmittedAnswers(true);
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

        {/* Submit Button */}
        {/* {!submittedAnswers && (
          <Button
            sx={{ mt: 4 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit Answers
          </Button>
        )}
        {submittedAnswers && (
          <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
            Answers Submitted Successfully!
          </Typography>
        )} */}
      </Box>

      <Box
        sx={{ borderTop: 1, borderColor: "divider", p: 3, textAlign: "center" }}
      >
        <Typography variant="body1" color="textSecondary" paragraph>
          <strong>B. Directions:</strong> Read the sentences below, then write
          the number of events in the digestion process. Write numbers 1-8
          before the sentences.
        </Typography>

        {WorksheetsQuestion1.map((question, index) => (
          <TextField key={index} label={question} />
        ))}
      </Box>
    </DndProvider>
  );
};

export default Worksheet;
