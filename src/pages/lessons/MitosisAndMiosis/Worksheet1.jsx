import React, { useState } from "react";
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
import { LoadingButton } from "@mui/lab";

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

const Worksheet1 = () => {
  const [answers, setAnswers] = useState({});
  const [guideAnswers, setGuideAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleGuideChange = (index, value) => {
    setGuideAnswers({ ...guideAnswers, [index]: value });
  };

  const handleSubmit = () => {
    try {
      // setIsLoading(true);
      console.log("Submitted Answers:", answers);
      console.log("Guide Questions Answers:", guideAnswers);
      // setIsLoading(false);
    } catch (error) {}
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
              value={answers[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
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
              onChange={(e) => handleGuideChange(index, e.target.value)}
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
