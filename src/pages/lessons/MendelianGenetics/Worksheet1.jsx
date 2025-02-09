import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Worksheet1 = () => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    try {
      setLoading(true);
      console.log("User Answers:", answers);
    } catch (error) {
      console.log(error);
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
        onClick={handleSubmit}
        loading={loading}
      >
        Submit
      </LoadingButton>
    </Container>
  );
};

export default Worksheet1;
