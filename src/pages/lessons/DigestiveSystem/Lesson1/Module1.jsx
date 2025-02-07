import React, { useState } from "react";
import FloatingButton from "../../../../components/FloatingButton/FloatingButton.jsx";
import { FaArrowRight } from "react-icons/fa";
import Indigestion from "../../../../assets/images/indigestion.svg";
import Digestion from "../../../../assets/images/digestion.svg";
import Absorption from "../../../../assets/images/absorption.jpg";
import Assimilation from "../../../../assets/images/assimilation.png";
import Egestion from "../../../../assets/images/egestion.jpg";
import Render3d from "../../../../components/renderer/Render3d";
import DigestiveSystem from "../../../../components/model/DigestiveSystem";
import pdfDgestive from "../../../../assets/pdf/humanDigestiveSystem.pdf";
import { Link } from "react-router-dom";
import { DigestiveWorksheetsLink } from "./ConstantDigestive.jsx";
import Worksheets from "../../../../components/Worksheets/Worksheets.jsx";
import DigestiveSystemAnimation from "../DigestiveSystemAnimation.jsx";
import Modal from "../../../../components/Modal/Modal.jsx";
import Worksheet from "./Worksheet.jsx";
import Worksheet2 from "./Worksheet2.jsx";
import Evaluation from "./Evaluation.jsx";

const Module1 = ({ hideFloating }) => {
  const [isModalWorksheetOpen, setIsModalWorksheetModalOpen] = useState(false);
  const [isModalWorksheet2Open, setIsModalWorksheet2ModalOpen] =
    useState(false);

  const [evaluationOpen, setEvaluationOpen] = useState(false);

  const toggleModalWorksheet = () => {
    setIsModalWorksheetModalOpen((prev) => !prev);
  };

  const toggleModalWorksheet2 = () =>
    setIsModalWorksheet2ModalOpen((prev) => !prev);

  const toggleEvaluation = () => {
    setEvaluationOpen((prev) => !prev);
  };

  const handleDownload = () => {
    const pdfUrl = pdfDgestive;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download =
      "LESSON 1: STRUCTURES AND FUNCTIONS IN HUMAN FOCUS ON THE DIGESTIVE SYSTEM";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintHandout = () => {
    const pdfUrl = pdfDgestive;

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
            <span className="font-bold">LESSON 1:</span> STRUCTURES AND
            FUNCTIONS IN HUMAN FOCUS ON THE DIGESTIVE SYSTEM
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            The <b>food</b> that we eat plays a central role in the survival of
            species. It provides energy that enables us to carry out many
            activities that we do each day such as breathing, walking, studying,
            and cooking. Food must be broken down into a form that these
            microscopic cells can use. The body changes food into usable form
            using a group of organs referred to as{" "}
            <span className="text-red-600">
              <b>the digestive system</b>
            </span>
            .
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Food must be broken down into a form that these microscopic cells
            can use. The body changes food into usable form using a group of
            organs referred to as the digestive system.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            In humans, the digestive system is composed of the gastrointestinal
            tract (GI), also known as the alimentary canal and the accessory
            organs for digestion. The gastrointestinal tract starts at the{" "}
            <b>mouth</b>, continues to the{" "}
            <b>esophagus, stomach, small intestines, large intestine (colon)</b>
            , and <b>rectum</b>, and ends at the anus. Accessory organs that
            play very important roles in the digestive process are{" "}
            <b>the liver, gallbladder, and pancreas</b>.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            The chief function of the digestive system is digestion, the
            breakdown of organic compounds into their simple forms for use by
            the cells. It breaks down food mechanically and chemically.
          </p>
        </div>

        {/* Digestive System Section */}
        <div className="flex flex-col justify-center items-center mt-8 gap-8">
          {/* <div className="w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/X3TAROotFfM?si=6_iy2e-FyJVBG_JK&amp;start=3"
              title="Human digestive system - How it works! "
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div> */}

          <h1 className="text-primary text-xl sm:text-2xl md:text-3xl font-semibold mt-6">
            Digestive System 3D Model
          </h1>
          <div className="w-full h-auto rounded-lg">
            {/* <Render3d>
              <DigestiveSystem />
            </Render3d> */}
            <DigestiveSystemAnimation />
          </div>
          {/* <div className="min-h-scree flex flex-col items-center justify-center space-y-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 py-6">
              Biological System Animations
            </h1>
            <DigestiveSystemAnimation />
          </div> */}
          <p className="text-sm sm:text-base md:text-lg text-center">
            These are processes namely:
            <span className="font-semibold block mt-2">
              INGESTION, DIGESTION, ABSORPTION, ASSIMILATION, AND EGESTION
            </span>
          </p>
        </div>
      </div>

      {/* Indigestion Section */}
      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          INDIGESTION
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={Indigestion}
            alt="Digestion illustration"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
          />
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            <strong className="text-primary">A. Indigestion</strong> marks the
            beginning of the digestive process. It involves the intake of food
            or substances into the body through the mouth. This step is
            essential as it sets the stage for the breakdown and absorption of
            nutrients. The process starts with chewing, where food is
            mechanically broken down into smaller pieces, making it easier for
            the digestive system to process.
          </p>
        </div>
      </div>

      {/* Digestion Section */}
      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          DIGESTION
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={Digestion}
            alt="Digestion illustration"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
          />
          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg leading-relaxed">
              <strong className="text-primary">B. Digestion</strong> is the
              second process involved in the digestive system. It involves the
              breakdown of large food molecules into smaller molecules for easy
              absorption by the cells.{" "}
              <b>Both chemical and mechanical digestion</b>
              begin immediately in the <b>mouth</b>.
            </p>
            <ul className="list-disc pl-6">
              <li>
                The liver produces bile, a green fluid that emulsifies large fat
                droplets into smaller ones, stored in the gall bladder for later
                use.
              </li>
              <li>
                The pancreas releases enzymes through the pancreatic duct to aid
                in digestion:
                <ul className="list-[circle] pl-6">
                  <li>
                    <strong>Amylase:</strong> Breaks down carbohydrates into
                    sugars.
                  </li>
                  <li>
                    <strong>Peptidase:</strong> Breaks down proteins into amino
                    acids.
                  </li>
                  <li>
                    <strong>Lipase:</strong> Breaks down fats into fatty acids.
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              After about four hours, the stomach pushes partially digested food
              into the small intestine for further breakdown and absorption.
            </p>
          </div>
        </div>
      </div>

      {/* Absorption Section */}
      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          ABSORPTION
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={Absorption}
            alt="Absorption illustration"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
          />
          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg leading-relaxed">
              <strong className="text-primary">C. Absorption</strong> occurs
              mostly in the <b>small intestine</b> where several digestive
              juices, pancreatic juice, and bile aid in the chemical digestion
              of food.
            </p>
            <p>
              <b>
                {" "}
                Absorption is the process of passing the soluble food molecules
                in the wall of the small intestine through the villi – the tiny,
                finger-like projections from the epithelial lining of the
                intestinal wall
              </b>
              . Each villus contains blood capillaries that absorb water,
              glucose, amino acids, vitamins, minerals, and fatty acids. It also
              increases the amount of surface area available for the absorption
              of nutrients.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          ASSIMILATION
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={Assimilation}
            alt="Absorption illustration"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
          />
          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg leading-relaxed">
              <strong className="text-primary">D. Assimilation</strong> is the
              fourth process that occurs in the digestive system.
            </p>
            <p>
              It is the movement of digested food nutrients into the blood
              vessels of the small intestine through diffusion and the use of
              nutrients into the body cells through the{" "}
              <b>microvilli – microscopic cellular membrane projections</b> that
              serve to expand the surface area for diffusion and to lessen any
              increase in volume.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          EGESTION
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={Egestion}
            alt="Absorption illustration"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
          />
          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg leading-relaxed">
              <strong className="text-primary">D. Egestion</strong> is the last
              process that occurs in the digestive system. It is the release of
              undigested food collected in the <b>rectum</b> called feces and
              pushed out of the body through the anus by defecation
            </p>
          </div>
        </div>
      </div>

      {/* <Worksheet /> */}

      <Worksheets
        WorksheetData={DigestiveWorksheetsLink}
        toggleModalWorksheet={toggleModalWorksheet}
        toggleModalWorksheet2={toggleModalWorksheet2}
        toggleEvaluation={toggleEvaluation}
      />

      {/* Modals for Worksheets */}
      <Modal
        open={isModalWorksheetOpen}
        onClose={toggleModalWorksheet}
        title={DigestiveWorksheetsLink.worksheet1.title}
      >
        <Worksheet
          titles={
            "LESSON 1: STRUCTURES AND FUNCTIONS IN HUMAN FOCUS ON THE DIGESTIVE SYSTEM"
          }
          worksheet_no={1}
          setIsModalWorksheetModalOpen={setIsModalWorksheetModalOpen}
        />
      </Modal>

      <Modal
        open={isModalWorksheet2Open}
        onClose={toggleModalWorksheet2}
        title={DigestiveWorksheetsLink.worksheet2.title}
      >
        <Worksheet2
          titles={
            "LESSON 1: STRUCTURES AND FUNCTIONS IN HUMAN FOCUS ON THE DIGESTIVE SYSTEM"
          }
          worksheet_no={2}
          setIsModalWorksheet2ModalOpen={setIsModalWorksheet2ModalOpen}
        />
      </Modal>

      <Modal
        open={evaluationOpen}
        onClose={toggleEvaluation}
        title={DigestiveWorksheetsLink.evaluation.title}
      >
        <Evaluation />
      </Modal>

      {/* Footer */}
      <div className="flex flex-col items-end mt-10 space-y-4">
        <div className="bg-gray-200 w-full h-[1px]"></div>

        {/* <Link to="#meiosis">
          <button
            className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded shadow hover:bg-primary-dark transition"
            onClick={handleNextClick}
          >
            <p className="font-semibold text-lg">Lesson 2: Meiosis</p>
            <FaArrowRight />
          </button>
        </Link> */}

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
