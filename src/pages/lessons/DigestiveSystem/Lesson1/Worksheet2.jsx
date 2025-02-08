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
import Large_Intestine from "../../../../assets/images/Lesson1Worksheet2/A.png";
import Stomach from "../../../../assets/images/Lesson1Worksheet2/B.png";
import Esophagus from "../../../../assets/images/Lesson1Worksheet2/C.png";
import Pancreas from "../../../../assets/images/Lesson1Worksheet2/D.png";
import Small_Intestine from "../../../../assets/images/Lesson1Worksheet2/E.png";
import Mouth from "../../../../assets/images/Lesson1Worksheet2/F.png";
import Rectum from "../../../../assets/images/Lesson1Worksheet2/G.png";
import Liver from "../../../../assets/images/Lesson1Worksheet2/H.png";
import API from "../../../../utils/api/api.js";
import { LoadingButton } from "@mui/lab";

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

const DraggableImage = ({ image, id, onSelect, isSelected }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "IMAGE",
    item: { id, image },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <Box
      ref={drag}
      onClick={() => onSelect(id, image)}
      sx={{
        cursor: "pointer",
        opacity: isDragging ? 0.5 : 1,
        border: `2px solid ${isSelected ? "blue" : "#ccc"}`, // Change border color if selected
        borderRadius: "8px",
        p: 1,
      }}
    >
      <img
        src={image}
        alt={`Organ ${id}`}
        style={{ width: "100%", maxWidth: "80px" }}
      />
    </Box>
  );
};

const DropZone = ({ id, onDrop, currentImage }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "IMAGE",
    drop: (item) => onDrop(id, item.image),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <Paper
      ref={drop}
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
      onClick={() => onDrop(id, currentImage)}
    >
      {currentImage ? (
        <img
          src={currentImage}
          alt="Dropped Organ"
          style={{ width: "100%", maxWidth: "80px" }}
        />
      ) : (
        "Tap to Drop"
      )}
    </Paper>
  );
};

const Worksheet2 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet2ModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assignedImages, setAssignedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDrop = (id, image) => {
    if (selectedImage) {
      setAssignedImages((prev) => ({ ...prev, [id]: selectedImage }));
      setSelectedImage(null);
    }
  };

  const handleSelect = (id, image) => {
    setSelectedImage(image);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Ensure all organs are placed
      if (Object.keys(assignedImages).length !== 10) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Answers",
          text: "Please place all digestive organs before submitting.",
          confirmButtonColor: "#f59e0b", // Yellow warning color
        });
        return;
      }

      const organOrder = [
        "Large Intestine",
        "Stomach",
        "Esophagus",
        "Pancreas",
        "Small Intestine",
        "Mouth",
        "Rectum",
        "Liver",
      ];

      // Map assignedImages to their corresponding organ names
      const mappedData = Object.entries(assignedImages).reduce(
        (acc, [descriptionId, imagePath]) => {
          const organ = images.find((img) => img.image === imagePath);
          if (organ) {
            acc[organ.name] = descriptionId; // Map organ name to its assigned description ID
          }
          return acc;
        },
        {}
      );

      // Create a new object with the organs arranged in the required order
      const orderedSubmissionData = organOrder.reduce((acc, organ) => {
        acc[organ] = mappedData[organ] || ""; // Use an empty string if no match is found
        return acc;
      }, {});

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
        setIsModalWorksheet2ModalOpen(false);
        return;
      }

      const payload = {
        answer: [orderedSubmissionData],
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

      setIsModalWorksheet2ModalOpen(false);

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
      setIsModalWorksheet2ModalOpen(false);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.message ||
          "An error occurred while submitting the answers.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsModalWorksheet2ModalOpen(false);
      setIsLoading(false);
    }
  };

  const data = [
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

  const images = [
    { id: "A", name: "Large Intestine", image: Large_Intestine },
    { id: "B", name: "Stomach", image: Stomach },
    { id: "C", name: "Esophagus", image: Esophagus },
    { id: "D", name: "Pancreas", image: Pancreas },
    { id: "E", name: "Small Intestine", image: Small_Intestine },
    { id: "F", name: "Mouth", image: Mouth },
    { id: "G", name: "Rectum", image: Rectum },
    { id: "H", name: "Liver", image: Liver },
  ];

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Worksheet 2: WHO AM I?
        </Typography>
        <Typography variant="body2" paragraph>
          Tap an image to select it, then tap on a drop zone to place it.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 2,
            flexWrap: "wrap",
            justifyContent: "right",
          }}
        >
          {images.map((img, index) => (
            <DraggableImage
              key={index}
              image={img.image}
              id={index + 1}
              onSelect={handleSelect}
              isSelected={selectedImage === img.image} // Pass isSelected prop
            />
          ))}
        </Box>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "100%", overflowX: "auto" }}
        >
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
                      onDrop={handleDrop}
                      currentImage={assignedImages[row.id]}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>{row.description}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <LoadingButton
          variant="contained"
          color="primary"
          sx={{
            mt: 4,
            ml: "auto", // This will push the button to the right
            display: "block", // Ensures the button takes up its own line
          }}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </DndProvider>
  );
};

export default Worksheet2;
