import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

const About = () => {
  return (
    <Box>
      {/* Top Section */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#88C273",
          color: "white",
          padding: 4,
          paddingY: 5,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          BIO
          <Typography
            variant="h3"
            component="span"
            sx={{ color: "#353434", fontWeight: "bold" }}
          >
            Verse
          </Typography>
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "600px", mx: "auto", mb: 4 }}
        >
          Scan and Learn: A Supplementary Materials in Quarter 4 For Grade 8
          Linked on Internet Using QR Codes
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#88C273",
              fontWeight: "bold",
              mr: 2,
              "&:hover": { backgroundColor: "#e1e1e1" },
            }}
          >
            Read More
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "#88C273",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e1e1e1" },
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Paper>

      {/* About Us Section */}
      <Box sx={{ padding: 5 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", maxWidth: "800px", mx: "auto", mb: 4 }}
        >
          <Typography variant="h6" component="span" sx={{ color: "#88C273" }}>
            BIO
            <Typography variant="h6" component="span" sx={{ color: "#353434" }}>
              Verse
            </Typography>
          </Typography>{" "}
          is your go-to platform for Grade 8 biology resources, study guides,
          and interactive learning tools. We aim to simplify biology concepts
          and foster a vibrant community for students and educators to connect,
          learn, and grow together.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
