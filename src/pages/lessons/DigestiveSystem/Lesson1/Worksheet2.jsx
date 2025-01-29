import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Typography,
  Paper,
  Grid,
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

// Draggable Item component
const DraggableItem = ({ type, value }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { type, value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      sx={{
        p: 2,
        bgcolor: "primary.main",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "primary.dark",
        },
        transition: "all 0.2s ease",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {value}
    </Box>
  );
};

// Drop Zone component
const DropZone = ({ type, onDrop, label, currentValue }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => onDrop(item.value),
    canDrop: (item) => item.type === type,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Paper
      ref={drop}
      sx={{
        width: "160px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed",
        borderColor: isOver ? "success.main" : "text.disabled",
        bgcolor: isOver ? "success.light" : "background.paper",
        borderRadius: "8px",
        fontWeight: "medium",
        transition: "all 0.2s ease",
      }}
    >
      {currentValue || label || "Drop here"}
    </Paper>
  );
};

// Worksheet component
const Worksheet2 = () => {
  const [letters, setLetters] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  });
  const [numbers, setNumbers] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  });

  const handleDrop = (value, type, id) => {
    if (type === "letter") {
      setLetters((prev) => ({ ...prev, [id]: value }));
    } else if (type === "number") {
      setNumbers((prev) => ({ ...prev, [id]: value }));
    }
  };

  const data = [
    {
      id: 1,
      picture: a,
      letter: "A",
      description:
        "1. I am an organ that is a j-shaped organ found at the end of the esophagus on the upper left side of the abdomen or abdominal cavity that produces gastric juices and acids.",
    },
    {
      id: 2,
      picture: b,
      letter: "B",
      description:
        "2. I am and where food is mixed with intestinal juices containing enzymes that help digestion. It is where the final digestion and absorption of nutrients happen.",
    },
    {
      id: 3,
      picture: c,
      letter: "C",
      description:
        "3. I am an organ where liquid, electrolytes, and some vitamins are reabsorbed from undigested food. It secretes mucus to aid in the formation of feces and maintains alkaline conditions. This is the last segment of the gastrointestinal tract that completes absorption and compacts waste. ",
    },
    {
      id: 4,
      picture: d,
      letter: "D",
      description:
        "4. I am an organ where food is mechanically broken down by chewing chewed pulp and the tongue helps in pushing the bits, broken into small pieces for easier digestion. Here, the saliva softens the food into the pharynx.",
    },
    {
      id: 5,
      picture: e,
      letter: "E",
      description:
        "5. I am an organ where waste or remaining materials become more solid known as feces will be temporarily stored and eliminated.",
    },
    {
      id: 6,
      picture: f,
      letter: "F",
      description:
        "6. I am a tube that connects the mouth and stomach. It carries the food down to the stomach for temporary storage and further digestion",
    },
    {
      id: 7,
      picture: g,
      letter: "G",
      description:
        "7. I am the biggest organ that produces bile for the emulsification of fats into droplets.",
    },
    {
      id: 8,
      picture: h,
      letter: "H",
      description:
        "8. I am an organ that makes three diverse kinds of enzymes namely amylase, peptidase, and lipase released through a pancreatic duct that aids in the digestion of all three organic compounds such as carbohydrates, proteins, and fats, respectively. The process takes about half of a liter of digestive juices each day",
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Worksheet 2: WHO AM I?
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          <strong>Directions:</strong> On column A is the image/picture of the
          organs of digestion and column B is the function of each organ.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Match column <strong>A</strong> with images of the organs with column{" "}
          <strong>B</strong> with function by writing the name of the organ and
          the corresponding number in column 2
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Example answer: Liver - 1
        </Typography>

        <Box
          sx={{
            display: "block",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
              <DraggableItem key={letter} type="letter" value={letter} />
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {["1", "2", "3", "4", "5", "6", "7", "8"].map((number) => (
              <DraggableItem key={number} type="number" value={number} />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Picture Organ</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <strong>{row.letter}</strong>
                      <img src={row.picture} alt={row.picture} />
                    </TableCell>
                    <TableCell>
                      <DropZone
                        type="letter"
                        onDrop={(value) => handleDrop(value, "letter", row.id)}
                        label={`Letter: ${letters[row.id] || "Drop here"}`}
                        currentValue={letters[row.id]}
                      />
                      <DropZone
                        type="number"
                        onDrop={(value) => handleDrop(value, "number", row.id)}
                        label={`Number: ${numbers[row.id] || "Drop here"}`}
                        currentValue={numbers[row.id]}
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
      </Box>
    </DndProvider>
  );
};

export default Worksheet2;
