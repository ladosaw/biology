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
import { formatAssignedData } from "../../../utils/helper.js";
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

// Initial List of Genes Red
const initialPunnettRed = [
  { id: 1, name: "RR" },
  { id: 2, name: "Rr" },
  { id: 3, name: "rr" },
  { id: 4, name: "Rr" },
  { id: 5, name: "Rr" },
  { id: 6, name: "RR" },
  { id: 7, name: "rr" },
  { id: 8, name: "Rr" },
];

// Initial List of Genes Purple
const initialPunnettPurple = [
  { id: 9, name: "P" },
  { id: 10, name: "p" },
  { id: 11, name: "Pp" },
  { id: 12, name: "P" },
  { id: 13, name: "p" },
  { id: 14, name: "Pp" },
  { id: 15, name: "Pp" },
  { id: 16, name: "Pp" },
];

// Initial List of Genes Curly Hair
const initialPunnettCurlyHair = [
  { id: 17, name: "Cc" },
  { id: 18, name: "Cc" },
  { id: 19, name: "C" },
  { id: 20, name: "c" },
  { id: 21, name: "C" },
  { id: 22, name: "c" },
  { id: 23, name: "Cc" },
  { id: 24, name: "Cc" },
];

// Draggable Punnett Component
const PunnettSquare = ({ id, name, onSelect, isSelected }) => (
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
      bgcolor: punnett ? "success.light" : "background.paper",
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
const Worksheet3 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet3ModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [assigned, setAssigned] = useState({});
  const [availablePunnettRed, setAvailablePunnettRed] =
    useState(initialPunnettRed);
  const [availablePunnettPurple, setAvailablePunnettPurple] =
    useState(initialPunnettPurple);
  const [availablePunnettCurlyHair, setAvailablePunnettCurlyHair] = useState(
    initialPunnettCurlyHair
  );
  const [selectedPunnettId, setSelectedPunnettId] = useState(null);
  const [genotypeRed, setGenotypeRed] = useState("");
  const [phenotypeRed, setPhenotypeRed] = useState("");
  const [genotypePurple, setGenotypePurple] = useState("");
  const [phenotypePurple, setPhenotypePurple] = useState("");
  const [genotypeCurlyHair, setGenotypeCurlyHair] = useState("");
  const [phenotypeCurlyHair, setPhenotypeCurlyHair] = useState("");

  const handleResetAll = () => {
    setAvailablePunnettRed(initialPunnettRed);
    setAvailablePunnettPurple(initialPunnettPurple);
    setAvailablePunnettCurlyHair(initialPunnettCurlyHair);
    setAssigned({});
    setGenotypeRed("");
    setPhenotypeRed("");
    setGenotypePurple("");
    setPhenotypePurple("");
    setGenotypeCurlyHair("");
    setPhenotypeCurlyHair("");
    setSelectedPunnettId(null);
  };

  // Selecting a Punnett
  const handleSelect = (id) => setSelectedPunnettId(id);

  // Dropping a Punnett into the Punnett Square
  const handleTapDrop = (dropId) => {
    if (selectedPunnettId === null) return;

    let punnett;
    if (availablePunnettRed.some((o) => o.id === selectedPunnettId)) {
      punnett = availablePunnettRed.find((o) => o.id === selectedPunnettId);
      setAvailablePunnettRed((prev) =>
        prev.filter((o) => o.id !== selectedPunnettId)
      );
    } else if (availablePunnettPurple.some((o) => o.id === selectedPunnettId)) {
      punnett = availablePunnettPurple.find((o) => o.id === selectedPunnettId);
      setAvailablePunnettPurple((prev) =>
        prev.filter((o) => o.id !== selectedPunnettId)
      );
    } else if (
      availablePunnettCurlyHair.some((o) => o.id === selectedPunnettId)
    ) {
      punnett = availablePunnettCurlyHair.find(
        (o) => o.id === selectedPunnettId
      );
      setAvailablePunnettCurlyHair((prev) =>
        prev.filter((o) => o.id !== selectedPunnettId)
      );
    }

    if (punnett) {
      setAssigned((prev) => ({ ...prev, [dropId]: punnett }));
      setSelectedPunnettId(null);
    }
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
        setIsModalWorksheet3ModalOpen(false);
        return;
      }

      const formattedData = formatAssignedData(
        assigned,
        genotypeRed,
        phenotypeRed,
        genotypePurple,
        phenotypePurple,
        genotypeCurlyHair,
        phenotypeCurlyHair
      );

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
      setIsModalWorksheet3ModalOpen(false);
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <FiveMinuteTimer onSubmit={handleSubmit} initialTime={420} />
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Worksheet 3: Monohybrid Cross Using the Punnett Square
        </Typography>

        <Typography
          variant="caption"
          textAlign="start"
          fontWeight="bold"
          mb={2}
        >
          Situation:
        </Typography>
        <Typography variant="body1" textAlign="start" mb={2}>
          A homozygous red Santan flower (RR) is crossed with a homozygous pink
          Santan flower (rr).
        </Typography>

        <Typography
          variant="caption"
          textAlign="start"
          fontWeight="bold"
          mb={2}
        >
          Task:
        </Typography>
        <Typography
          variant="body2"
          textAlign="start"
          mb={2}
          sx={{ display: "block" }}
        >
          1. Show the given cross using the Punnett square.
        </Typography>
        <Typography
          variant="body2"
          textAlign="start"
          mb={2}
          sx={{ display: "block" }}
        >
          2. Write the genotypes and phenotypes of the resulting offspring.
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
          {availablePunnettRed.map((punnett) => (
            <PunnettSquare
              key={punnett.id}
              id={punnett.id}
              name={punnett.name}
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
                    <TableCell align="center">R</TableCell>
                    <TableCell align="center">R</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">r</TableCell>
                    {[0, 1].map((index) => (
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
                    <TableCell align="center">r</TableCell>
                    {[2, 3].map((index) => (
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
            <Typography variant="h6" fontWeight="bold" color="brown">
              Genotype:
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter genotype"
              value={genotypeRed}
              onChange={(e) => setGenotypeRed(e.target.value)}
            />

            <Typography variant="h6" fontWeight="bold" color="brown" mt={2}>
              Phenotype:
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter phenotype"
              value={phenotypeRed}
              onChange={(e) => setPhenotypeRed(e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Punnett Selection Purple */}

        <Typography
          variant="caption"
          textAlign="start"
          fontWeight="bold"
          mb={2}
        >
          Situation:
        </Typography>
        <Typography variant="body1" textAlign="start" mb={2}>
          A purple (P) gene for flower is dominant and is crossed over the white
          flower (p). Determine the genotypic and phenotypic ratio of the
          offspring. Use a punnet square to solve the problem.
        </Typography>

        <Typography
          variant="caption"
          textAlign="start"
          fontWeight="bold"
          mb={2}
        >
          Task:
        </Typography>
        <Typography
          variant="body2"
          textAlign="start"
          mb={2}
          sx={{ display: "block" }}
        >
          1. Show the given cross using the Punnett square.
        </Typography>
        <Typography
          variant="body2"
          textAlign="start"
          mb={2}
          sx={{ display: "block" }}
        >
          2. Write the genotypes and phenotypes of the resulting offspring.
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
          {availablePunnettPurple.map((punnett) => (
            <PunnettSquare
              key={punnett.id}
              id={punnett.id}
              name={punnett.name}
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
                    {[9, 10].map((index) => (
                      <TableCell key={index} align="center">
                        <DropBox
                          id={index}
                          punnett={assigned[index]}
                          onTapDrop={handleTapDrop}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {[11, 12, 13].map((index) => (
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
                    {[14, 15, 16].map((index) => (
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
            <Typography variant="h6" fontWeight="bold" color="brown">
              Genotype:
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter genotype"
              value={genotypePurple}
              onChange={(e) => setGenotypePurple(e.target.value)}
            />

            <Typography variant="h6" fontWeight="bold" color="brown" mt={2}>
              Phenotype:
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter phenotype"
              value={phenotypePurple}
              onChange={(e) => setPhenotypePurple(e.target.value)}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />

        {/* Punnett Selection Curly Hair */}

        <Typography
          variant="caption"
          textAlign="start"
          fontWeight="bold"
          mb={2}
        >
          Situation:
        </Typography>
        <Typography variant="body1" textAlign="start" mb={2}>
          A homozygous Curly hair (C) is crossed with a recessive straight hair
          (c).
        </Typography>

        <Typography
          variant="caption"
          textAlign="start"
          fontWeight="bold"
          mb={2}
        >
          Task:
        </Typography>
        <Typography
          variant="body2"
          textAlign="start"
          mb={2}
          sx={{ display: "block" }}
        >
          1. Show the given cross using the Punnett square.
        </Typography>
        <Typography
          variant="body2"
          textAlign="start"
          mb={2}
          sx={{ display: "block" }}
        >
          2. Write the genotypes and phenotypes of the resulting offspring.
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
          {availablePunnettCurlyHair.map((punnett) => (
            <PunnettSquare
              key={punnett.id}
              id={punnett.id}
              name={punnett.name}
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
                    {[17, 18].map((index) => (
                      <TableCell key={index} align="center">
                        <DropBox
                          id={index}
                          punnett={assigned[index]}
                          onTapDrop={handleTapDrop}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {[19, 20, 21].map((index) => (
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
                    {[22, 23, 24].map((index) => (
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
            <Typography variant="h6" fontWeight="bold" color="brown">
              Genotype:
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter genotype"
              value={genotypeCurlyHair}
              onChange={(e) => setGenotypeCurlyHair(e.target.value)}
            />

            <Typography variant="h6" fontWeight="bold" color="brown" mt={2}>
              Phenotype:
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter phenotype"
              value={phenotypeCurlyHair}
              onChange={(e) => setPhenotypeCurlyHair(e.target.value)}
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

export default Worksheet3;
