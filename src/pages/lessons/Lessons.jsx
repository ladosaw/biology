import * as React from "react";
import { CssBaseline, Container } from "@mui/material";
import Render3D from "../../components/renderer/Render3d";
import DigestiveSystem from "../../components/model/DigestiveSystem";
import MitosisStages from "../../components/mitosis-stages/MitosisStages";

const Lessons = ({ topic }) => {
  const renderContent = () => {
    switch (topic) {
      case "Digestive System 1":
        return (
          <div className="w-full h-screen">
            <h1 className="text-4xl text-center font-bold">{topic}</h1>
            <Render3D>
              <DigestiveSystem />
            </Render3D>
          </div>
        );
      case "Stages of Mitosis":
        return (
          <div className="flex items-center justify-center h-screen">
            <Container>
              <CssBaseline />
              <MitosisStages />
            </Container>
          </div>
        );
      case "Meiosis":
        return (
          <div className="w-full h-screen">
            <h1 className="text-4xl text-center font-bold">{topic}</h1>
            {/* Add your specific component for the Meiosis */}
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Blanditiis earum rem ab aspernatur accusantium.
            </p>
          </div>
        );
      case "Mendelian Genetics":
        return (
          <div className="w-full h-screen">
            <h1 className="text-4xl text-center font-bold">{topic}</h1>
            {/* Add your specific component for the Mendelian Genetics */}
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Blanditiis earum rem ab aspernatur accusantium.
            </p>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-gray-500">
              Topic not found: {topic}
            </h1>
          </div>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      {renderContent()}
    </main>
  );
};

export default Lessons;
