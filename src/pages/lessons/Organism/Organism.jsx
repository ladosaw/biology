import { React, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import FloatingButton from "../../../components/FloatingButton/FloatingButton";
import OrganismPdf from "../../../assets/pdf/Organism.pdf";
import GrassImage from "../../../assets/images/grass.png";
import HeterotrophsImage from "../../../assets/images/HeterotrophsImage.png";
import HerbivoresImage from "../../../assets/images/HerbivoresImage.jpg";
import CarnivoresImage from "../../../assets/images/CarnivoresImage.png";
import OmnivoresImage from "../../../assets/images/OmnivoresImage.jpg";
import DecomposersImage from "../../../assets/images/DecomposersImage.jpg";
import FoodChainImage from "../../../assets/images/FoodChainImage.jpg";
import FoodWebImage from "../../../assets/images/FoodWebImage.jpg";
import BiomassImage from "../../../assets/images/BiomassImage.jpg";
import { OrganismWorksheetsLink } from "./ConstantData";
import Worksheets from "../../../components/Worksheets/Worksheets";
import FoodWebAnimation from "./FoodWebAnimation.jsx";
import WorksheetModal from "../../../components/Modal/Modal.jsx";
import Worksheet1 from "./Worksheet1";
import Worksheet2 from "./Worksheet2";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Worksheet3 from "./Worksheet3";
import Evaluation from "./Evaluation";
import Worksheet4 from "./Worksheet4.jsx";

const Organism = ({ hideFloating, hideAdditionalButtons = false }) => {
  const [isModalWorksheetOpen, setIsModalWorksheetModalOpen] = useState(false);
  const [isModalWorksheet2Open, setIsModalWorksheet2ModalOpen] =
    useState(false);
  const [isModalWorksheet3Open, setIsModalWorksheet3ModalOpen] =
    useState(false);

  const [isModalWorksheet4Open, setIsModalWorksheet4ModalOpen] =
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

  const toggleModalWorksheet4 = () => {
    setIsModalWorksheet4ModalOpen((prev) => !prev);
  };

  const toggleEvaluation = () => {
    setEvaluationOpen((prev) => !prev);
  };

  const handleDownload = () => {
    const pdfUrl = OrganismPdf;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "LESSON 5: TRANSFER OF ENERGY IN THE TROPHIC LEVEL";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintHandout = () => {
    const pdfUrl = OrganismPdf;

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

  const handlePreviousLesson = () => {
    window.location.href = "/lessons#mendelian-genetics";
    window.location.reload();
  };

  return (
    <div className="md:px-4 lg:px-4 text-justify text-sm sm:text-base md:text-lg">
      {/* Header Section */}

      <div className="flex flex-col gap-8">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug">
          <span className="font-bold">LESSON 5:</span> TRANSFER OF ENERGY IN THE
          TROPHIC LEVEL
        </h1>
        <div>
          <h1 className="font-bold">Objectives:</h1>
          <p>
            {" "}
            1. To identify the organisms comprising the food chain and food web.
          </p>
          <p>
            2. Construct a food chain and food web to show the transfer of
            energy from one trophic level to next.
          </p>
          <p>
            3. describe a food pyramid and the amount of biomass at energy
            level.
          </p>
          <p>
            4. Compute for the amount of energy being transferred from one
            trophic level to the next
          </p>
          <p>5. Appreciate the role of organisms in the ecosystem.</p>
        </div>
      </div>

      <div className=" py-8 px-8  space-y-6  lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          INTRODUCTION
        </h1>

        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold my-6">
          Food Web 3D Model
        </h1>
        <div className="w-full h-auto rounded-lg">
          <FoodWebAnimation />
        </div>

        {/* <div className="w-full sm:w-3/4 md:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg mx-auto">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/D1In8W2qev4?si=CfjZcmks9oRHtJDs&amp;start=7"
            title="TRANSFER OF ENERGY IN THE
          TROPHIC LEVEL"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div> */}

        <p className="indent-8 text-sm sm:text-base md:text-lg mb-8">
          Energy flow in the ecosystem is a <b>one-way process</b>. It flows
          from the sun to the producers and consumers, as shown in the{" "}
          <b>food chain</b> and <b>food web</b>.{" "}
          <span className="indent-8">
            An ecosystem needs energy because its living components also need
            energy. This is the most important factor that determines how many
            and what kind of organisms live in an ecosystem. In terms of
            nutrition, the organisms in an ecosystem can be classified into:
          </span>
        </p>
      </div>

      <div className=" py-8 px-8  space-y-6">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          A. Autotrophs or producers
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={GrassImage}
            alt="Grass Image"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain   "
          />
          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg leading-relaxed">
              Are organisms that can manufacture their food during
              photosynthesis. It can occupy the first tropic level in the food
              chain and food web. Produce all the food for heterotrophs. Without
              autotrophs there will be no life on earth.{" "}
              <b>Ex. Plants, algae</b>
            </p>
          </div>
        </div>
      </div>

      <div className=" p-6   space-y-6 md:mt-5 lg:mt-8">
        {/* Title Section */}
        <h1 className="text-primary text-2xl sm:text-3xl font-bold border-b-2 border-primary pb-2">
          B. Heterotrophs or consumers
        </h1>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Heterotrophs Image */}
          <img
            src={HeterotrophsImage}
            alt="Heterotrophs illustration"
            className="w-full md:w-1/3 h-auto  "
          />
          {/* Heterotrophs Description */}
          <div className="text-gray-700 space-y-4">
            <p className="text-base sm:text-lg leading-relaxed">
              Organisms that derive their energy from consuming other organisms.
              They occupy the succeeding levels, ending with the top or
              highest-level consumers. There are several types of consumers:
            </p>
          </div>
        </div>

        {/* Herbivores Section (Odd) */}
        <div className="pl-6 border-l-4 border-primary space-y-4">
          <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold">
            1. Herbivores <span className="font-normal">(Plant Eaters)</span>
          </h2>
          <div className="flex flex-col md:flex-row-reverse gap-6 items-start">
            {/* Text */}
            <div className="text-gray-700">
              <p className="text-base sm:text-lg leading-relaxed">
                Herbivores are organisms that consume plants to obtain energy.
                They are primary consumers in the food chain.
              </p>
            </div>
            {/* Image */}
            <img
              src={HerbivoresImage}
              alt="Herbivores illustration"
              className="w-full md:w-1/3 h-auto  "
            />
          </div>
        </div>

        {/* Carnivores Section (Even) */}
        <div className="pr-6 border-r-4 border-primary space-y-4">
          <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold">
            2. Carnivores <span className="font-normal">(Meat Eaters)</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Text */}
            <div className="text-gray-700">
              <p className="text-base sm:text-lg leading-relaxed">
                Carnivores are organisms that consume other animals for energy.
                They are secondary or tertiary consumers in the food chain.
              </p>
            </div>
            {/* Image */}
            <img
              src={
                CarnivoresImage
              } /* Replace with the actual image variable for Carnivores */
              alt="Carnivores illustration"
              className="w-full md:w-1/3 h-auto  "
            />
          </div>
        </div>

        {/* Omnivores Section (Odd) */}
        <div className="pl-6 border-l-4 border-primary space-y-4">
          <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold">
            3. Omnivores{" "}
            <span className="font-normal">(Plant & Meat Eaters)</span>
          </h2>
          <div className="flex flex-col md:flex-row-reverse gap-6 items-start">
            {/* Text */}
            <div className="text-gray-700">
              <p className="text-base sm:text-lg leading-relaxed">
                Omnivores are organisms that consume both plants and animals for
                energy. They are versatile feeders in the food chain.
              </p>
            </div>
            {/* Image */}
            <img
              src={
                OmnivoresImage
              } /* Replace with the actual image variable for Omnivores */
              alt="Omnivores illustration"
              className="w-full md:w-1/3 h-auto  "
            />
          </div>
        </div>

        {/* Decomposers Section (Even) */}
        <div className="pr-6 border-r-4 border-primary space-y-4">
          <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold">
            4. Decomposers{" "}
            <span className="font-normal">(Nutrient Recyclers)</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Text */}
            <div className="text-gray-700">
              <p className="text-base sm:text-lg leading-relaxed">
                Decomposers break down dead organisms and organic matter,
                recycling nutrients back into the ecosystem. Examples include
                fungi, bacteria, and some insects.
              </p>
            </div>
            {/* Image */}
            <img
              src={
                DecomposersImage
              } /* Replace with the actual image variable for Decomposers */
              alt="Decomposers illustration"
              className="w-full md:w-1/3 h-auto  "
            />
          </div>
        </div>

        <p className="indent-8 text-sm sm:text-base md:text-lg my-8">
          Ecologists assign each organism to a trophic level to follow the
          energy flow through an ecosystem. All members of this tropic level are
          the same. All members are of the same number of energy-transferring
          steps away from the sun.
        </p>
      </div>

      <div className=" py-8 px-8  space-y-6 lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          Food Chain
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={FoodChainImage}
            alt=" Food Chain Image"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain  "
          />
          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg leading-relaxed">
              A Food Chain is a chain sequence of organisms used as food and the
              organisms that feed on them. It is an arrangement of organisms
              according to the order of predation in which one uses another
              source of food. The rule of 10% of the total amount of energy in a
              food chain goes to the next level since 90% of it is used by the
              organism itself.
            </p>
          </div>
        </div>
      </div>

      <div className=" py-8 px-8  space-y-6  lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          Food Web
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={FoodWebImage}
            alt="Food Web Image"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain "
          />
          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg leading-relaxed">
              The Food Web shows a complex feeding interrelationship between
              organisms in an area. It consists of interconnected food chains.
              It started with a producer who was followed by a series of
              consumers.
            </p>
          </div>
        </div>
      </div>

      <div className=" py-8 px-8  space-y-6  lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          Food Pyramid
        </h1>

        <p className="indent-8 text-sm sm:text-base md:text-lg mb-8">
          The sun is the source of energy that plants convert into biomass. As
          the trophic level in the food pyramid increases, biomass decreases. In
          the food pyramid, the producers such as the plants start at the first
          trophic level at the bottom, plant-eaters at the second trophic level,
          and animal eaters at the third trophic level or succeeding level. The
          pyramid usually ends with the apex consumer.
        </p>
      </div>

      <div className=" py-8 px-8  space-y-6  lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          Biomass
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={BiomassImage}
            alt="Biomass Image"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain  "
          />
          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg leading-relaxed">
              The transfer of matter is expressed as biomass, and the transfer
              of food energy from one trophic level to another is not{" "}
              <b>100%</b>.{" "}
              <b>
                Biomass is the total mass of organic molecules minus water of an
                organism in a food chain and food web
              </b>
              . The organisms consuming plants or animals at the next level do
              not consume all parts of a plant or animal. For example: bones,
              wood, shells, and some fruits and seeds.{" "}
              <b>
                Only 10% of energy is transferred to the next level. A biomass
                pyramid and an energy pyramid demonstrate the relationship
                between producers and consumers.
              </b>
            </p>
          </div>
        </div>
      </div>

      <Worksheets
        WorksheetData={OrganismWorksheetsLink}
        toggleModalWorksheet={toggleModalWorksheet}
        toggleModalWorksheet2={toggleModalWorksheet2}
        toggleModalWorksheet3={toggleModalWorksheet3}
        toggleModalWorksheet4={toggleModalWorksheet4}
        toggleEvaluation={toggleEvaluation}
      />

      <WorksheetModal
        open={isModalWorksheetOpen}
        onClose={toggleModalWorksheet}
        title={OrganismWorksheetsLink.worksheet1.title}
      >
        <Worksheet1
          titles={"LESSON 5: TRANSFER OF ENERGY IN THE TROPHIC LEVEL"}
          worksheet_no={1}
          setIsModalWorksheetModalOpen={setIsModalWorksheetModalOpen}
          setIsModalWorksheet2ModalOpenNext={setIsModalWorksheet2ModalOpen}
        />
      </WorksheetModal>

      <WorksheetModal
        open={isModalWorksheet2Open}
        onClose={toggleModalWorksheet2}
        title={OrganismWorksheetsLink.worksheet2.title}
      >
        <Worksheet2
          titles={"LESSON 5: TRANSFER OF ENERGY IN THE TROPHIC LEVEL"}
          worksheet_no={2}
          setIsModalWorksheet2ModalOpen={setIsModalWorksheet2ModalOpen}
          setIsModalWorksheetModalOpenPrevious={setIsModalWorksheetModalOpen}
          setIsModalWorksheet3ModalOpenNext={setIsModalWorksheet3ModalOpen}
        />
      </WorksheetModal>

      <WorksheetModal
        open={isModalWorksheet3Open}
        onClose={toggleModalWorksheet3}
        title={OrganismWorksheetsLink.worksheet3.title}
      >
        <DndProvider backend={HTML5Backend}>
          <Worksheet3
            titles={"LESSON 5: TRANSFER OF ENERGY IN THE TROPHIC LEVEL"}
            worksheet_no={3}
            setIsModalWorksheet3ModalOpen={setIsModalWorksheet3ModalOpen}
            setIsModalWorksheet2ModalOpenPrevious={
              setIsModalWorksheet2ModalOpen
            }
            setIsModalWorksheet4ModalOpenNext={setIsModalWorksheet4ModalOpen}
          />
        </DndProvider>
      </WorksheetModal>

      <WorksheetModal
        open={isModalWorksheet4Open}
        onClose={toggleModalWorksheet4}
        title={OrganismWorksheetsLink.worksheet4.title}
      >
        <Worksheet4
          titles={"LESSON 5: TRANSFER OF ENERGY IN THE TROPHIC LEVEL"}
          worksheet_no={4}
          setIsModalWorksheet4ModalOpen={setIsModalWorksheet4ModalOpen}
          setIsModalWorksheet3ModalOpenPrevious={setIsModalWorksheet3ModalOpen}
          setEvaluationOpenNext={setEvaluationOpen}
        />
      </WorksheetModal>

      <WorksheetModal
        open={evaluationOpen}
        onClose={toggleEvaluation}
        title={OrganismWorksheetsLink.evaluation.title}
      >
        <Evaluation
          titles={"LESSON 5: TRANSFER OF ENERGY IN THE TROPHIC LEVEL"}
          worksheet_no={0}
          setEvaluationOpen={setEvaluationOpen}
          setIsModalWorksheet4ModalOpenPrevious={setIsModalWorksheet4ModalOpen}
        />
      </WorksheetModal>

      {!hideAdditionalButtons && (
        <div className="flex flex-col items-end mt-10 space-y-4">
          <div className="bg-gray-200 w-full h-[1px]" />
          <div className="flex justify-between items-center w-full mt-8">
            {/* Previous Button */}
            <button
              onClick={handlePreviousLesson}
              className="flex items-center gap-2 bg-gray-200 text-gray-800 px-5 py-2 rounded-xl shadow hover:bg-gray-300 transition duration-200"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span className="font-semibold text-lg">
                Lesson 4: Mendelian Genetics
              </span>
            </button>
          </div>
          <div className="bg-gray-200 w-full h-[1px]" />
        </div>
      )}

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

export default Organism;
