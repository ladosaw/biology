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

  evaluation: {
    title: "Written Evaluation Form",
    link: "https://forms.gle/uNWvyQrbfAr45gXVA",
  },
};
