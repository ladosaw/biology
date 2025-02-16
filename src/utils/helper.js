const convert100ToPercentage = (input) => {
  if (!input || typeof input !== "string") return "Invalid input";

  let [num, ...rest] = input.split(" ");

  return num.includes("%") ? input : `${num}% ${rest.join(" ")}`;
};

export const formatAssignedData = (
  assigned,
  genotypeRed,
  phenotypeRed,
  genotypePurple,
  phenotypePurple,
  genotypeCurlyHair,
  phenotypeCurlyHair
) => {
  const formatted = {};
  let redCount = 0,
    purpleCount = 0,
    curlyHairCount = 0;

  for (const key in assigned) {
    const { id, name } = assigned[key];

    if (["Rr", "rr", "RR"].includes(name)) {
      formatted[`PunnettRed${redCount}`] = name;
      redCount++;
    } else if (["P", "p", "Pp"].includes(name)) {
      formatted[`PunnettPurple${id}`] = name;
      purpleCount++;
    } else if (["C", "c", "Cc"].includes(name)) {
      formatted[`PunnettCurlyHair${id}`] = name;
      curlyHairCount++;
    }
  }

  formatted["genotypeRed"] = convert100ToPercentage(genotypeRed);
  formatted["phenotypeRed"] = convert100ToPercentage(
    phenotypeRed?.toLowerCase()
  );
  formatted["genotypePurple"] = convert100ToPercentage(genotypePurple);
  formatted["phenotypePurple"] = convert100ToPercentage(
    phenotypePurple?.toLowerCase()
  );
  formatted["genotypeCurlyHair"] = convert100ToPercentage(genotypeCurlyHair);
  formatted["phenotypeCurlyHair"] = convert100ToPercentage(
    phenotypeCurlyHair?.toLowerCase()
  );

  return formatted;
};

export const formatDataForWorksheet4Lessons4 = (input) => {
  let formatted = {};

  // Process assigned items
  let colorCounters = {};
  Object.values(input.assigned).forEach((item) => {
    let color = item.color;
    if (!(color in colorCounters)) {
      colorCounters[color] = 0;
    }
    formatted[`${color}${colorCounters[color]}`] = item.name;
    colorCounters[color]++;
  });

  // Copy the remaining fields
  ["SubQ1", "SubQ2", "SubQ3", "SubQ4", "Q2", "Q3"].forEach((key) => {
    if (key in input) {
      formatted[key] = input[key];
    }
  });

  return formatted;
};
