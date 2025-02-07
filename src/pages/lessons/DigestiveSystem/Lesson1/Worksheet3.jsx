import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Worksheets3Question } from "./ConstantDigestive.jsx";
import Swal from "sweetalert2";

const Worksheet3 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet3ModalOpen,
}) => {
  const [textFieldAnswers, setTextFieldAnswers] = useState(
    new Array(Worksheets3Question.length).fill("")
  );

  const handleTextFieldChange = (index, value) => {
    const updatedAnswers = [...textFieldAnswers];
    updatedAnswers[index] = value;
    setTextFieldAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setIsModalWorksheet3ModalOpen(false);
    console.log("Submitted Answers:", textFieldAnswers);
    Swal.fire({
      title: "Submission Successful",
      text: "Your answers have been recorded!",
      icon: "success",
    });
  };

  return (
    <Box sx={{ p: 3, textAlign: "center", maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Worksheet {worksheet_no}: {titles}
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        From the information in the lessons, answer the questions about
        digestion briefly. (Think Pair and Share – Answer it with your group
        mates according to what you understand from the lesson).
      </Typography>
      {Worksheets3Question.map((data, index) => (
        <Box key={data.id} sx={{ textAlign: "left", mb: 2 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            {data.question}
          </Typography>
          <TextField
            value={textFieldAnswers[index]}
            onChange={(e) => handleTextFieldChange(index, e.target.value)}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
        onClick={handleSubmit}
      >
        Submit Answers
      </Button>
    </Box>
  );
};

export default Worksheet3;
