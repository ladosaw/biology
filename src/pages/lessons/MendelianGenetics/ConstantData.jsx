export const mendelResults = [
  {
    trait: "Flower Position",
    parents: "Axial X Terminal",
    firstFilialGeneration: "All Axial",
  },
  {
    trait: "Seed Shape",
    parents: "Round X Wrinkled",
    firstFilialGeneration: "All Round",
  },
  {
    trait: "Seed Color",
    parents: "Green X Yellow",
    firstFilialGeneration: "All Green",
  },
  {
    trait: "Seed Coat Color",
    parents: "Colored X White",
    firstFilialGeneration: "All Colored",
  },
  {
    trait: "Pod Shape",
    parents: "Inflated X Constricted",
    firstFilialGeneration: "All Inflated",
  },
  {
    trait: "Pod Color",
    parents: "Green X Yellow",
    firstFilialGeneration: "All Green",
  },
  {
    trait: "Stem Length",
    parents: "Long X Short",
    firstFilialGeneration: "All Long",
  },
];

export const mendelResults2 = [
  {
    trait: "Flower Position",
    f1Hybrid: "Axial",
    f2Generation: [
      { type: "axial", count: 651 },
      { type: "terminal", count: 207 },
    ],
    observeRatio: "3.14:1",
  },
  {
    trait: "Seed Shape",
    f1Hybrid: "Round",
    f2Generation: [
      { type: "round", count: 5474 },
      { type: "wrinkled", count: 1850 },
    ],
    observeRatio: "2.96:1",
  },
  {
    trait: "Seed Color",
    f1Hybrid: "Yellow",
    f2Generation: [
      { type: "yellow", count: 6022 },
      { type: "green", count: 2001 },
    ],
    observeRatio: "3.01:1",
  },
  {
    trait: "Seed Coat Color",
    f1Hybrid: "Colored",
    f2Generation: [
      { type: "colored", count: 705 },
      { type: "white", count: 224 },
    ],
    observeRatio: "3.15:1",
  },
  {
    trait: "Pod Shape",
    f1Hybrid: "Inflated",
    f2Generation: [
      { type: "inflated", count: 882 },
      { type: "constricted", count: 299 },
    ],
    observeRatio: "2.95:1",
  },
  {
    trait: "Pod Color",
    f1Hybrid: "Green",
    f2Generation: [
      { type: "green", count: 428 },
      { type: "yellow", count: 152 },
    ],
    observeRatio: "2.82:1",
  },
  {
    trait: "Stem Length",
    f1Hybrid: "Long",
    f2Generation: [
      { type: "long", count: 787 },
      { type: "short", count: 277 },
    ],
    observeRatio: "2.84:1",
  },
];

export const vocabulary = [
  {
    title: "Genetics",
    desc: "A branch of science dealing with the study of heredity and variation.",
  },
  {
    title: "Heredity",
    desc: "Is the transmission of traits from one generation to the next generation.",
  },
  {
    title: "Genes",
    desc: "Is the basic physical and functional unit of heredity. Genes are made up of DNA.",
  },
  {
    title: "Alleles",
    desc: "Is two contrasting traits. If the two alleles are the same, the individual is homozygous for that allele. If the alleles are different, the individual is heterozygous.",
  },
  {
    title: "Hybrids/Heterozygous",
    desc: "A combination of two contrasting traits with a symbol of the capital and small letter (Xx, Yy, Rr). Homozygous - pure breeding traits and is the symbol with a capital letter (XX, YY, RR).",
  },
  {
    title: "Dominant traits",
    desc: "Traits that are masked/hidden and will not appear in the F1 generation during the cross.",
  },
  {
    title: "Recessive traits",
    desc: "Is the transmission of traits from one generation to the next generation.",
  },
  {
    title: "Phenotype",
    desc: "A physical expression of the traits.",
  },
  {
    title: "Genotype",
    desc: "A genotypic expression of the traits.",
  },
  {
    title: "F1 generation",
    desc: "First parental generation.",
  },
  {
    title: "F2 generation",
    desc: "Second parental generation.",
  },
  {
    title: "Punnet Square",
    desc: "A tool discovered by Reginald Punnet that was used to determine the possible combination of genes.",
  },
];

export const DominantRecessiveTraits = [
  {
    characterStudied: "Flower Position",
    dominant: "Axial (AA)",
    recessive: "Terminal (aa)",
  },
  {
    characterStudied: "Seed shape",
    dominant: "Round (RR)",
    recessive: "Wrinkled (rr)",
  },
  {
    characterStudied: "Seed color",
    dominant: "Yellow (YY)",
    recessive: "Green (yy)",
  },
  {
    characterStudied: "Seed coat color",
    dominant: "Colored (CC)",
    recessive: "White (cc)",
  },
  {
    characterStudied: "Pod shape",
    dominant: "Inflated (II)",
    recessive: "Constricted (ii)",
  },
  {
    characterStudied: "Pod color",
    dominant: "Green (GG)",
    recessive: "Yellow (gg)",
  },
  {
    characterStudied: "Stem length",
    dominant: "Long (SS)",
    recessive: "Short (ss)",
  },
];

export const GenotypePhenotype = [
  {
    genotype: "RR",
    description: "Homozygous dominant for round seeds",
    phenotype: "Round Seed",
  },
  {
    genotype: "Rr",
    description: "Heterozygous genes round seeds",
    phenotype: "Round seed",
  },
];

export const MendelianGeneticsWorksheetsLink = {
  worksheet1: {
    title: "Mendelian Genetics Worksheets 1",
    link: "https://forms.gle/42vrUKfegM35FGce9",
  },
  worksheet2: {
    title: "Mendelian Genetics Worksheets 2",
    link: "https://forms.gle/o7zp9ReL82LUQUAi8",
  },
  worksheet3: {
    title: "Mendelian Genetics Worksheets 3",
    link: "https://forms.gle/zzaw3EPAhoGqvdAD8",
  },
  worksheet4: {
    title: "Mendelian Genetics Worksheets 4",
    link: "https://forms.gle/zzaw3EPAhoGqvdAD8",
  },
  evaluation: {
    title: "Evaluation",
    link: "https://forms.gle/uNWvyQrbfAr45gXVA",
  },
};

export const workSheetDirections = {
  workSheet1: {
    title: "Worksheet 1: What Am I?",
    direction:
      "Direction: Identify whether Genotype: Homozygous Dominant or Recessive, Genotype or Phenotype the following items. Write your answer in the blank provided",
    subdirection: {
      A: "A. Homozygous Dominant or Recessive/ Heterozygous",
      B: "B. Phenotype vs. Genotype",
      C: {
        title:
          "C. For each of the genotypes below, determine what phenotype could produce.",
        subTitle: {
          title: "Yellow (YY)  Flower are dominant to white (yy) ",
        },
      },
    },
  },
  workSheet2: {
    title: "Worksheet 2: Complete “D”",
    direction:
      "Direction: Let D =dominant allele and d =recessive while DD, Dd, and dd represent the dominant, heterozygous dominant, and recessive phenotype. For each type of cross, determine the genotypic and phenotypic ratios, respectively. The first cross is already done for you.",
  },
  workSheet3: {
    title: "SOLVING PROBLEM: Monohybrid Cross Using the Punnett Square ",
    direction:
      "Directions: Read the situation and answer the questions that follow.",
    situation: {
      a: {
        title:
          "A homozygous red Santan flower (RR) is crossed with a homozygous pink Santan flower (rr). ",
        task: {
          one: "1. Show the given cross using the Punnett square.",
          two: "Write the genotypes and phenotypes of the resulting offspring. ",
        },
      },
    },
  },
};

export const mendelianGeneticsQuestions = [
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
      "Which of the following statements is true regarding the 'Law of Segregation'",
    choices: [
      "Law of segregation is the law of purity of genes ",
      "Alleles separate from each other during gametogenesis ",
      "Segregation of factors is due to the segregation of chromosomes during meiosis",
      "All of the choices are correct statements.",
    ],
    correctAnswer: "b" || "B",
  },
];
