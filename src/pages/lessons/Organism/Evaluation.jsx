import React, { useState } from "react";
import axios from "axios";

const questions = [
  {
    id: 1,
    question:
      "The following practices should be observed in order to sustain feeding process in the ecosystem",
    choices: [
      "Raise animals and insects to fight other pests. ",
      "Dump organic wastes into rivers and streams. ",
      "Grow a variety of crops instead of only one crop. ",
      "Use organic fertilizers instead of chemical fertilizers. ",
    ],
    correctAnswer: "C" || "c",
  },
  {
    id: 2,
    question:
      "The food chain is characterized as a simple illustration of who eats and ",
    choices: ["One path", "Two paths", "Three paths", "Four path"],
    correctAnswer: "A" || "a",
  },
  {
    id: 3,
    question:
      "Which of the following organisms will a first-order consumer eat? ",
    choices: ["Giraffes", "Grasses", "Goats", "Grasshoppers"],
    correctAnswer: "C" || "c" || "D" || "d",
  },
  {
    id: 4,
    question:
      "Which consumer in a trophic level can eat both plants and animals? ",
    choices: ["Carnivores", "Herbivores", "Decomposers", "Omnivores"],
    correctAnswer: "D" || "d",
  },
  {
    id: 5,
    question:
      "Which of the following shows the correct sequence of feeding relationships in a food chain",
    choices: [
      "Grasses—Grasshoppers—Frogs—Snakes-- Eagle ",
      "Grasshoppers –Grasses—Frogs—Snakes-- Eagle ",
      "Frogs--- Snakes--- Eagle--- Grasses--- Grasshoppers ",
      "Snakes--- Eagle--- Frogs--- Grasses--- Grasshoppers  ",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 6,
    question:
      "If 600 kg of biomass is at the third trophic level, how much biomass was available at the first trophic level? ",
    choices: ["60 kg ", "600 kg", "6,000 kg", "60,000 kg "],
    correctAnswer: "D" || "d",
  },
  {
    id: 7,
    question:
      "If there are 100,000 kilocalories of energy in the first trophic level, how many kilocalories are available to organisms in the second trophic level? ",
    choices: [
      "100 kilocalories",
      "1000 kilocalories",
      "10,000 kilocalories",
      "100,000 kilocalories",
    ],
    correctAnswer: "C" || "c",
  },
  {
    id: 8,
    question:
      "Which of the following organisms are placed at the base of the energy pyramid?",
    choices: ["Carnivores", "Decomposers", "Omnivores", "Producers"],
    correctAnswer: "D" || "d",
  },
  {
    id: 9,
    question: "Which consumer helps with the recycling of nutrients? ",
    choices: ["Carnivore ", "Decomposer ", "Herbivore", "Omnivore"],
    correctAnswer: "B" || "b",
  },
  {
    id: 10,
    question:
      "Which of the following explains why fruit and vegetables eaters are energy efficient? ",
    choices: [
      "They do not use energy at all. ",
      "They burn much of their energy in a day.  ",
      "They directly derive energy from the producer level. ",
      "They get their energy from first-degree consumer level.",
    ],
    correctAnswer: "C" || "c",
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
      <h1 className="text-3xl font-bold text-center">Organism</h1>
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
