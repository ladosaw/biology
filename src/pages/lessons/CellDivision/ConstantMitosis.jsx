export const StageOfMitosis = [
  {
    title: "Prophase of Mitosis",
    image: "/images/Prophase.jpg",
    activities: [
      "Nucleolus disappears in the nucleus, serving as a starting signal.",
      "The nuclear membrane disintegrates.",
      "Each chromosome appears as two identical sister chromatids joined at the centromere.",
      "In the cytoplasm, spindle fibers begin to form, made of microtubules arranged between the two centrioles.",
      "The centrioles move away from each other, propelled by lengthening bundles of microtubules.",
    ],
  },
  {
    title: "Metaphase of Mitosis",
    image: "/images/Metaphase.jpg",
    activities: [
      "The centrioles are now at the opposite poles of the cell.",
      "Chromosomes align at the equatorial plane.",
      "Each spindle fiber from both centrosomes connects to each chromosome through its kinetochore.",
    ],
  },
  {
    title: "Anaphase of Mitosis",
    image: "/images/Anaphase.jpg",
    activities: [
      "Spindle fibers begin to contract and become shorter.",
      "Centromeres divide.",
      "The single chromatids move towards the opposite poles.",
      "Each chromatid is now considered an individual chromosome.",
      "At the end of anaphase, the two poles of the cell have an equal set of chromosomes.",
    ],
  },
  {
    title: "Telophase of Mitosis",
    image: "/images/telophase.jpg",
    activities: [
      "The chromosomes are now at the opposing poles of the spindle.",
      "The microtubules disappear.",
      "Two sets of chromosomes are surrounded by new nuclear membranes, completing the nuclear division process known as karyokinesis.",
      "Cytoplasmic division called cytokinesis occurs concurrently, splitting the cell into two.",
    ],
  },
];

export const InterphaseStage = [
  {
    title: "G0",
    description: [
      "A resting phase where the cell has left the cycle and has stopped dividing.",
    ],
    icon: "🛑",
  },
  {
    title: "First Gap 1 – G1",
    description: [
      "Cell grows initially.",
      "Synthesis of protein and ribonucleic acid (RNA) occurs.",
      "Organelles such as mitochondria increase in number.",
    ],
    icon: "🌱",
  },
  {
    title: "Synthesis Phase or S Phase",
    description: [
      "DNA is synthesized, thus replicating the chromosomes in preparation for the next cell division.",
    ],
    icon: "🧬",
  },
  {
    title: "Second Gap or G2",
    description: [
      "Cell grows rapidly.",
      "Cell prepares for the actual cell division (mitosis).",
    ],
    icon: "⚡",
  },
];

export const MitosisWorksheetsLink = {
  worksheet1: {
    title: "Learning Activity 1",
    link: "https://forms.gle/hzpK34yVDWPb1PfT6",
  },
  worksheet2: {
    title: "Learning Activity 2",
    link: "https://forms.gle/YhSJ4rpcc3HfTKUG8",
  },
  // worksheet3: {
  //   title: "Mitosis Worksheets 3",
  //   link: "https://forms.gle/gTK61SvcarQ16GqC9",
  // },

  evaluation: {
    title: "Evaluation",
    link: "https://forms.gle/EDugtXsY2RXkBFFr5",
  },
};

export const MitosisQuestions = [
  {
    id: 1,
    question: "How many daughter cells are produced after mitosis?",
    choices: ["2", "4", "23", "46"],
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
  },
  {
    id: 3,
    question:
      "Which checkpoint in the cell ensures that the cell is ready to enter the M phase?",
    choices: ["G1 Phase", "G2 Phase", "M Phase", "S Phase"],
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
  },
  {
    id: 5,
    question: "Where does the duplication of genetic materials happen?",
    choices: ["G1 Phase", "G2 Phase", "M Phase", "S Phase"],
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
  },
  {
    id: 8,
    question: "Which of the following statements of mitosis is correct?",
    choices: [
      "The centromere of the chromosome separates during metaphase.",
      "The chromatid number in a daughter cell is the same as in the parent cell.",
      "The chromosome number in a daughter cell is the same as that in the parent cell. ",
      "The chromosome number in a daughter cell is the same as the chromatid number in the parent cell.",
    ],
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
  },
  {
    id: 10,
    question:
      "Your teacher asked you to identify a specimen's mitosis stage under the microscope. You observe that instead of a typical round cell shape, the cell has a narrow middle part that almost separates into two bulging ends, which looks like the number 8. The cell is undergoing ___________",
    choices: ["Anaphase", "Metaphase", "Cytokinesis", "Prophase"],
  },
];
