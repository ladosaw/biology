import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { menuItems } from "./constant";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get user role and token from localStorage
  const userRole = localStorage.getItem("role");
  const authToken = localStorage.getItem("authToken");

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigation = (path) => {
    if (path) navigate(path);
    handleMenuClose();
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Remove auth_token and user_role from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    // Redirect to login page
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#f5f5f5",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="h2"
          sx={{ color: "#88C273", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => handleNavigation("/")}
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

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", lg: "flex" }, ml: "auto" }}>
          {menuItems.map(
            (item) =>
              (item.id !== "admin" || userRole === "admin") && (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    sx={{
                      mx: 1,
                      color: isActive(item.path) ? "#88C273" : "black",
                    }}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              )
          )}
          {authToken && ( // Only show Logout if the user is authenticated
            <>
              <Divider sx={{ my: 1 }} /> {/* Divider before Logout */}
              <Button
                sx={{
                  mx: 1,
                  color: "black",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            ml: "auto",
            position: "relative",
          }}
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <IconButton edge="end" aria-label="menu" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </motion.div>
          <AnimatePresence>
            {anchorEl && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  minWidth: "200px",
                }}
              >
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      padding: { xs: "12px", sm: "16px" },
                      minWidth: { xs: "200px", sm: "250px" },
                      borderRadius: "8px",
                    },
                  }}
                >
                  {menuItems.map(
                    (item) =>
                      (item.id !== "admin" || userRole === "admin") && (
                        <MenuItem
                          key={item.id}
                          onClick={() => handleNavigation(item.path)}
                          sx={{
                            color: isActive(item.path) ? "#88C273" : "black",
                          }}
                        >
                          {item.label}
                        </MenuItem>
                      )
                  )}
                  {authToken && ( // Show Logout in mobile menu if the user is authenticated
                    <>
                      <Divider sx={{ my: 1 }} /> {/* Divider before Logout */}
                      <MenuItem onClick={handleLogout} sx={{ color: "black" }}>
                        Logout
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
