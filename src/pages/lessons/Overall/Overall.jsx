import React from "react";
import Module1 from "../DigestiveSystem/Lesson1/Module1";
import MiosisAndMitosis from "../MitosisAndMiosis/MitosisAndMiosis";
import Meiosis from "../CellDivision/Lessons/CellDivision.jsx";
import FloatingButton from "../../../components/FloatingButton/FloatingButton.jsx";

const Overall = () => {
  return (
    <div>
      <Module1 hideFloating={true} />
      <MiosisAndMitosis hideFloating={true} />
      <Meiosis hideFloating={true} />
      <FloatingButton hasDownload={false} hasPrinter={false} />
    </div>
  );
};

export default Overall;
