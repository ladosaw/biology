import React from "react";
import { Box } from "@mui/material";
import { Atom } from "react-loading-indicators";

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
      <Atom
        color="#209b20"
        size="medium"
        text="Loading..."
        textColor="#434040"
      />
    </Box>
  );
};

export default LoadingScreen;
