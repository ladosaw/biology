import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  // Responsive dialog
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "500px", // Maximum width for larger screens
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%", // For mobile screens
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80%", // For tablet screens and up
    },
  },
}));

export default function WorksheetModal({ open, onClose, children, title }) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {/* Dialog Title */}
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>

      {/* Close Button at the Top Right */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      {/* Dialog Content - Dynamically passing children */}
      <DialogContent dividers>{children}</DialogContent>

      {/* Dialog Actions (Buttons at the Bottom) */}
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          onClick={() => {
            alert("Submitted!");
          }}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
