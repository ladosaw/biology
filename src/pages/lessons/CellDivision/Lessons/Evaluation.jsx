import React, { useState } from "react";
import axios from "axios";

const questions = [
  {
    id: 1,
    question: "How many daughter cells are produced after mitosis?",
    choices: ["2", "4", "23", "46"],
    correctAnswer: "B" || "b",
  },
  {
    id: 2,
    question: "Which of the following cells undergo mitosis? ",
    choices: [
      "Cardiac muscle",
      "sperm and egg cell",
      "skin cells",
      "Both A and C",
    ],
    correctAnswer: "B" || "b",
  },
  {
    id: 3,
    question:
      "Which checkpoint in the cell ensures that the cell is ready to enter the M phase?",
    choices: ["G1 Phase", "G2 Phase", "M Checkpoint", "5 checkpoint"],
    correctAnswer: "A" || "a",
  },
  {
    id: 4,
    question: "Which sequence of the cell cycle is common to eukaryotes?",
    choices: [
      "G1 to G2 to S to M to cytokinesis",
      "G1 to S to M to G2 to cytokinesis ",
      "G1 to M to G2 to S to cytokinesis ",
      "G1 to S to G2 to M to cytokinesis",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 5,
    question: "Where does the duplication of genetic materials happen?",
    choices: ["G1 Phase", "G2 Phase", "M Checkpoint", "5 checkpoint"],
    correctAnswer: "B" || "b",
  },
  {
    id: 6,
    question: "What is not a function of mitosis?",
    choices: [
      "growth ",
      "production of reproductive cell",
      "wound repair",
      "replacement of old worn-out-cell",
    ],
    correctAnswer: "C" || "c",
  },
  {
    id: 7,
    question: "Which is the correct sequence of steps in the cell cycle? ",
    choices: [
      "Anaphase, prophase, interphase, metaphase, telophase ",
      "Interphase, anaphase, metaphase, prophase, telophase",
      "Interphase, prophase, metaphase, anaphase, telophase ",
      "Prophase, metaphase,  interphase, anaphase, telophase",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 8,
    question: "Which of the following statements of miosis is correct?",
    choices: [
      "The centromere of the chromosome separates during metaphase.",
      "The chromatid number in a daughter cell is the same as in the parent cell.",
      "The chromosome number in a daughter cell is the same as that in the parent cell. ",
      "The chromosome number in a daughter cell is the same as the chromatid number in the parent cell.",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 9,
    question:
      "Which of the following is true about plant cell division that differentiates it from animal cell division?",
    choices: [
      "Formation of cell plate ",
      "Inability to undergo cytokinesis ",
      "Formation of cleavage furrow  ",
      "Production of four new cells after mitosis",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 10,
    question:
      "Your teacher asked you to identify a specimen's mitosis stage under the microscope. You observe that instead of a typical round cell shape, the cell has a narrow middle part that almost separates into two bulging ends, which looks like the number 8. The cell is undergoing _______",
    choices: ["Anaphase", "Metaphase", "Cytokinesis", "Prophase"],
    correctAnswer: "b" || "B",
  },
];

const Evaluation = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [invalidQuestions, setInvalidQuestions] = useState([]); // Track unanswered questions

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
    setInvalidQuestions(invalidQuestions.filter((qid) => qid !== id)); // Remove from invalid state if answered
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((q) => {
      if (
        answers[q.id]?.trim().toLowerCase() === q.correctAnswer.toLowerCase()
      ) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  const handleSubmit = async () => {
    const unanswered = questions.filter((q) => !answers[q.id]);

    if (unanswered.length > 0) {
      setInvalidQuestions(unanswered.map((q) => q.id));
      alert("Please answer all questions before submitting.");
      return;
    }
    console.log("Score:", score);

    calculateScore();
    setSubmitted(true);

    console.log("Submitting answers...", answers);

    // try {
    //   await axios.post("API_ENDPOINT_URL", {
    //     answers,
    //     score,
    //     totalQuestions: questions.length,
    //   });
    //   alert("Answers and score submitted successfully!");
    // } catch (error) {
    //   alert("Error submitting answers.");
    //   console.error(error);
    // }
  };

  const choiceLetters = ["A", "B", "C", "D"];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Mitosis</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              placeholder="Answer"
              className={`border p-2 rounded-md w-full md:w-48 focus:outline-none ${
                invalidQuestions.includes(q.id)
                  ? "border-red-500 focus:border-red-500"
                  : "focus:ring focus:border-blue-300"
              }`}
            />
            <p className="font-medium flex-1">{q.question}</p>
          </div>
          <ul className="mt-2 pl-6">
            {q.choices.map((choice, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 font-bold">{choiceLetters[index]}.</span>
                <span>{choice}</span>
              </li>
            ))}
          </ul>
          {/* {submitted && (
            <p
              className={
                answers[q.id]?.trim().toLowerCase() ===
                q.correctAnswer.toLowerCase()
                  ? "text-green-600 mt-2"
                  : "text-red-600 mt-2"
              }
            >
              {answers[q.id]?.trim().toLowerCase() ===
              q.correctAnswer.toLowerCase()
                ? "Correct!"
                : `Incorrect. Correct answer: ${q.correctAnswer}`}
            </p>
          )}  */}
        </div>
      ))}
      {submitted && (
        <p className="text-xl font-bold text-center">
          Your Score: {score}/{questions.length}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 w-full md:w-auto text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default Evaluation;
