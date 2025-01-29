import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import image from "../../../../assets/images/DigestiveWorksheet.png";
import { Box, Typography, Paper, Grid } from "@mui/material";
import TextField from "../../../../components/TextField/TextField";
import { WorksheetsQuestion1 } from "./ConstantDigestive.jsx";

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
];

const Organ = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "organ",
    item: { name },
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
      }}
    >
      {name}
    </Box>
  );
};

const DropBox = ({ id, onDrop, organ }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "organ",
    drop: (item) => onDrop(id, item.name),
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
      {organ === undefined ? `${id}. Drop here` : `${id}. ${organ}`}
    </Paper>
  );
};

const Worksheet = () => {
  const [assigned, setAssigned] = useState({});
  const [availableOrgans, setAvailableOrgans] = useState(initialOrgans);

  const handleDrop = (id, organName) => {
    const previousOrgan = assigned[id];
    if (previousOrgan) {
      setAvailableOrgans((prev) => [...prev, previousOrgan]);
    }

    setAssigned((prev) => ({ ...prev, [id]: organName }));
    setAvailableOrgans((prev) => prev.filter((organ) => organ !== organName));
  };

  return (
    <>
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
              <Organ key={organ} name={organ} />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ position: "relative", width: "100%", maxWidth: "960px" }}
            >
              <img
                src={image}
                alt="Digestive System"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DropBox id={1} onDrop={handleDrop} organ={assigned[1]} />
                <DropBox id={2} onDrop={handleDrop} organ={assigned[2]} />
                <DropBox id={3} onDrop={handleDrop} organ={assigned[3]} />
                <DropBox id={4} onDrop={handleDrop} organ={assigned[4]} />
                <DropBox id={5} onDrop={handleDrop} organ={assigned[5]} />
              </Grid>
              <Grid item xs={6}>
                <DropBox id={6} onDrop={handleDrop} organ={assigned[6]} />
                <DropBox id={7} onDrop={handleDrop} organ={assigned[7]} />
                <DropBox id={8} onDrop={handleDrop} organ={assigned[8]} />
                <DropBox id={9} onDrop={handleDrop} organ={assigned[9]} />
                <DropBox id={10} onDrop={handleDrop} organ={assigned[10]} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DndProvider>

      <Box
        sx={{ borderTop: 1, borderColor: "divider", p: 3, textAlign: "center" }}
      >
        <Typography variant="body1" color="textSecondary" paragraph>
          <strong>B. Directions:</strong> Read the sentences below, then write
          the number of events in the digestion process. Write numbers 1-8
          before the sentences.
        </Typography>

        {WorksheetsQuestion1.map((question) => (
          <TextField label={question} />
        ))}
      </Box>
    </>
  );
};

export default Worksheet;
