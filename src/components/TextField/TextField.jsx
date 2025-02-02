import React from "react";
import { TextField as MuiTextField, Box } from "@mui/material";

// Receiving value and onChange as props
function TextField({ label, value, onChange }) {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <MuiTextField
        id="outlined-textfield"
        label={label}
        type="text"
        value={value} // Use parent-provided value
        onChange={onChange} // Call parent-provided onChange
        fullWidth
      />
    </Box>
  );
}

export default TextField;
