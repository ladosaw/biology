import { useState } from "react";
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import { Worksheets3Question } from "./ConstantDigestive.jsx";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import API from "../../../../utils/api/api.js";
import SubmitDatePicker from "../../../../components/date-input/SubmitDatePicker.jsx";

const Worksheet3 = ({
  titles,
  worksheet_no,
  setIsModalWorksheet3ModalOpen,
  setIsModalWorksheet2ModalOpenPrevious,
  setEvaluationOpenNext,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);
  const [textFieldAnswers, setTextFieldAnswers] = useState(
    new Array(Worksheets3Question.length).fill("")
  );

  const handleTextFieldChange = (index, value) => {
    const updatedAnswers = [...textFieldAnswers];
    updatedAnswers[index] = value;
    setTextFieldAnswers(updatedAnswers);
  };

  const handleReset = () => {
    setTextFieldAnswers(new Array(Worksheets3Question.length).fill(""));
    setSubmitDate(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Ensure all text fields are filled
      if (textFieldAnswers.some((answer) => answer.trim() === "")) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Answers",
          text: "Please answer all text fields before submitting.",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      const user_id = localStorage.getItem("id");
      const authToken = localStorage.getItem("authToken");

      // Creating the required answer format
      const formattedAnswers = Worksheets3Question.map((question, index) => ({
        id: question.id,
        question: question.question,
        answer: textFieldAnswers[index],
      }));

      const payload = {
        user_id,
        titles,
        worksheet_no: worksheet_no.toString(),
        answer: formattedAnswers,
        submit_date: submitDate?.toISOString(),
      };

      const response = await API.post("/worksheets", payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      // Extracting message and worksheet details
      const { message } = response.data;

      setIsModalWorksheet3ModalOpen(false);

      Swal.fire({
        title: "Submission Successful",
        icon: "success",
        showConfirmButton: false,
        showCloseButton: true,
        html: `
        <p>${message || "Your answers have been recorded!"}</p>
         <div style="margin-top:20px; display:flex-direction:column; justify-content:center; gap:10px;">
            <button 
                id="previousBtn" 
                class="swal2-confirm swal2-styled" 
                style="
                  background-color: transparent;
                  color: #3B82F6;
                  border: 1.5px solid #3B82F6;
                  font-size:16px;
                  border-radius:6px;
                  min-width:auto;">
                  Previous
              </button>

              <button 
                id="nextBtn" 
                class="swal2-confirm swal2-styled" 
                style="
                  background-color:#3B82F6;
                  font-size:16px;
                  border-radius:6px;
                  min-width:auto; ">
                  Next
              </button>
         </div>
        `,
        didRender: () => {
          const nextBtn = document.getElementById("nextBtn");
          const previousBtn = document.getElementById("previousBtn");
          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              Swal.close();
              setEvaluationOpenNext(true);
            });
          }
          if (previousBtn) {
            previousBtn.addEventListener("click", () => {
              Swal.close();
              setIsModalWorksheet2ModalOpenPrevious(true);
            });
          }
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error || "An error occurred while submitting the answers.",
        confirmButtonColor: "#dc2626",
      });
      setIsLoading(false);
      // setIsModalWorksheet3ModalOpen(false);
    } finally {
      setIsLoading(false);
      // setIsModalWorksheet3ModalOpen(false);
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: "center", maxWidth: "600px", mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Activity {worksheet_no}: {titles}
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

      <Divider sx={{ mt: 4, width: "100%" }} />

      <Box
        sx={{
          mt: 4,
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        {/* <SubmitDatePicker value={submitDate} onChange={setSubmitDate} /> */}
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          disabled={isLoading}
        >
          Reset
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Worksheet3;
