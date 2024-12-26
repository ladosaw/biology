import * as React from "react";

import { Box, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#E0E6F7", // Light blue background
        p: 3,
        mt: "auto", // Pushes footer to the bottom
      }}
    >
      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: "#88C273", fontWeight: "bold" }}
          >
            BIO
            <Typography
              variant="h5"
              component="span"
              sx={{ color: "#353434", fontWeight: "bold" }}
            >
              Verse
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            BioVerse education theme, built specifically for the education
            centers which is dedicated to teaching and involve learners.
          </Typography>
        </Grid>

        {/* Right Section */}
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={6} md={2} key={index}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Lessons
            </Typography>
            {Array.from({ length: 4 }).map((_, i) => (
              <Typography
                variant="body2"
                key={i}
                sx={{ color: "#555", mt: 0.5 }}
              >
                lesson {i + 1}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          borderTop: "1px solid #ccc",
          mt: 4,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2">Copyrights ©2024 Bioverse</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="#" underline="hover" color="inherit">
            Terms and Use
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Privacy and Policy
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
