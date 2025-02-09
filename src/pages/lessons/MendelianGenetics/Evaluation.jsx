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
    correctAnswer: "B" || "b",
  },
  {
    id: 3,
    question: "Which pair of letters represents a pure line dominant trait?",
    choices: ["CC", "Ee", "Gg", "tt"],
    correctAnswer: "A" || "a",
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
    correctAnswer: "A" || "a",
  },
  {
    id: 5,
    question: "Describe someone who is heterozygous for a trait.",
    choices: [
      "Two of the same alleles for a particular trait",
      "Two different alleles for a particular trait",
      "One of the same alleles for a particular trait ",
      "One different allele for a particular trait ",
    ],
    correctAnswer: "B" || "b",
  },
  {
    id: 6,
    question:
      "A plant with a flower position (aa) is crossed with a heterozygous plant. What percentage of their offspring have axial flower position?",
    choices: ["25% ", "50%", "75%  ", "100% "],
    correctAnswer: "C" || "c",
  },
  {
    id: 7,
    question:
      "If a constricted pod pea plant is crossed with one heterozygous, how many of its offspring will also be a constricted pod? ",
    choices: ["1:1", "2:2 ", "1:3  ", "1:4"],
    correctAnswer: "A" || "a",
  },
  {
    id: 8,
    question: "How would you differentiate genotype from phenotype?",
    choices: [
      "Genotype are the genetic makeup while phenotypes are physical traits.",
      "Genotypes are physical traits while phenotypes are the genetic makeup.",
      "Genotypes are physical character traits       ",
      "Phenotypes are the genetic traits.",
    ],
    correctAnswer: "A" || "a",
  },
  {
    id: 9,
    question:
      "Which refers to the offspring resulting from cross-between parents with two contrasting traits?",
    choices: ["Hybrids ", "Crossbred ", "Multiple Allele ", "Purebred"],
    correctAnswer: "A" || "a",
  },
  {
    id: 10,
    question:
      "Which refers to the offspring resulting from cross-between parents with two contrasting traits?",
    choices: [
      "Law of segregation is the law of purity of genes ",
      "Alleles separate from each other during gametogenesis ",
      "Segregation of factors is due to the segregation of chromosomes during meiosis",
      "All of the choices are correct statements.",
    ],
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
        Mandellian Genetics Evaluation
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
