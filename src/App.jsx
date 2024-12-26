import * as React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "./components/nav-section/NavBar";

import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index";

const App = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Container maxWidth={false}>
        <Navbar />
        <Box sx={{ my: 4 }}>
          <Router />
        </Box>
      </Container>
    </BrowserRouter>
  );
};

export default App;
