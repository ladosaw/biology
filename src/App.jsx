import * as React from "react";
import { Container, Box } from "@mui/material";

import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index";

import Navbar from "./components/nav-section/NavBar";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Container maxWidth="xl" sx={{ flex: 1 }}>
          <Box className="my-4">
            <Router />
          </Box>
        </Container>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
