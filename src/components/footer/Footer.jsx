import * as React from "react";
import { Box, Typography, Link, Grid, Divider } from "@mui/material";
import { ConstantFooter } from "./ConstantFooter"; // Assuming lesson data is here

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#E0E6F7", // Original light blue background
        py: 6,
        px: { xs: 4, lg: 20 },
        mt: "auto",
      }}
    >
      <Grid container spacing={4}>
        {/* Left Section: Logo and About */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: "#88C273", fontWeight: "bold", letterSpacing: 1 }}
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
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: "#555",
              lineHeight: 1.6,
            }}
          >
            BioVerse is an educational theme crafted for teaching centers,
            designed to involve and inspire learners with high-quality lessons.
          </Typography>
        </Grid>

        {/* Right Section: Lesson Links */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "#353434",
              mb: 2,
            }}
          >
            Lessons
          </Typography>
          <Grid container spacing={2}>
            {ConstantFooter.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "500", color: "#353434" }}
                >
                  {item.title}
                </Typography>
                <Link
                  href={item.link}
                  underline="hover"
                  sx={{
                    fontSize: "0.875rem",
                    color: "#88C273",
                    textTransform: "capitalize",
                  }}
                >
                  Learn more
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 4, borderColor: "#D1D5DB" }} />

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "#555", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} BioVerse. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography
            variant="body2"
            sx={{ color: "#555", fontSize: "0.85rem" }}
          >
            Prepared by Magdalena Fremista
          </Typography>
          {/* <Link
            href="#"
            underline="hover"
            sx={{
              color: "#555",
              fontSize: "0.85rem",
            }}
          >
            Terms of Use
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{
              color: "#555",
              fontSize: "0.85rem",
            }}
          >
            Privacy Policy
          </Link> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
