import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import Swal from "sweetalert2";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { WorksheetsQuestion1 } from "./ConstantDigestive.jsx";
import API from "../../../../utils/api/api.js";
import image from "../../../../assets/images/DigestiveWorksheet.png";
import SubmitDatePicker from "../../../../components/date-input/SubmitDatePicker.jsx";

// Constants
const HTML5_TO_TOUCH = {
  backends: [
    { backend: HTML5Backend },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      transition: TouchTransition,
    },
  ],
};

const INITIAL_ORGANS = [
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

// Sub-components
const Organ = ({ name, onSelect, isSelected }) => (
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
    onClick={() => onSelect(name)}
  >
    {name}
  </Box>
);

const DropBox = ({ id, organ, onTapDrop }) => (
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
    onClick={() => onTapDrop(id)}
  >
    {organ ? `${id}. ${organ}` : `${id}. Drop here`}
  </Paper>
);

const QuestionSection = ({ questions, answers, onChange }) => (
  <Box sx={{ p: 3, textAlign: "center", maxWidth: 600, mx: "auto" }}>
    <Typography variant="body1" color="textSecondary" paragraph>
      B. Read the statement below on the process of digestion. Write numbers
      from 1-8 on the box that sequence the event.
    </Typography>
    {questions.map((data, index) => (
      <Box key={data.id} sx={{ textAlign: "left", mb: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          {data.question}
        </Typography>
        <TextField
          value={answers[index]}
          onChange={(e) => onChange(index, e.target.value)}
          fullWidth
          multiline
          rows={3}
          margin="normal"
          variant="outlined"
        />
      </Box>
    ))}
  </Box>
);

// Main Component
const Worksheet = ({
  titles,
  worksheet_no,
  setIsModalWorksheetModalOpen,
  setIsModalWorksheet2ModalOpenNext,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assigned, setAssigned] = useState({});
  const [availableOrgans, setAvailableOrgans] = useState(INITIAL_ORGANS);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [submitDate, setSubmitDate] = useState(null);
  const [textAnswers, setTextAnswers] = useState(
    new Array(WorksheetsQuestion1.length).fill("")
  );

  const handleReset = () => {
    setAssigned({});
    setAvailableOrgans(INITIAL_ORGANS);
    setSelectedOrgan(null);
    setSubmitDate(null);
    setTextAnswers(new Array(WorksheetsQuestion1.length).fill(""));
  };

  const handleOrganDrop = (id, organName) => {
    const previousOrgan = assigned[id];
    setAssigned((prev) => ({ ...prev, [id]: organName }));

    setAvailableOrgans((prev) => {
      const updated = previousOrgan
        ? [...prev, previousOrgan].filter((organ) => organ !== organName)
        : prev.filter((organ) => organ !== organName);
      return updated;
    });
  };

  const handleTextAnswerChange = (index, value) => {
    const updatedAnswers = [...textAnswers];
    updatedAnswers[index] = value;
    setTextAnswers(updatedAnswers);
  };

  const validateSubmission = () => {
    if (Object.keys(assigned).length !== INITIAL_ORGANS.length) {
      showAlert(
        "warning",
        "Please place all digestive organs before submitting."
      );
      return false;
    }

    if (textAnswers.some((answer) => answer.trim() === "")) {
      showAlert("warning", "Please answer all text fields before submitting.");
      return false;
    }

    return true;
  };

  const preparePayload = () => {
    let count = Object.keys(assigned).length;
    const answers = { ...assigned };
    WorksheetsQuestion1.forEach((_, index) => {
      count += 1;
      answers[`${count}`] = textAnswers[index];
    });

    // Process Part A (Drag-and-drop answers)
    const partAAnswers = Object.entries(assigned).map(([id, organ]) => ({
      id: parseInt(id),
      answer: organ,
    }));

    // Process Part B (Text answers)
    const partBAnswers = WorksheetsQuestion1.map((question, index) => ({
      id: question.id,
      question: question.question,
      answer: textAnswers[index],
    }));

    // Combine both parts into a single array
    const combinedAnswers = [...partAAnswers, ...partBAnswers];

    return {
      answer: [answers],
      inputAnswer: combinedAnswers,
      user_id: localStorage.getItem("id"),
      titles,
      worksheet_no,
      submit_date: submitDate?.toISOString(),
    };
  };

  const handleSubmission = async () => {
    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Unauthorized");
      if (!validateSubmission()) return;

      const payload = preparePayload();

      const response = await API.post("/worksheets/checker", payload, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      showSubmissionResults(response.data);
      setIsModalWorksheetModalOpen(false);
    } catch (error) {
      handleSubmissionError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const Alert = Swal.mixin({
    customClass: { container: "swal-overlay" },
    zIndex: 1400,
  });

  const showAlert = (icon, text) => {
    Alert.fire({
      icon,
      title: "Incomplete Answers",
      text,
      confirmButtonColor: icon === "warning" ? "#f59e0b" : "#dc2626",
    });
  };

  const showSubmissionResults = ({ score, worksheet, detailed_results }) => {
    Swal.fire({
      icon: "success",
      title: "Quiz Submitted!",
      showConfirmButton: false,
      showCloseButton: true,
      html: `
    <p><strong>Worksheet:</strong> ${worksheet.titles || titles}</p>
    <p><strong>Worksheet No:</strong> ${
      worksheet.worksheet_no || worksheet_no
    }</p>
    <p><strong>Score:</strong> ${score}</p>
    <div style="margin-top:20px; display:flex-direction:column; justify-content:center; gap:10px;">
      ${detailed_results
        .map(
          (result, index) => `
        <div class="result-item">
          <span class="question-index">${index + 1}.</span>
          <span class="result ${result.is_correct ? "correct" : "incorrect"}">
            ${result.user_answer.toUpperCase()} -
            ${result.is_correct ? "Correct ✔️" : "Incorrect ❌"}
          </span>
        </div>
      `
        )
        .join("")}

      <button 
        id="nextBtn" 
        class="swal2-confirm swal2-styled" 
        style="
          background-color:#3B82F6;
          font-size:16px;
          border-radius:6px;
          min-width:auto; ">
          Next
      </button>
    </div>
  `,
      didRender: () => {
        const nextBtn = document.getElementById("nextBtn");
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            Swal.close();
            setIsModalWorksheet2ModalOpenNext(true);
          });
        }
      },
    });
  };

  const handleSubmissionError = (error) => {
    Alert.fire({
      icon: "error",
      title: "Submission Failed",
      text: error.response?.data?.message || error.message,
      confirmButtonColor: "#dc2626",
    });
    setIsModalWorksheetModalOpen(false);
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5_TO_TOUCH}>
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
          <strong>A. Directions:</strong> Refer to the illustration of Digestive
          System. From the above choices of the organs of digestion, drop each
          name of the organ on the correct box below.
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
              onSelect={setSelectedOrgan}
              isSelected={selectedOrgan === organ}
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
                organ={assigned[index + 1]}
                onTapDrop={(id) =>
                  selectedOrgan && handleOrganDrop(id, selectedOrgan)
                }
              />
            </Grid>
          ))}
        </Grid>

        <QuestionSection
          questions={WorksheetsQuestion1}
          answers={textAnswers}
          onChange={handleTextAnswerChange}
        />

        <Divider sx={{ mt: 4, width: "100%" }} />

        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {/* <SubmitDatePicker value={submitDate} onChange={setSubmitDate} /> */}
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            disabled={isLoading}
            sx={{ textTransform: "none" }}
          >
            Reset
          </Button>

          <LoadingButton
            variant="contained"
            color="primary"
            loading={isLoading}
            onClick={handleSubmission}
            sx={{ textTransform: "none" }}
          >
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Worksheet;
