import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

const Timer = ({ initialTime = 300, onSubmit }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          if (onSubmit) {
            onSubmit();
          }
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onSubmit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      sx={{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4">{formatTime(timeLeft)}</Typography>
    </Box>
  );
};

export default Timer;
