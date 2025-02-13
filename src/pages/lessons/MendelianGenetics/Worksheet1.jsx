import { useState } from "react";
import { TextField, Container, Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";

const Worksheet1 = ({ titles, worksheet_no, setIsModalWorksheetModalOpen }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const user_id = localStorage.getItem("id");
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
          confirmButtonColor: "#dc2626",
        });
        setIsLoading(false);
        setIsModalWorksheetModalOpen(false);
        return;
      }

      const payload = {
        answer: [answers],
        user_id,
        titles,
        worksheet_no,
      };

      const response = await API.post("/worksheets/checker", payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      // Extracting score and worksheet details
      const { score, worksheet } = response.data;
      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        html: `<p><strong>Worksheet:</strong> ${worksheet.titles}</p>
                      <p><strong>Worksheet No:</strong> ${worksheet.worksheet_no}</p>
                      <p><strong>Your Score:</strong> ${score}</p>
                    `,
        confirmButtonColor: "#10B981",
      }).then(() => {
        navigate("/lessons");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.message ||
          "An error occurred while submitting the answers.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
      setIsModalWorksheetModalOpen(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ bgcolor: "white", p: 4, borderRadius: 2, mt: 5 }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Genetics Worksheet
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Identify whether Genotype: Homozygous Dominant or Recessive, Genotype or
        Phenotype the following items. Write your answer in the blank provided.
      </Typography>

      <Box>
        {/* Section A */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          A. Homozygous, Heterozygous
        </Typography>
        {["YY", "yyss", "RrYY", "SSss", "ttRy"].map((item, index) => (
          <TextField
            fullWidth
            key={index}
            label={`${index + 1}. ${item}`}
            variant="outlined"
            size="small"
            margin="dense"
            name={`A${index}`}
            onChange={handleChange}
          />
        ))}

        {/* Section B */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          B. Phenotype vs. Genotype
        </Typography>
        {["Tall", "RRss", "Long and axial", "CC", "short and green"].map(
          (item, index) => (
            <TextField
              fullWidth
              key={index}
              label={`${index + 1}. ${item}`}
              variant="outlined"
              size="small"
              margin="dense"
              name={`B${index}`}
              onChange={handleChange}
            />
          )
        )}

        {/* Section C */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          C. Determine the Phenotype
        </Typography>
        {[
          "YY",
          "Yy",
          "Yy",
          "BB",
          "Bb",
          "bb",
          "RR",
          "Rr",
          "Rr",
          "CC",
          "Cc",
          "cc",
        ].map((item, index) => (
          <TextField
            fullWidth
            key={index}
            label={item}
            variant="outlined"
            size="small"
            margin="dense"
            name={`C${index}`}
            onChange={handleChange}
          />
        ))}

        {/* Section D */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          D. Write the Genotype
        </Typography>
        {["Short", "Long", "Long", "Fair", "Fair", "Brown"].map(
          (item, index) => (
            <TextField
              fullWidth
              key={index}
              label={item}
              variant="outlined"
              size="small"
              margin="dense"
              name={`D${index}`}
              onChange={handleChange}
            />
          )
        )}
      </Box>

      <LoadingButton
        variant="contained"
        color="primary"
        sx={{
          mt: 4,
          ml: "auto", // This will push the button to the right
          display: "block", // Ensures the button takes up its own line
        }}
        loading={isLoading}
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
    </Container>
  );
};

export default Worksheet1;
