import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import { aboutData } from "./constant";

const About = () => {
  return (
    <Box>
      {/* Top Section */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#7BC043",
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis libero
          dignissimos molestias ratione perspiciatis, ipsam nihil ducimus
          cupiditate nulla dicta!
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#7BC043",
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
              color: "#7BC043",
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia saepe
          earum, nulla exercitationem dignissimos fugiat.
        </Typography>
        <Grid container spacing={4}>
          {aboutData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: 2,
                  border: "1px solid #e1e1e1",
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3" sx={{ color: "#7BC043", mb: 1 }}>
                  {item.icon}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
