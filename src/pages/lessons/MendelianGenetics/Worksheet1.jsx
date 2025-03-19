import { useState } from "react";
import { TextField, Container, Typography, Box, Grid } from "@mui/material";
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

      console.log(payload);

      const response = await API.post("/worksheets/checker", payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      // Extracting score and worksheet details
      const { score, worksheet, detailed_results } = response.data;

      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        html: `
              <p><strong>Worksheet:</strong> ${worksheet.titles}</p>
                     <p><strong>Worksheet No:</strong> ${
                       worksheet.worksheet_no
                     }</p>
               <p><strong>Your Score:</strong> ${score}</p>
               <ul>
               <p><strong> Your Answer: </strong></p>
                 ${detailed_results
                   .map(
                     (result) =>
                       `<li>${result.user_answer.toUpperCase()} is ${
                         result.is_correct ? "correct ✔️" : "incorrect ❌"
                       }</li>`
                   )
                   .join("")}
               </ul>
             `,
        confirmButtonColor: "#10B981",
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
          A. Homozygous Dominant or Recessive/ Heterozygous
        </Typography>
        <Grid container spacing={2}>
          {["YY", "yyss", "RrYY", "SSss", "ttRv"].map((item, index) => (
            <Grid container item xs={12} key={index} alignItems="center">
              <Grid item xs={2}>
                <Typography>{item}</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  size="small"
                  fullWidth
                  name={`A${index}`}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        {/* {["YY", "yyss", "RrYY", "SSss", "ttRy"].map((item, index) => (
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
        ))} */}

        {/* Section B */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          B. Phenotype vs. Genotype
        </Typography>
        <Grid container spacing={2}>
          {["Tall", "RRss", "Long and axial", "CC", "short and green"].map(
            (item, index) => (
              <Grid container item xs={12} key={index} alignItems="center">
                <Grid item xs={3}>
                  <Typography>{item}</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    size="small"
                    fullWidth
                    name={`B${index}`}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )
          )}
        </Grid>

        {/* {["Tall", "RRss", "Long and axial", "CC", "short and green"].map(
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
        )} */}

        {/* Section C */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          C. For each of the genotype below, determine what phenotype were
          possible to produce.
        </Typography>

        <Grid container spacing={2} mt={2}>
          {/* First Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Yellow (<b>YY</b>) Flower are dominant to white (<b>yy</b>)
            </Typography>
            {["YY", "Yy", "yy"].map((genotype, index) => (
              <Box key={genotype} display="flex" alignItems="center" mt={1}>
                <Typography sx={{ width: 40 }}>{genotype}</Typography>
                <TextField
                  size="small"
                  fullWidth
                  name={`CF${index}`}
                  onChange={handleChange}
                />
              </Box>
            ))}
          </Grid>

          {/* Second Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Brown eyes are dominant to blue
            </Typography>
            {["BB", "Bb", "bb"].map((genotype, index) => (
              <Box key={genotype} display="flex" alignItems="center" mt={1}>
                <Typography sx={{ width: 40 }}>{genotype}</Typography>
                <TextField size="small" fullWidth />
              </Box>
            ))}
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={3}>
          {/* Third Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Round seeds are dominant to wrinkled
            </Typography>
            {["RR", "Rr", "Rr"].map((genotype, index) => (
              <Box key={genotype} display="flex" alignItems="center" mt={1}>
                <Typography sx={{ width: 40 }}>{genotype}</Typography>
                <TextField
                  size="small"
                  fullWidth
                  name={`CS${index}`}
                  onChange={handleChange}
                />
              </Box>
            ))}
          </Grid>

          {/* Fourth Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Curly are recessive to straight hair
            </Typography>
            {["CC", "Cc", "cc"].map((genotype, index) => (
              <Box key={genotype} display="flex" alignItems="center" mt={1}>
                <Typography sx={{ width: 40 }}>{genotype}</Typography>
                <TextField
                  size="small"
                  fullWidth
                  name={`CT${index}`}
                  onChange={handleChange}
                />
              </Box>
            ))}
          </Grid>
        </Grid>

        {/* {[
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
        ))} */}

        {/* Section D */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          D. For each of the phenotype below, write the genotype (remember that
          capital letter for the dominant trait.
        </Typography>

        <Grid container spacing={2} mt={2}>
          {/* First Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Long hair is dominant to short hair
            </Typography>
            {["Short", "Long", "Long"].map((genotype, index) => (
              <Box key={genotype} display="flex" alignItems="center" mt={1}>
                <Typography sx={{ width: 40, mr: 2 }}>{genotype}</Typography>
                <TextField
                  size="small"
                  fullWidth
                  name={`DF${index}`}
                  onChange={handleChange}
                />
              </Box>
            ))}
          </Grid>

          {/* Second Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Fair complexion is dominant over brown
            </Typography>
            {["Fair", "Fair", "Brown"].map((genotype, index) => (
              <Box key={genotype} display="flex" alignItems="center" mt={1}>
                <Typography sx={{ width: 40, mr: 2 }}>{genotype}</Typography>
                <TextField
                  size="small"
                  fullWidth
                  name={`DS${index}`}
                  onChange={handleChange}
                />
              </Box>
            ))}
          </Grid>
        </Grid>

        {/* {["Short", "Long", "Long", "Fair", "Fair", "Brown"].map(
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
        )} */}
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
