import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import Swal from "sweetalert2";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Divider,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { formatDataForWorksheet4Lessons4 } from "../../../utils/helper.js";
import API from "../../../utils/api/api.js";
import FiveMinuteTimer from "../../../components/timer/FiveMinuteTimer.jsx";

// Drag & Drop Configuration
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

// Initial List of Genes
const initialPunnett = [
  { id: 1, name: "rryy", color: "white" },
  { id: 2, name: "rrYY", color: "lightblue" },
  { id: 3, name: "RRyy", color: "green" },
  { id: 4, name: "RRYY", color: "yellow" },
  { id: 5, name: "RRYy", color: "yellow" },
  { id: 6, name: "Rryy", color: "green" },
  { id: 7, name: "RrYY", color: "yellow" },
  { id: 8, name: "RrYy", color: "yellow" },
  { id: 9, name: "RRYy", color: "yellow" },
  { id: 10, name: "RrYy", color: "yellow" },
  { id: 11, name: "rrYy", color: "lightblue" },
  { id: 12, name: "RrYY", color: "yellow" },
  { id: 13, name: "Rryy", color: "green" },
  { id: 14, name: "RrYy", color: "yellow" },
  { id: 15, name: "RrYy", color: "yellow" },
  { id: 16, name: "rrYy", color: "lightblue" },
];

// Draggable Punnett Component
const PunnettSquare = ({ id, name, bgcolor, onSelect, isSelected }) => (
  <Box
    sx={{
      p: 2,
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "12px",
      cursor: "pointer",
      bgcolor: bgcolor,
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

// DropBox for Punnett Square Cells
const DropBox = ({ id, punnett, onTapDrop }) => (
  <Paper
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "70px",
      border: "2px dashed",
      borderColor: punnett ? "success.main" : "text.disabled",
      bgcolor: punnett?.color,
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
    {punnett ? punnett.name : `Slot ${id + 1}`}
  </Paper>
);

// Main Punnett Square Component with Drag & Drop
const Worksheet4 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet4ModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assigned, setAssigned] = useState({});
  const [availablePunnett, setAvailablePunnett] = useState(initialPunnett);

  const [selectedPunnettId, setSelectedPunnettId] = useState(null);
  const [SubQ1, setSubQ1] = useState("");
  const [SubQ2, setSubQ2] = useState("");
  const [SubQ3, setSubQ3] = useState("");
  const [SubQ4, setSubQ4] = useState("");
  const [Q2, setQ2] = useState("");
  const [Q3, setQ3] = useState("");

  const handleResetAll = () => {
    setAvailablePunnett(initialPunnett);
    setAssigned({});
    setSubQ1("");
    setSubQ2("");
    setSubQ3("");
    setSubQ4("");
    setQ2("");
    setQ3("");
    setSelectedPunnettId(null);
  };

  // Selecting a Punnett
  const handleSelect = (id) => setSelectedPunnettId(id);

  // Dropping a Punnett into the Punnett Square
  const handleTapDrop = (dropId) => {
    if (selectedPunnettId === null) return;

    setAvailablePunnett((prev) =>
      prev.filter((o) => o.id !== selectedPunnettId)
    );

    setAssigned((prev) => {
      const punnett = availablePunnett.find((o) => o.id === selectedPunnettId);
      if (!punnett) return prev;

      return { ...prev, [dropId]: { ...punnett } }; // Ensure a new object reference
    });

    setSelectedPunnettId(null);
  };

  // Submitting the Worksheet
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
        setIsModalWorksheet4ModalOpen(false);
        return;
      }

      const checkForQ3 = Q3.includes("9") ? "9" : Q3;

      const formattedData = formatDataForWorksheet4Lessons4({
        assigned,
        SubQ1,
        SubQ2,
        SubQ3,
        SubQ4,
        Q2,
        Q3: checkForQ3,
      });

      const payload = {
        answer: [formattedData],
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
      setIsModalWorksheet4ModalOpen(false);
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <FiveMinuteTimer onSubmit={handleSubmit} initialTime={180} />
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Worksheet 4: Dihybrid Cross Using the Punnett Square
        </Typography>

        <Typography variant="body2" textAlign="start" fontWeight="bold">
          Directions:{" "}
          <Typography variant="caption" fontWeight="normal">
            Given the cross RrYy x RrYy
          </Typography>
        </Typography>

        <Typography variant="body2" textAlign="start" fontWeight="bold" mb={2}>
          <span display="block">R - round</span>
          <br />
          <span display="block">r - wrinkled</span>
          <br />
          <span display="block">Y - yellow</span>
          <br />
          <span display="block">y - green</span>
        </Typography>

        {/* Punnett Selection Red*/}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mb: 4,
          }}
        >
          {availablePunnett.map((punnett) => (
            <PunnettSquare
              key={punnett.id}
              id={punnett.id}
              name={punnett.name}
              bgcolor={punnett.color}
              onSelect={handleSelect}
              isSelected={selectedPunnettId === punnett.id}
            />
          ))}
        </Box>

        <Grid container spacing={3}>
          {/* Punnett Square Table */}
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table dense size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">RY</TableCell>
                    <TableCell align="center">Ry</TableCell>
                    <TableCell align="center">rY</TableCell>
                    <TableCell align="center">ry</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">RY</TableCell>
                    {[0, 1, 2, 3].map((index) => (
                      <TableCell key={index} align="center">
                        <DropBox
                          id={index}
                          punnett={assigned[index]}
                          onTapDrop={handleTapDrop}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Ry</TableCell>
                    {[4, 5, 6, 7].map((index) => (
                      <TableCell key={index} align="center">
                        <DropBox
                          id={index}
                          punnett={assigned[index]}
                          onTapDrop={handleTapDrop}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">rY</TableCell>
                    {[8, 9, 10, 11].map((index) => (
                      <TableCell key={index} align="center">
                        <DropBox
                          id={index}
                          punnett={assigned[index]}
                          onTapDrop={handleTapDrop}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">ry</TableCell>
                    {[12, 13, 14, 15].map((index) => (
                      <TableCell key={index} align="center">
                        <DropBox
                          id={index}
                          punnett={assigned[index]}
                          onTapDrop={handleTapDrop}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Genotype & Phenotype Inputs */}
          <Grid item xs={12} md={4}>
            <Typography variant="body1" fontWeight="bold" color="brown">
              1. Count the number of:
            </Typography>
            <TextField
              fullWidth
              placeholder="Round yellow seeds"
              sx={{ mt: 2 }}
              value={SubQ1}
              onChange={(e) => setSubQ1(e.target.value)}
              type="number"
            />
            <TextField
              fullWidth
              placeholder="Round green seeds"
              sx={{ mt: 2 }}
              value={SubQ2}
              onChange={(e) => setSubQ2(e.target.value)}
              type="number"
            />
            <TextField
              fullWidth
              placeholder="Wrinkled yellow seeds"
              sx={{ mt: 2 }}
              value={SubQ3}
              onChange={(e) => setSubQ3(e.target.value)}
              type="number"
            />
            <TextField
              fullWidth
              placeholder="Wrinkled green seeds"
              sx={{ mt: 2 }}
              value={SubQ4}
              onChange={(e) => setSubQ4(e.target.value)}
              type="number"
            />
          </Grid>

          <Grid item xs={12} md={4} lg={8}>
            <Typography variant="body1" fontWeight="bold" color="brown" mt={2}>
              2. What proportion of the offspring will have the following
              genotype: RY, Ry, rY, ry?
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Answer"
              value={Q2}
              onChange={(e) => setQ2(e.target.value)}
            />

            <Typography variant="body1" fontWeight="bold" color="brown" mt={2}>
              3. How many kinds of genotypes will the offspring have?
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Answer"
              value={Q3}
              onChange={(e) => setQ3(e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
          <Button variant="outlined" color="primary" onClick={handleResetAll}>
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
      </Container>
    </DndProvider>
  );
};

export default Worksheet4;
