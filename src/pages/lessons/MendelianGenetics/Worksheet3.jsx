import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import Swal from "sweetalert2";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MendelianGeneticsWorksheetsLink } from "./ConstantData.jsx";
import three from "../../../assets/images/3x3.png";

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
  { id: 1, name: "P" },
  { id: 2, name: "P" },
  { id: 3, name: "p" },
  { id: 4, name: "Pp" },
  { id: 5, name: "Pp" },
  { id: 6, name: "p" },
  { id: 7, name: "Pp" },
  { id: 8, name: "Pp" },
];

const Organ = ({ id, name, onSelect, isSelected }) => {
  return (
    <Box
      sx={{
        p: 2,
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "12px",
        cursor: "pointer",
        bgcolor: isSelected ? "primary.main" : "background.paper",
        color: isSelected ? "#fff" : "#353434",
        border: "2px solid",
        borderColor: isSelected ? "primary.dark" : "#ccc",
        transition: "all 0.2s ease",
        "&:hover": { bgcolor: "#E0E6F7" },
      }}
      onClick={() => onSelect(id)}
    >
      {name}
    </Box>
  );
};

const DropBox = ({ id, organ, onTapDrop }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "70px",
        border: "2px dashed",
        borderColor: organ ? "success.main" : "text.disabled",
        bgcolor: organ ? "success.light" : "background.paper",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        fontWeight: "bold",
        fontSize: "1.1rem",
        cursor: "pointer",
        textAlign: "center",
        p: 2,
      }}
      onClick={() => onTapDrop(id)}
    >
      {organ ? organ.name : `Number ${id}`}
    </Paper>
  );
};

const Worksheet3 = ({ titles, worksheet_no, setIsModalWorksheetModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assigned, setAssigned] = useState({});
  const [availableOrgans, setAvailableOrgans] = useState(initialOrgans);
  const [selectedOrganId, setSelectedOrganId] = useState(null);

  const handleSelect = (id) => {
    setSelectedOrganId(id);
  };

  const handleTapDrop = (dropId) => {
    if (selectedOrganId !== null) {
      const organ = availableOrgans.find((o) => o.id === selectedOrganId);
      if (organ) {
        setAssigned((prev) => ({ ...prev, [dropId]: organ }));
        setAvailableOrgans((prev) =>
          prev.filter((o) => o.id !== selectedOrganId)
        );
        setSelectedOrganId(null);
      }
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted");
  };

  // const handleSubmit = async () => {
  //   try {
  //     setIsLoading(true);
  //     // Ensure all organs are placed
  //     if (Object.keys(assigned).length !== 10) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Incomplete Answers",
  //         text: "Please place all digestive organs before submitting.",
  //         confirmButtonColor: "#f59e0b", // Yellow warning color
  //       });
  //       return;
  //     }

  //     // Ensure all text fields are filled
  //     if (textFieldAnswers.some((answer) => answer.trim() === "")) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Incomplete Answers",
  //         text: "Please answer all text fields before submitting.",
  //         confirmButtonColor: "#f59e0b",
  //       });
  //       return;
  //     }

  //     // Combine drag-and-drop and text answers into a single object
  //     const answers = {};

  //     // Add drag-and-drop answers
  //     Object.keys(assigned).forEach((key) => {
  //       answers[key] = assigned[key]; // Assign organ name
  //     });

  //     // Add text-based answers
  //     MendelianGeneticsWorksheetsLink.forEach((question, index) => {
  //       const questionId = index + 1 + Object.keys(assigned).length; // Ensure unique ID
  //       answers[questionId] = textFieldAnswers[index]; // Assign text answer
  //     });

  //     const user_id = localStorage.getItem("id");
  //     const authToken = localStorage.getItem("authToken");

  //     if (!authToken) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Unauthorized",
  //         text: "You are not logged in. Please log in again.",
  //         confirmButtonColor: "#dc2626",
  //       });
  //       setIsLoading(false);
  //       setIsModalWorksheetModalOpen(false);
  //       return;
  //     }

  //     const payload = {
  //       answer: [answers],
  //       user_id,
  //       titles,
  //       worksheet_no,
  //     };

  //     const response = await API.post("/worksheets/checker", payload, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     // Extracting score and worksheet details
  //     const { score, worksheet } = response.data;

  //     setIsModalWorksheetModalOpen(false);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Quiz Submitted!",
  //       html: `
  //         <p><strong>Worksheet:</strong> ${worksheet.titles}</p>
  //         <p><strong>Worksheet No:</strong> ${worksheet.worksheet_no}</p>
  //         <p><strong>Your Score:</strong> ${score}</p>
  //       `,
  //       confirmButtonColor: "#10B981",
  //     }).then(() => {
  //       navigate("/lessons");
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     setIsModalWorksheetModalOpen(false);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Submission Failed",
  //       text:
  //         error.response?.data?.message ||
  //         "An error occurred while submitting the answers.",
  //       confirmButtonColor: "#dc2626",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //     setIsModalWorksheetModalOpen(false);
  //   }
  // };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Box
        sx={{
          px: 4,
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          WORKSHEET # 1: FILL ME UP
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          textAlign="center"
          paragraph
        >
          <strong>A. Directions:</strong> Below is the image of the Digestive
          System. Write the names of the organs from the box below.
          <p className="mt-5">
            A purple (P) gene for the flower is dominant and is crossed over the
            white flower (p). Determine the genotypic and phenotypic ratio of
            the offspring. Use a punnet square to solve the problem.
          </p>
        </Typography>

        <img
          src={three}
          alt="Worksheet"
          style={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            marginBottom: "20px",
          }}
        />

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
              key={organ.id}
              id={organ.id}
              name={organ.name}
              onSelect={handleSelect}
              isSelected={selectedOrganId === organ.id}
            />
          ))}
        </Box>

        <Grid container spacing={2} sx={{ justifyContent: "center", mt: 2 }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <DropBox
                id={index + 1}
                organ={assigned[index + 1]}
                onTapDrop={handleTapDrop}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mt: 4 }} />

      <LoadingButton
        sx={{
          mt: 4,
          display: "block",
          mx: "auto",
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: "bold",
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

export default Worksheet3;
