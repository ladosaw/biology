import React, { useState } from "react";
import axios from "axios";

const questions = [
  {
    id: 1,
    question: "What does the word 'inherit' mean?",
    choices: [
      "The passage of heredity material DNA to offspring.",
      "To pass characteristics through the transmission of heredity material known as DNA.",
      "To receive a characteristic through the transfusion of heredity material.",
      "To receive characteristics through the transfusion of heredity material.",
    ],
    correctAnswer: "B" || "b",
  },
  {
    id: 2,
    question: "Which does not describe Gregor Mendel?",
    choices: [
      "An Austrian Monk",
      "Author of Punnett Square",
      "Father of Genetics",
      "Proponent of Law of Dominance",
    ],
    correctAnswer: "Author of Punnett Square",
  },
  {
    id: 3,
    question: "Which pair of letters represents a pure line dominant trait?",
    choices: ["CC", "Ee", "Gg", "tt"],
    correctAnswer: "CC",
  },
  {
    id: 4,
    question: "Purebred organisms, also called ________.",
    choices: [
      "Homozygous",
      "Dominant",
      "Heterozygous",
      "Recessive heterozygous",
    ],
    correctAnswer: "Homozygous",
  },
];

const Evaluation = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
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
    calculateScore();
    setSubmitted(true);
    console.log(score);
    // try {
    //   await axios.post("https://your-backend-endpoint.com/submit-score", {
    //     score: score,
    //     totalQuestions: questions.length,
    //   });
    //   alert("Score submitted successfully!");
    // } catch (error) {
    //   alert("Error submitting score.");
    //   console.error(error);
    // }
  };

  const choiceLetters = ["A", "B", "C", "D"];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Genetics Evaluation</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              placeholder="Type your answer here"
              className="border p-2 rounded-md w-full md:w-48 focus:outline-none focus:ring focus:border-blue-300"
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
          {submitted && (
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
          )}
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
