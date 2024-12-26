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
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { menuItems } from "./constant";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = React.useState(null);
  const [currentSubmenu, setCurrentSubmenu] = React.useState(null); // To track which submenu is open
  const navigate = useNavigate(); // Use the navigate hook

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null); // Close submenu as well
    setCurrentSubmenu(null); // Reset the current submenu
  };

  const handleSubmenuOpen = (event, item) => {
    setSubmenuAnchorEl(event.currentTarget);
    setCurrentSubmenu(item); // Set the current submenu to open
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
    handleMenuClose(); // Close the menu after navigation
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
            color="black"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Biology
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
              {item.submenu ? (
                <Button
                  sx={{ mx: 1, color: "black" }}
                  onClick={(e) => handleSubmenuOpen(e, item)}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  sx={{ mx: 1, color: "black" }}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </Button>
              )}
            </motion.div>
          ))}
        </Box>

        {/* Submenu for Lessons */}
        <Menu
          anchorEl={submenuAnchorEl}
          open={Boolean(submenuAnchorEl)}
          onClose={handleSubmenuClose}
        >
          {currentSubmenu?.submenu?.map((subItem, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleNavigation(subItem.path); // Navigate when submenu item is clicked
                handleSubmenuClose(); // Close the submenu after navigation
              }}
            >
              {subItem.label}
            </MenuItem>
          ))}
        </Menu>

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
                  {menuItems.map((item) => (
                    <React.Fragment key={item.id}>
                      {item.submenu ? (
                        <MenuItem onClick={(e) => handleSubmenuOpen(e, item)}>
                          {item.label}
                        </MenuItem>
                      ) : (
                        <MenuItem onClick={() => handleNavigation(item.path)}>
                          {item.label}
                        </MenuItem>
                      )}
                    </React.Fragment>
                  ))}
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
