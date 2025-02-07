import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const initialOrganisms = [
  "Grass",
  "Grasshopper",
  "Rat",
  "Carrots",
  "Rabbit",
  "Fox",
  "Lion",
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

const DropZone = ({ id, assignedOrganism, onDrop }) => (
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
    {assignedOrganism || `Drop here (${id})`}
  </Paper>
);

const FoodChainWorksheet = () => {
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
        {[1, 2, 3].map((id) => (
          <React.Fragment key={id}>
            <Grid item xs={4} sm={2}>
              <DropZone
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

      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        marginTop={3}
      >
        {[4, 5, 6, 7].map((id) => (
          <React.Fragment key={id}>
            <Grid item xs={4} sm={2}>
              <DropZone
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

      <Box sx={{ marginTop: 8, textAlign: "center" }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleReset}
          sx={{
            padding: "8px 16px",
            borderRadius: "12px",
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default FoodChainWorksheet;
