import React from "react";
import { workSheetDirections } from "./ConstantData";

const Worksheet1 = () => {
  return (
    <div>
      <h1>{workSheetDirections.workSheet1.title}</h1>
      <p>{workSheetDirections.workSheet1.direction}</p>
      <p>{workSheetDirections.workSheet1.subdirection.A}</p>
      <p>{workSheetDirections.workSheet1.subdirection.B}</p>
      <p>{workSheetDirections.workSheet1.subdirection.C.title}</p>
      <p>{workSheetDirections.workSheet1.subdirection.C.title}</p>
    </div>
  );
};

export default Worksheet1;
