import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import Swal from "sweetalert2";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import API from "../../../../utils/api/api.js";
import SubmitDatePicker from "../../../../components/date-input/SubmitDatePicker.jsx";
import A from "../../../../assets/images/Lesson1Worksheet2/A.png";
import B from "../../../../assets/images/Lesson1Worksheet2/B.png";
import C from "../../../../assets/images/Lesson1Worksheet2/C.png";
import D from "../../../../assets/images/Lesson1Worksheet2/D.png";
import E from "../../../../assets/images/Lesson1Worksheet2/E.png";
import F from "../../../../assets/images/Lesson1Worksheet2/F.png";
import G from "../../../../assets/images/Lesson1Worksheet2/G.png";
import H from "../../../../assets/images/Lesson1Worksheet2/H.png";

const organImages = {
  Large_Intestine: A,
  Stomach: B,
  Esophagus: C,
  Pancreas: D,
  Small_Intestine: E,
  Mouth: F,
  Rectum: G,
  Liver: H,
};

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

const ORGAN_DATA = [
  {
    id: 1,
    description:
      "I am an organ that is a j-shaped organ found at the end of the esophagus on the upper left side of the abdomen or abdominal cavity that produces gastric juices and acids.",
  },
  {
    id: 2,
    description:
      "I am and where food is mixed with intestinal juices containing enzymes that help digestion. It is where the final digestion and absorption of nutrients happen.",
  },
  {
    id: 3,
    description:
      "I am an organ where liquid, electrolytes, and some vitamins are reabsorbed from undigested food. It secretes mucus to aid in the formation of feces and maintains alkaline conditions. This is the last segment of the gastrointestinal tract that completes absorption and compacts waste.",
  },
  {
    id: 4,
    description:
      "I am an organ where food is mechanically broken down by chewing chewed pulp and the tongue helps in pushing the bits, broken into small pieces for easier digestion. Here, the saliva softens the food into the pharynx.",
  },
  {
    id: 5,
    description:
      "I am an organ where waste or remaining materials become more solid known as feces will be temporarily stored and eliminated.",
  },
  {
    id: 6,
    description:
      "I am a tube that connects the mouth and stomach. It carries the food down to the stomach for temporary storage and further digestion",
  },
  {
    id: 7,
    description:
      "I am the biggest organ that produces bile for the emulsification of fats into droplets.",
  },
  {
    id: 8,
    description:
      "I am an organ that makes three diverse kinds of enzymes namely amylase, peptidase, and lipase released through a pancreatic duct that aids in the digestion of all three organic compounds such as carbohydrates, proteins, and fats, respectively. The process takes about half of a liter of digestive juices each day",
  },
];

const ORGAN_LIST = [
  { id: "A", name: "Large Intestine", image: organImages.Large_Intestine },
  { id: "B", name: "Stomach", image: organImages.Stomach },
  { id: "C", name: "Esophagus", image: organImages.Esophagus },
  { id: "D", name: "Pancreas", image: organImages.Pancreas },
  { id: "E", name: "Small Intestine", image: organImages.Small_Intestine },
  { id: "F", name: "Mouth", image: organImages.Mouth },
  { id: "G", name: "Rectum", image: organImages.Rectum },
  { id: "H", name: "Liver", image: organImages.Liver },
];

const DraggableImage = ({ image, name, isSelected, onSelect }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "IMAGE",
    item: { image, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      onClick={() => onSelect(image)}
      sx={{
        cursor: "pointer",
        opacity: isDragging ? 0.5 : 1,
        border: `2px solid ${isSelected ? "blue" : "#ccc"}`,
        borderRadius: "8px",
        p: 1,
      }}
    >
      <img
        src={image}
        alt={`${name} organ`}
        style={{ width: "100%", maxWidth: "80px" }}
      />
    </Box>
  );
};

const DropZone = ({ id, currentImage, onDrop, selectedImage }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "IMAGE",
    drop: (item) => onDrop(id, item.image),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleTapDrop = () => {
    if (selectedImage) onDrop(id, selectedImage);
  };

  return (
    <Paper
      ref={drop}
      onClick={handleTapDrop}
      sx={{
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed",
        borderColor: isOver ? "success.main" : "text.disabled",
        bgcolor: isOver ? "success.light" : "background.paper",
        cursor: "pointer",
      }}
    >
      {currentImage ? (
        <img
          src={currentImage}
          alt="Dropped organ"
          style={{ width: "100%", maxWidth: "80px" }}
        />
      ) : (
        <Typography variant="caption">Tap to Drop</Typography>
      )}
    </Paper>
  );
};

const Alert = Swal.mixin({
  customClass: { container: "swal-overlay" },
  zIndex: 1400,
});

const Worksheet2 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet2ModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assignedImages, setAssignedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitDate, setSubmitDate] = useState(null);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleDrop = (targetId, image) => {
    setAssignedImages((prev) => ({
      ...prev,
      [targetId]: image,
    }));
    setSelectedImage(null);
  };

  const handleReset = () => {
    setAssignedImages({});
    setSelectedImage(null);
    setSubmitDate(null);
  };

  const validateSubmission = () => {
    if (Object.keys(assignedImages).length !== ORGAN_DATA.length) {
      Alert.fire({
        icon: "warning",
        title: "Incomplete Answers",
        text: "Please place all digestive organs before submitting.",
        confirmButtonColor: "#f59e0b",
      });
      return false;
    }
    return true;
  };

  const prepareSubmissionData = () => {
    const submissionData = {};
    Object.entries(assignedImages).forEach(([descriptionId, imagePath]) => {
      const organ = ORGAN_LIST.find((img) => img.image === imagePath);
      if (organ) submissionData[organ.name] = descriptionId;
    });
    return submissionData;
  };

  const inputAnswersData = () => {
    return Object.entries(assignedImages).map(([questionId, imagePath]) => {
      const organ = ORGAN_LIST.find((img) => img.image === imagePath);
      const question = ORGAN_DATA.find((q) => q.id === Number(questionId));

      return {
        id: Number(questionId),
        question: question?.description || "Unknown question",
        answer: organ?.name || "Unknown organ",
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (!validateSubmission()) return;

      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication required");

      const response = await API.post(
        "/worksheets/checker",
        {
          answer: [prepareSubmissionData()],
          inputAnswer: inputAnswersData(),
          user_id: localStorage.getItem("id"),
          titles,
          worksheet_no,
          submit_date: submitDate?.toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      showSubmissionResults(response.data);
      setIsModalWorksheet2ModalOpen(false);
    } catch (error) {
      handleSubmissionError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showSubmissionResults = ({ score, worksheet, detailed_results }) => {
    Alert.fire({
      icon: "success",
      title: "Quiz Submitted!",
      html: `
        <p><strong>Worksheet:</strong> ${worksheet.titles}</p>
        <p><strong>Worksheet No:</strong> ${worksheet.worksheet_no}</p>
        <p><strong>Your Score:</strong> ${score}</p>
        <ul>
          <p><strong>Your Answers:</strong></p>
          ${detailed_results
            .map(
              (result) => `
            <li>${result.user_answer.toUpperCase()} is 
              ${result.is_correct ? "correct ✔️" : "incorrect ❌"}
            </li>`
            )
            .join("")}
        </ul>
      `,
      confirmButtonColor: "#10B981",
    });
  };

  const handleSubmissionError = (error) => {
    Alert.fire({
      icon: "error",
      title: "Submission Failed",
      text: error.response?.data?.message || error.message,
      confirmButtonColor: "#dc2626",
    });
    setIsModalWorksheet2ModalOpen(false);
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5_TO_TOUCH}>
      <Box sx={worksheetContainerStyles}>
        <Typography variant="h5" gutterBottom>
          Worksheet 2: WHO AM I?
        </Typography>

        <Typography variant="body2" paragraph>
          Tap an image to select it, then tap or drag to a drop zone.
        </Typography>

        <OrganSelectionArea
          organs={ORGAN_LIST}
          selectedImage={selectedImage}
          onSelect={handleImageSelect}
        />

        <SubmissionTable
          data={ORGAN_DATA}
          assignedImages={assignedImages}
          selectedImage={selectedImage}
          onDrop={handleDrop}
        />

        <Box sx={actionButtonStyles}>
          <SubmitDatePicker value={submitDate} onChange={setSubmitDate} />
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            sx={buttonStyles}
            disabled={isLoading}
          >
            Reset
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isLoading}
            onClick={handleSubmit}
            sx={buttonStyles}
          >
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </DndProvider>
  );
};

// Sub-components
const OrganSelectionArea = ({ organs, selectedImage, onSelect }) => (
  <Box sx={organSelectionStyles}>
    {organs.map((organ) => (
      <DraggableImage
        key={organ.id}
        image={organ.image}
        name={organ.name}
        isSelected={selectedImage === organ.image}
        onSelect={() => onSelect(organ.image)}
      />
    ))}
  </Box>
);

const SubmissionTable = ({ data, assignedImages, onDrop, selectedImage }) => (
  <TableContainer component={Paper} sx={tableStyles}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Drop Here</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <DropZone
                id={row.id}
                currentImage={assignedImages[row.id]}
                selectedImage={selectedImage}
                onDrop={onDrop}
              />
            </TableCell>
            <TableCell>
              <Typography variant="body2">{row.description}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// Styles
const worksheetContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 2,
  gap: 3,
};

const organSelectionStyles = {
  display: "flex",
  gap: 2,
  mb: 2,
  flexWrap: "wrap",
  justifyContent: "center",
};

const tableStyles = {
  maxWidth: "100%",
  overflowX: "auto",
  boxShadow: 3,
};

const actionButtonStyles = {
  display: "flex",
  gap: 2,
  mt: 4,
  width: "100%",
  justifyContent: "flex-end",
};

const buttonStyles = {
  textTransform: "none",
  px: 4,
  py: 1,
};

export default Worksheet2;
