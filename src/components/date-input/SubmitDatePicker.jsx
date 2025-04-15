import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Box } from "@mui/material";
import moment from "moment-timezone";

const SubmitDatePicker = ({ value, onChange, defaultToday = true }) => {
  const today = moment.tz("Asia/Manila");
  const resolvedValue = value ?? (defaultToday ? today : null);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <DatePicker
          label="Submit Date"
          value={resolvedValue}
          onChange={(newValue) =>
            onChange(moment.tz(newValue.toISOString(), "Asia/Manila"))
          }
          slotProps={{ textField: { size: "small" } }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SubmitDatePicker;
