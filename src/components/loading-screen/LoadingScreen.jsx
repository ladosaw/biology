import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(5px)",
      }}
      aria-live="assertive"
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default LoadingScreen;
