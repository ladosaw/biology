import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

const stages = [
  {
    label: "Overview",
    description:
      "Mitosis is a part of the cell cycle in which replicated chromosomes are separated into two new nuclei. Cell division by mitosis is an equational division which gives rise to genetically identical cells in which the total number of chromosomes is maintained.",
    image: "/images/Mitosis_Stages.png",
  },
  {
    label: "Interphase",
    description:
      "The cell grows and replicates its DNA in preparation for mitosis.",
    image: "/images/Interphase.png",
  },
  {
    label: "Prophase",
    description:
      "Chromosomes condense, and the nuclear envelope begins to disintegrate.",
    image: "/images/Prophase.png",
  },
  {
    label: "Prometaphase",
    description:
      "Spindle fibers attach to chromosomes, aligning them for separation.",
    image: "/images/Prometaphase.png",
  },
  {
    label: "Metaphase",
    description:
      "Chromosomes align at the metaphase plate, ready to be divided.",
    image: "/images/Prometaphase.png",
  },
  {
    label: "Anaphase",
    description:
      "Sister chromatids separate and move to opposite poles of the cell.",
    image: "/images/Anaphase.png",
  },
  {
    label: "Telophase & Cytokinesis",
    description:
      "Nuclei form, and the cell divides into two identical daughter cells.",
    image: "/images/telophase_cytokinesis.png",
  },
];

const MitosisStages = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const handleNext = () =>
    setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));
  const handlePrev = () => setCurrentStage((prev) => Math.max(prev - 1, 0));

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Stages of Mitosis
      </Typography>
      <Box
        sx={{
          display: "flex", // Enables flexbox
          justifyContent: "center", // Centers the image horizontally
          alignItems: "center", // Centers the image vertically (optional, useful if more elements are added)
          mb: 4, // Adds margin below the image
        }}
      >
        <Box
          component="img"
          src={stages[currentStage].image}
          alt={stages[currentStage].label}
          sx={{
            maxWidth: "100%", // Ensures the image doesn't exceed the container's width
            maxHeight: "300px", // Limits height for consistent scaling if needed
            objectFit: "contain", // Ensures the image retains its aspect ratio
          }}
        />
      </Box>
      <Typography variant="h5" gutterBottom>
        {stages[currentStage].label}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {stages[currentStage].description}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={currentStage === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentStage === stages.length - 1}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default MitosisStages;
