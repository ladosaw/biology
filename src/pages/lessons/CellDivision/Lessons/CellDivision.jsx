import React, { useRef, useState } from "react";
import FloatingButton from "../../../../components/FloatingButton/FloatingButton.jsx";
import { FaArrowRight } from "react-icons/fa";
import cellCycle from "../../../../assets/images/NewCellCycle.jpg";
import stagesOfMitosis from "../../../../assets/pdf/stagesOfMitosis.pdf";
import {
  MitosisWorksheetsLink,
  StageOfMitosis,
  InterphaseStage,
} from "../ConstantMitosis.jsx";
import Worksheets from "../../../../components/Worksheets/Worksheets.jsx";
import MitosisAnimation from "./MitosisAnimation.jsx";
import Evaluation from "./Evaluation.jsx";
import Worksheet from "./Worksheet.jsx";
import Worksheet2 from "./Worksheet2.jsx";
import Worksheet3 from "./Worksheet3.jsx";
import Modal from "../../../../components/Modal/Modal.jsx";

const Module1 = ({ hideFloating }) => {
  const [isModalWorksheetOpen, setIsModalWorksheetModalOpen] = useState(false);
  const [isModalWorksheet2Open, setIsModalWorksheet2ModalOpen] =
    useState(false);
  const [isModalWorksheet3Open, setIsModalWorksheet3ModalOpen] =
    useState(false);

  const [evaluationOpen, setEvaluationOpen] = useState(false);

  const toggleModalWorksheet = () => {
    setIsModalWorksheetModalOpen((prev) => !prev);
  };
  const toggleModalWorksheet2 = () => {
    setIsModalWorksheet2ModalOpen((prev) => !prev);
  };
  const toggleModalWorksheet3 = () => {
    setIsModalWorksheet3ModalOpen((prev) => !prev);
  };

  const toggleEvaluation = () => {
    setEvaluationOpen((prev) => !prev);
  };

  const handleNextClick = () => {};

  const handleDownload = () => {
    const pdfUrl = stagesOfMitosis;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "LESSON 2: CELL CYCLE: Interphase and cell Division";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintHandout = () => {
    const pdfUrl = stagesOfMitosis;

    const printWindow = window.open(pdfUrl, "_blank");

    if (printWindow) {
      printWindow.addEventListener("load", () => {
        printWindow.print();
      });
    } else {
      alert(
        "Failed to open the PDF. Please check your pop-up blocker settings."
      );
    }
  };

  return (
    <div className="px-4 lg:px-4 text-justify text-sm sm:text-base md:text-lg">
      {/* Header Section */}
      <div>
        <div className="flex flex-col gap-8 title">
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug ">
            <span className="font-bold">LESSON 2:</span> CELL CYCLE: Interphase
            and cell Division
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Living organisms grow. Growth is a permanent increase in size
            resulting from cell division and cell differentiation to form
            tissues and organs in multicellular organisms. As the smallest
            living component of an organism, the cell performs a lot of
            activities. It grows., prepares to divide, then undergoes division
            to form two daughter cells. Each daughter cell contains the same
            genetic materials as the parent cell. Soon, the daughter cell will
            also undergo the same cycle of <b>growth and division</b>. The
            series of activities is called <b>Cell Cycle.</b>         
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            The two main stages in the cell cycle are{" "}
            <b>
              Interphase- Period of Growth and Cell division (Mitosis and
              Meiosis)
            </b>
            . In Figure 1 is illustration of the stages of the cell cycle.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            New cells are formed through cell division. This is one important
            breakthrough that was discovered by Rudolf Virchow, a German
            pathologist in 1885. In this process, one cell divides and becomes
            two. The two daughter cells formed in the process grow and later
            divide again into four new cells. This repeated process of cell
            division is called a cycle through mitosis and meiosis.
          </p>
        </div>

        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold my-6">
          Mitosis 3D Model
        </h1>
        <div className="w-full h-auto rounded-lg">
          <MitosisAnimation />
        </div>
        <div className="flex flex-col justify-center items-center mt-8z gap-8 my-8">
          {/* <div className="w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              The Process of Mitosis
            </h1>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/f-ldPgEfAHI?si=mdFsWp5wOdf5Jb2m&amp;start=6"
              title="Mitosis"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div> */}

          <img
            src={cellCycle}
            alt="Digestion illustration"
            className="w-full md:w-1/2 lg:w-2/3 h-auto object-contain rounded-lg shadow-md"
          />
          <p className="text-sm sm:text-base md:text-lg text-center">
            <span className="font-semibold block mt-2">
              Figure 1. Cell cycle in Eukaryotic cells
            </span>
          </p>
        </div>
        <div className="my-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
            A. INTERPHASE
          </h2>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center my-6">
            Table 1: Events of Interphase Stage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {InterphaseStage.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border border-gray-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{item.icon}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                    {item.title}
                  </h3>
                </div>
                <ul className="list-disc pl-7 space-y-2 text-gray-600">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm sm:text-base md:text-lg mb-8">
          The interphase refers to the period that follows one cell division and
          precedes another. During this stage, the cell does not divide; it
          merely grows. The chromosomes replicate itself because the DNA
          molecule contained in the chromosomes produces an exact copy of
          itself. Interphase is the longest phase in the cell cycle and consists
          of the G1, S, and G2 phase. The First phase is the G1 or gap 1 is the
          primary growth phase of the cell. The second phase is the synthesis
          phase or the S phase. The third phase is Gap 2 which is the
          preparation for the cell division. Table 1 is the summary of the event
          during the interphase stage
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
          B. Cell Division
        </h2>
        <h2 className="text-sm sm:text-base md:text-lg mb-4">
          Cell Division may be the nuclear division (karyokinesis), which
          involves the division of the nucleus, and cytoplasmic division
          (cytokinesis) is the division of cytoplasm. There are two types: the
          mitosis (asexual reproduction) division and meiosis (sexual
          reproduction )
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-4">
          <span className="font-semibold"> I. MITOSIS</span> - a type of cell
          division that occurs in the <b>nonreproductive (somatic) cells</b>{" "}
          such as the skin, bones, nails, and hair. It is responsible for the
          increase in weight and height of the baby as she grows and develops
          into a teenager. Also responsible for the healing of the wounded when
          a part of a body is accidentally cut or scratched.
        </p>
        <p className="text-sm sm:text-base md:text-lg mb-4">
          The role of mitosis in the cell cycle is to replicate the genetic
          material in an existing cell—known as the “parent cell”—and distribute
          that genetic material to two new cells, known as “daughter cells.” To
          pass its genetic material to the two new daughter cells, a parent cell
          must undergo cell division or mitosis. Mitosis results in two new
          nuclei-which contain DNA that eventually become two identical cells
          during cytokinesis.
        </p>
        <p className="text-sm sm:text-base md:text-lg mb-4">
          To accomplish this goal, mitosis occurs in four discrete, consistently
          consecutive{" "}
          <span className="font-semibold">
            phases: 1) prophase, 2) metaphase, 3) anaphase, and 4) telophase
            (PMAT).
          </span>{" "}
          Figure 2 above and 3 below: show the four Stages of Mitosis (IPMAT)
        </p>
        <div className="p-4 bg-gray-50">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6">
            Table 2: Stages of Mitosis with Activities
          </h2>

          <div className="border border-gray-300 rounded-lg">
            <div className="grid grid-cols-2 bg-green-100 text-center font-bold p-3">
              <div className="text-sm sm:text-base md:text-lg">
                Stages of Mitosis
              </div>
              <div className="text-sm sm:text-base md:text-lg">
                Activities within the Cell
              </div>
            </div>

            {StageOfMitosis.map((stage, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4 border-t border-gray-300 p-4"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="mb-4 w-full max-w-md h-auto object-contain"
                  />
                  <p className="font-bold text-center text-sm sm:text-base md:text-lg">
                    {stage.title}
                  </p>
                </div>

                <ul className="list-disc pl-4 text-sm sm:text-base md:text-lg leading-relaxed">
                  {stage.activities.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Remember</h2>
        <h2 className="text-sm sm:text-base md:text-lg mb-4">
          Two things happen in mitosis: First, the nucleus divides (called
          karyokinesis), and second, the cytoplasm divides (called cytokinesis).
          Prophase takes the longest time followed by telophase, then anaphase.
          Metaphase takes the shortest time. Two new nuclear membranes are
          formed, and two new nuclei are seen. Two new daughter cells are
          produced from one dividing parent cell. Thus, mitosis h as come to an
          end.
        </h2>
      </div>

      <Worksheets
        WorksheetData={MitosisWorksheetsLink}
        toggleModalWorksheet={toggleModalWorksheet}
        toggleModalWorksheet2={toggleModalWorksheet2}
        toggleEvaluation={toggleEvaluation}
      />

      <Modal
        open={isModalWorksheetOpen}
        onClose={toggleModalWorksheet}
        title={MitosisWorksheetsLink.worksheet1.title}
      >
        <Worksheet />
      </Modal>

      <Modal
        open={isModalWorksheet2Open}
        onClose={toggleModalWorksheet2}
        title={MitosisWorksheetsLink.worksheet2.title}
      >
        <Worksheet2 />
      </Modal>

      <Modal
        open={isModalWorksheet3Open}
        onClose={toggleModalWorksheet3}
        title={MitosisWorksheetsLink.worksheet3.title}
      >
        <Worksheet3 />
      </Modal>

      <Modal
        open={evaluationOpen}
        onClose={toggleEvaluation}
        title={MitosisWorksheetsLink.evaluation.title}
      >
        <Evaluation
          titles={"LESSON 2: CELL CYCLE: Interphase and Cell Division"}
          worksheet_no={0}
          setEvaluationOpen={setEvaluationOpen}
        />
      </Modal>

      {/* Footer */}
      <div className="flex flex-col items-end mt-10 space-y-4">
        <div className="bg-gray-200 w-full h-[1px]"></div>
        {/* <button
          className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded shadow hover:bg-primary-dark transition"
          onClick={handleNextClick}
        >
          <p className="font-semibold text-lg">Lesson 2: Mendelian Genetics</p>
          <FaArrowRight />
        </button> */}
        <div className="bg-gray-200 w-full h-[1px]"></div>
      </div>

      {/* Floating Button */}
      <div className={`fixed bottom-4 right-4 ${hideFloating ? "hidden" : ""}`}>
        {!hideFloating && (
          <FloatingButton
            onPrint={handlePrintHandout}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default Module1;
