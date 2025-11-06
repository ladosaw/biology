import { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import API from "../../../utils/api/api.js";
import SubmitDatePicker from "../../../components/date-input/SubmitDatePicker.jsx";

const Worksheet1 = ({
  titles,
  worksheet_no,
  setIsModalWorksheetModalOpen,
  setIsModalWorksheet2ModalOpenNext,
}) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitDate, setSubmitDate] = useState(null);

  const questionMap = {
    // Section A
    A0: "YY",
    A1: "yyss",
    A2: "RrYY",
    A3: "SSss",
    A4: "ttRv",

    // Section B
    B0: "Tall",
    B1: "RRss",
    B2: "Long and axial",
    B3: "CC",
    B4: "short and green",

    // Section C - Flower
    CF0: "YY",
    CF1: "Yy",
    CF2: "yy",

    // Section C - Eyes (no input name was defined originally for this!)
    // You should add `name={`CE${index}`}` in your input fields
    CE0: "BB",
    CE1: "Bb",
    CE2: "bb",

    // Section C - Seeds
    CS0: "RR",
    CS1: "Rr",
    CS2: "Rr",

    // Section C - Hair
    CT0: "CC",
    CT1: "Cc",
    CT2: "cc",

    // Section D - Hair length
    DF0: "Short",
    DF1: "Long",
    DF2: "Long",

    // Section D - Complexion
    DS0: "Fair",
    DS1: "Fair",
    DS2: "Brown",
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitDate(null);
  };

  const inputAnswer = Object.keys(answers).map((key) => ({
    question: questionMap[key] || "",
    answer: answers[key],
  }));

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
        inputAnswer,
        user_id,
        titles,
        worksheet_no,
        submit_date: submitDate?.toISOString(),
        isLowerCase: false,
      };

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
        showConfirmButton: false,
        showCloseButton: true,
        html: `
         <p><strong>Worksheet:</strong> ${worksheet.titles || titles}</p>
         <p><strong>Worksheet No:</strong> ${
           worksheet.worksheet_no || worksheet_no
         }</p>
         <p><strong>Score:</strong> ${score}</p>
         <div style="margin-top:20px; display:flex-direction:column; justify-content:center; gap:10px;">
           ${detailed_results
             .map(
               (result, index) => `
             <div class="result-item">
               <span class="question-index">${index + 1}.</span>
               <span class="result ${
                 result.is_correct ? "correct" : "incorrect"
               }">
                 ${result.user_answer} -
                 ${result.is_correct ? "Correct ✔️" : "Incorrect ❌"}
               </span>
             </div>
           `
             )
             .join("")}
            
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
          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              Swal.close();
              setIsModalWorksheet2ModalOpenNext(true);
            });
          }
        },
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
        Activity 1: Mendelian Genetics
      </Typography>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Pencil Icon */}

        {/* Content */}
        <div className="flex flex-col w-full">
          {/* Directions Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-full text-gray-800">
            <p className="text-sm font-bold mb-2 text-left text-gray-700">
              Directions:
            </p>

            <p className="text-sm mb-4 text-gray-800">
              Look at each genetic combination. Decide if it shows a{" "}
              <span className="font-semibold text-green-600">Genotype</span> or{" "}
              <span className="font-semibold text-purple-600">Phenotype</span>,
              and whether it is{" "}
              <span className="font-semibold text-blue-600">
                Homozygous Dominant
              </span>
              ,{" "}
              <span className="font-semibold text-red-600">
                Homozygous Recessive
              </span>
              , or{" "}
              <span className="font-semibold text-yellow-600">
                Heterozygous
              </span>
              .
            </p>

            <p className="text-sm mb-4 text-gray-800">
              Type your answer in the blank beside each item.
            </p>

            <p className="text-sm text-gray-800">
              When you're done, click{" "}
              <span className="font-semibold text-blue-600">Submit</span> to
              check your answers.
            </p>
          </div>
        </div>
      </div>

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
                  value={answers[`A${index}`] || ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

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
                    value={answers[`B${index}`] || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )
          )}
        </Grid>

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
                  value={answers[`CF${index}`] || ""}
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
                <TextField
                  size="small"
                  fullWidth
                  name={`CE${index}`}
                  value={answers[`CE${index}`] || ""}
                  onChange={handleChange}
                />
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
                  value={answers[`CS${index}`] || ""}
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
                  value={answers[`CT${index}`] || ""}
                  onChange={handleChange}
                />
              </Box>
            ))}
          </Grid>
        </Grid>

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
                  value={answers[`DF${index}`] || ""}
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
                  value={answers[`DS${index}`] || ""}
                  onChange={handleChange}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 4, width: "100%" }} />

      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
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
    </Container>
  );
};

export default Worksheet1;
