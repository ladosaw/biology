import React, { useState } from "react";
import axios from "axios";

const questions = [
  {
    id: 1,
    question:
      "In what process do animals take in food that provides energy and nutrients",
    choices: ["assimilation", "digestion", "excretion", "ingestion"],
    correctAnswer: "B" || "b",
  },
  {
    id: 2,
    question:
      "What organ system is responsible for breaking down large molecules into smaller molecules and absorbing organic compounds needed by the body?",
    choices: [
      "circulatory system",
      "Nervous system",
      "digestive system",
      "Respiratory system",
    ],
    correctAnswer: "B" || "b",
  },
  {
    id: 3,
    question:
      "Which of the following breaks down food into tinier pieces to begin mechanical digestion?",
    choices: ["esophagus", "stomach", "teeth", "tongue"],
    correctAnswer: "A" || "a",
  },
  {
    id: 4,
    question: "How does saliva help in the digestion process?",
    choices: [
      "It reabsorbs nutrients from the food we eat.",
      "It contains the enzyme amylase that helps in the digestion of starch.",
      "It absorbs nutrients and distributes them in the bloodstream.",
      "It is necessary for the egestion process.",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 5,
    question: "What is the most essential function of the intestinal villi?",
    choices: [
      "pushes the fecal matter into the rectum.",
      "increases surface area for nutrient absorption",
      "secretes serous fluid to decrease friction among the organs.",
      "secretes mucous to facilitate the movement of chyme via the alimentary canal. ",
    ],
    correctAnswer: "B" || "b",
  },
  {
    id: 6,
    question:
      "The following are the reasons why digested food should be assimilated into the cell EXCEPT _.",
    choices: [
      "they are converted into protoplasm.",
      "they are needed to store fats.",
      "they provide the energy needed in cell activities.",
      "they are converted to build cell membranes.",
    ],
    correctAnswer: "C" || "c",
  },
  {
    id: 7,
    question:
      "A student has a hamburger, fries, and soda for lunch. Which sequence represents the correct order of events in the nutritional processing of this food?",
    choices: [
      "ingestion → digestion → absorption → egestion",
      "digestion → absorption → ingestion → egestion",
      "digestion → egestion → ingestion → absorption",
      "ingestion → absorption → digestion → egestion",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 8,
    question:
      "The digestion system processes food into usable and unusable materials. The usable materials are sent to the body’s cells as food. What happens to unusable materials?",
    choices: [
      "It goes to the pancreas to await disposal.",
      "It goes to the right ventricle to await disposal.",
      "It goes to the large intestine to await disposal.",
      "It goes to the small intestine to await disposal.",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 9,
    question: "What happens when food reaches the stomach?",
    choices: [
      "Mechanical digestion starts in the stomach ",
      "The food moves quickly into the small intestine. ",
      "Juices mix with the food and stomach muscles squeeze it.",
      "The food is completely digested and is absorbed by tiny blood vessels in the walls of the stomach.",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 10,
    question:
      "The choices below are tips for maintaining a healthy digestive system. Which of these should be followed?\nI. Stay hydrated\nII. Avoid overeating\nIII. Smoking after eating\nIV. Sleep at least 7-8 hours per night",
    choices: ["I, II, III, IV", "I, II, IV", "I, III", "II, IV"],
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
      <h1 className="text-3xl font-bold text-center">
        Digestive System Evaluation
      </h1>
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
