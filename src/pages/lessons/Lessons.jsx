import * as React from "react";
import { CssBaseline, Container } from "@mui/material";
import Render3D from "../../components/renderer/Render3d";
import DigestiveSystem from "../../components/model/DigestiveSystem";
import MitosisStages from "../../components/mitosis-stages/MitosisStages";

const Lessons = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-500">Lessons Page</h1>
      </div>
    </main>
  );
};

export default Lessons;
