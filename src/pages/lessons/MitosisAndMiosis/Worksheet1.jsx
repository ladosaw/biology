import React, { useState } from "react";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import Learn1 from "../../../assets/images/Worksheet1Lesson3/iLearn1.png";
import Learn2 from "../../../assets/images/Worksheet1Lesson3/iLearn2.png";
import Learn3 from "../../../assets/images/Worksheet1Lesson3/iLearn3.png";
import Learn4 from "../../../assets/images/Worksheet1Lesson3/iLearn4.png";
import Learn5 from "../../../assets/images/Worksheet1Lesson3/iLearn5.png";
import Learn6 from "../../../assets/images/Worksheet1Lesson3/iLearn6.png";
import Learn7 from "../../../assets/images/Worksheet1Lesson3/iLearn7.png";
import Learn8 from "../../../assets/images/Worksheet1Lesson3/iLearn8.png";
import Learn9 from "../../../assets/images/Worksheet1Lesson3/iLearn9.png";
import Learn10 from "../../../assets/images/Worksheet1Lesson3/iLearn10.png";
import Learn11 from "../../../assets/images/Worksheet1Lesson3/iLearn11.png";
import Learn12 from "../../../assets/images/Worksheet1Lesson3/iLearn12.png";
import API from "../../../utils/api/api.js";

const images = [
  Learn1,
  Learn2,
  Learn3,
  Learn4,
  Learn5,
  Learn6,
  Learn7,
  Learn8,
  Learn9,
  Learn10,
  Learn11,
  Learn12,
];

const choices = [
  "A. Anaphase",
  "B. Anaphase I",
  "C. Anaphase II",
  "D. Metaphase",
  "E. Metaphase I",
  "F. Metaphase II",
  "G. Prophase",
  "H. Prophase I",
  "I. Prophase II",
  "J. Telophase",
  "K. Telophase I",
  "L. Telophase II",
];

const Worksheet1 = ({ titles, worksheet_no, setIsModalWorksheetModalOpen }) => {
  const [answers, setAnswers] = useState({
    ileard: {},
    guide: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (section, key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const combinedAnswers = [{ ...answers.ileard, ...answers.guide }];
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
        answer: combinedAnswers,
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
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "10px",
        }}
      >
        Worksheet 1a.: iLearn
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "16px",
          color: "#555",
          background: "#f0f0f0",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <strong>Direction:</strong> Use the correct word from the word bank to
        tell the correct stages of cell division shown below. Each word should
        be used only once. Write the letter of your answers on a separate sheet
        of paper. <br />
        <em>
          (Hint: Notice the traces of synapsis and crossing over in the
          chromosomes during meiosis.)
        </em>
      </p>

      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
          background: "#f9f9f9",
          textAlign: "center",
        }}
      >
        {choices.map((choice, index) => (
          <div key={index} style={{ fontSize: "16px", fontWeight: "bold" }}>
            {choice}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "10px",
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span>{index + 1}.</span>
            <img
              src={image}
              alt={`Worksheet ${index + 1}`}
              style={{
                width: "100%",
                maxWidth: "350px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
              }}
            />
            <input
              type="text"
              placeholder={`Enter text for image ${index + 1}`}
              onChange={(e) =>
                handleInputChange(
                  "ileard",
                  index + 1,
                  e.target.value?.toLowerCase()
                )
              }
              style={{
                width: "100%",
                maxWidth: "350px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                textAlign: "center",
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Guide Questions:</h2>
        {[
          "What is the difference of metaphase in mitosis and meiosis?",
          "Where does the crossing-over happen and cite the importance of crossing over?",
          "How many daughter cells are produced during meiosis division?",
          "What will happen if homologous chromosomes do not separate during the anaphase stage?",
        ].map((question, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>
              {index + 1}. {question}
            </p>
            <textarea
              rows="3"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              placeholder="Enter your answer here"
              onChange={(e) =>
                handleInputChange(
                  "guide",
                  `guide${index + 1}`,
                  e.target.value?.toLowerCase()
                )
              }
            />
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default Worksheet1;
