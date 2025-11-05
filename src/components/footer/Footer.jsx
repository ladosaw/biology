import * as React from "react";
import { Box, Typography, Link, Grid, Divider } from "@mui/material";
import { ConstantFooter } from "./ConstantFooter";
import QRCodeSVG from "../../assets/qrlink.svg";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#E0E6F7",
        py: { xs: 4, sm: 6 },
        px: { xs: 3, sm: 6, lg: 20 },
        mt: "auto",
      }}
    >
      {/* Top Section */}
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* Left Section: Logo and About */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: "#88C273",
              fontWeight: "bold",
              letterSpacing: 1,
              mb: 1,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            BIO
            <Typography
              variant="h5"
              component="span"
              sx={{
                color: "#353434",
                fontWeight: "bold",
              }}
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
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, md: 0 },
            }}
          >
            BioVerse is an educational theme crafted for teaching centers,
            designed to involve and inspire learners with high-quality lessons.
          </Typography>
        </Grid>

        {/* Right Section: Lesson Links */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "#353434",
              mb: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Lessons
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
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
                  alignItems: { xs: "center", md: "flex-start" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: "#353434",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                  }}
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

        {/* QR Code Section */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 3, md: 4 },
          }}
        >
          <Box
            component="a"
            href="https://pnhsgrade8biology.online"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: 130, sm: 140, md: 150, lg: 180 },
              height: { xs: 130, sm: 140, md: 150, lg: 180 },
              backgroundColor: "#fff",
              borderRadius: 3,
              p: 2,
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                transform: "scale(1.08)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              },
            }}
          >
            <Box
              component="img"
              src={QRCodeSVG}
              alt="BioVerse QR Code"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 4, borderColor: "#D1D5DB" }} />

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" },
          gap: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            fontSize: "0.85rem",
            order: { xs: 2, sm: 1 },
          }}
        >
          © {new Date().getFullYear()} BioVerse. All rights reserved.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 2, sm: 3 },
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-end" },
            order: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            Prepared by Magdalena Fremista
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
