import React, { useState } from "react";
import { TextField as MuiTextField, Box } from "@mui/material";

function TextField({ label }) {
  const [value, setValue] = useState(""); // manage the value with useState

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <MuiTextField
        id="outlined-textfield"
        label={label}
        type="text"
        value={value}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
}

export default TextField;
