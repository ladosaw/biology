import { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Router from "./routes/index";
import Navbar from "./components/nav-section/NavBar";
import Footer from "./components/footer/Footer";
import {
  initializeAnalytics,
  trackPageView,
} from "./components/analytics/Analytics";

const App = () => {
  useEffect(() => {
    initializeAnalytics();
    trackPageView(window.location.pathname, "App.jsx");
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ flex: 1 }}>
        <Box className="my-4">
          {/* <Analytics /> */}
          <Router />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

const AppWrapper = () => (
  <BrowserRouter future={{ v7_relativeSplatPath: true }}>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
