import * as React from "react";
import Render3D from "../../components/renderer/Render3d";
import DigestiveSystem from "../../components/model/DigestiveSystem";

const Lessons = ({ topic }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      {topic === "Digestive System 1" ? (
        <div className="w-full h-screen">
          <h1 className="text-4xl text-center font-bold">{topic}</h1>
          <Render3D>
            <DigestiveSystem />
          </Render3D>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">{topic}</h1>
        </div>
      )}
    </main>
  );
};

export default Lessons;
