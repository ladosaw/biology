import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
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
} from "@mui/material";
import a from "../../../../assets/images/Lesson1Worksheet2/A.png";
import b from "../../../../assets/images/Lesson1Worksheet2/B.png";
import c from "../../../../assets/images/Lesson1Worksheet2/C.png";
import d from "../../../../assets/images/Lesson1Worksheet2/D.png";
import e from "../../../../assets/images/Lesson1Worksheet2/E.png";
import f from "../../../../assets/images/Lesson1Worksheet2/F.png";
import g from "../../../../assets/images/Lesson1Worksheet2/G.png";
import h from "../../../../assets/images/Lesson1Worksheet2/H.png";

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

const Worksheet2 = ({ setIsModalWorksheet2ModalOpen }) => {
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

  const data = [
    { id: 1, description: "J-shaped organ producing gastric juices." },
    { id: 2, description: "Final digestion and absorption occur here." },
    { id: 3, description: "Reabsorbs liquid and compacts waste." },
    { id: 4, description: "Breaks down food with chewing and saliva." },
    { id: 5, description: "Stores and eliminates feces." },
    { id: 6, description: "Tube connecting mouth to stomach." },
    { id: 7, description: "Produces bile for fat emulsification." },
    { id: 8, description: "Produces digestive enzymes." },
  ];

  const images = [a, b, c, d, e, f, g, h];

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
            justifyContent: "center",
          }}
        >
          {images.map((img, index) => (
            <DraggableImage
              key={index}
              image={img}
              id={index + 1}
              onSelect={handleSelect}
              isSelected={selectedImage === img} // Pass isSelected prop
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
      </Box>
    </DndProvider>
  );
};

export default Worksheet2;
