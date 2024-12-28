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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { menuItems } from "./constant";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = React.useState(null);
  const [currentSubmenu, setCurrentSubmenu] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
    setCurrentSubmenu(null);
  };

  const handleSubmenuOpen = (event, item) => {
    setSubmenuAnchorEl(event.currentTarget);
    setCurrentSubmenu(item);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
    handleMenuClose();
  };

  const isActive = (path) => location.pathname === path;

  const isLessonActive = () => {
    const lessonItem = menuItems.find((item) => item.id === "lessons");
    return lessonItem?.submenu?.some((subItem) => isActive(subItem.path));
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", lg: "flex" }, ml: "auto" }}>
          {menuItems.map((item) => (
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
          ))}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", lg: "none" }, ml: "auto" }}>
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
              >
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: isActive(item.path) ? "#88C273" : "black",
                    }}
                  >
                    {item.label}
                  </MenuItem>
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
