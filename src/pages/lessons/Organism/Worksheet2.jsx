import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Button, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../../../utils/api/api";

const initialOrganisms = [
  "Grass",
  "Rat",
  "Grasshopper",
  "Carrots",
  "Lion",
  "Fox",
  "Rabbit",
];

const Organism = ({ name, onSelect, isSelected }) => (
  <Paper
    sx={{
      padding: "12px 16px",
      backgroundColor: isSelected ? "#bbdefb" : "#f5f5f5",
      cursor: "pointer",
      border: "2px solid",
      borderColor: isSelected ? "#1976d2" : "#e0e0e0",
      textAlign: "center",
      borderRadius: "12px",
      fontWeight: "bold",
      transition: "background-color 0.3s, transform 0.2s",
      "&:hover": {
        backgroundColor: "#e3f2fd",
        transform: "scale(1.05)",
      },
    }}
    onClick={() => onSelect(name)}
  >
    {name}
  </Paper>
);

const DropZone = ({ number, id, assignedOrganism, onDrop }) => (
  <Paper
    sx={{
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px dashed #1976d2",
      backgroundColor: assignedOrganism ? "#c8e6c9" : "#ffffff",
      cursor: "pointer",
      borderRadius: "12px",
      fontWeight: "medium",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: assignedOrganism ? "#a5d6a7" : "#f0f0f0",
      },
    }}
    onClick={() => onDrop(id)}
  >
    {assignedOrganism || `${number}. Drop here`}
  </Paper>
);

const Worksheet2 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet2ModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assigned, setAssigned] = useState({});
  const [availableOrganisms, setAvailableOrganisms] =
    useState(initialOrganisms);
  const [selectedOrganism, setSelectedOrganism] = useState(null);

  const handleSelectOrganism = (organism) => {
    setSelectedOrganism(organism);
  };

  const handleDrop = (id) => {
    if (selectedOrganism) {
      const previousAssignment = assigned[id];
      if (previousAssignment) {
        setAvailableOrganisms((prev) => [...prev, previousAssignment]);
      }
      setAssigned((prev) => ({ ...prev, [id]: selectedOrganism }));
      setAvailableOrganisms((prev) =>
        prev.filter((item) => item !== selectedOrganism)
      );
      setSelectedOrganism(null);
    }
  };

  const handleReset = () => {
    setAssigned({});
    setAvailableOrganisms(initialOrganisms);
    setSelectedOrganism(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (Object.keys(assigned).length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Answers",
          text: "Please make sure all required fields are filled correctly.",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      const user_id = localStorage.getItem("id");
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
          confirmButtonColor: "#dc2626",
        });
        return;
      }

      const chainAOrder = ["Grass", "Grasshopper", "Rat"];
      const chainBOrder = ["Carrots", "Rabbit", "Fox", "Lion"];

      const orderedDropValues = Array.from(
        { length: 7 },
        (_, i) => assigned[i + 1]
      ).filter(Boolean);

      // Split the drops into two chains (based on contents)
      const chainA = orderedDropValues.filter((item) =>
        chainAOrder.includes(item)
      );
      const chainB = orderedDropValues.filter((item) =>
        chainBOrder.includes(item)
      );

      // Sort them according to your defined path
      const sortedChainA = chainA.sort(
        (a, b) => chainAOrder.indexOf(a) - chainAOrder.indexOf(b)
      );
      const sortedChainB = chainB.sort(
        (a, b) => chainBOrder.indexOf(a) - chainBOrder.indexOf(b)
      );

      const inputAnswer = [
        {
          question: "Arrange the following organisms to form two food chains.",
          answer: `First chain: ${sortedChainA.join("→  ")}`,
        },
        {
          question: "Arrange the following organisms to form two food chains.",
          answer: `Second chain: ${sortedChainB.join("→  ")}`,
        },
      ];

      const payload = {
        answer: [assigned],
        inputAnswer,
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

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Food Chain Construction Worksheet
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>Directions:</strong> Click an organism and then click a drop
        zone to assign it.
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        {availableOrganisms.map((organism, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Organism
              name={organism}
              onSelect={handleSelectOrganism}
              isSelected={selectedOrganism === organism}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {[1, 2, 3].map((id, index) => (
          <React.Fragment key={id}>
            <Grid item xs={4} sm={2}>
              <DropZone
                number={index + 1}
                id={id}
                assignedOrganism={assigned[id]}
                onDrop={handleDrop}
              />
            </Grid>
            {id !== 3 && (
              <Grid item xs={1} sx={{ textAlign: "center" }}>
                <ArrowForwardIcon fontSize="large" />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>

      <Divider sx={{ marginY: "25px" }} />

      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {[4, 5, 6, 7].map((id, index) => (
          <React.Fragment key={id}>
            <Grid item xs={4} sm={2}>
              <DropZone
                number={index + 1}
                id={id}
                assignedOrganism={assigned[id]}
                onDrop={handleDrop}
              />
            </Grid>
            {id !== 7 && (
              <Grid item xs={1} sx={{ textAlign: "center" }}>
                <ArrowForwardIcon fontSize="large" />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          disabled={isLoading}
          sx={{ marginRight: 2 }}
        >
          Reset
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Worksheet2;
