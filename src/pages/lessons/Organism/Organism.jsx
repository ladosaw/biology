import React from "react";
import FloatingButton from "../../../components/FloatingButton/FloatingButton";
import MendelianGeneticsPdf from "../../../assets/pdf/MendelianGenetics.pdf";

import GrassImage from "../../../assets/images/grass.png";
import HeterotrophsImage from "../../../assets/images/HeterotrophsImage.png";
import HerbivoresImage from "../../../assets/images/HerbivoresImage.jpg";
import CarnivoresImage from "../../../assets/images/CarnivoresImage.png";
import OmnivoresImage from "../../../assets/images/OmnivoresImage.jpg";
import DecomposersImage from "../../../assets/images/DecomposersImage.jpg";
import FoodChainImage from "../../../assets/images/FoodChainImage.jpg";
import FoodWebImage from "../../../assets/images/FoodWebImage.png";
import BiomassImage from "../../../assets/images/BiomassImage.jpg";

const Organism = ({ hideFloating }) => {
  const handleDownload = () => {
    const pdfUrl = MendelianGeneticsPdf;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "LESSON 4: PATTERNS OF MENDELIAN GENETICS";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintHandout = () => {
    const pdfUrl = MendelianGeneticsPdf;

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

      <div className="flex flex-col gap-8">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug">
          <span className="font-bold">LESSON 5:</span> TRANSFER OF ENERGY IN THE
          TROPHIC LEVEL
        </h1>
      </div>

      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6  lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          INTRODUCTION
        </h1>

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

      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          A. Autotrophs or producers
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={GrassImage}
            alt="Grass Image"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
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

      <div className="bg-white p-6 rounded-lg shadow space-y-6 md:mt-5 lg:mt-8">
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
            className="w-full md:w-1/3 h-auto rounded-lg shadow"
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
              className="w-full md:w-1/3 h-auto rounded-lg shadow"
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
              className="w-full md:w-1/3 h-auto rounded-lg shadow"
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
              className="w-full md:w-1/3 h-auto rounded-lg shadow"
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
              className="w-full md:w-1/3 h-auto rounded-lg shadow"
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

      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6 lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          Food Chain
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={FoodChainImage}
            alt=" Food Chain Image"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
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

      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6  lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          Food Web
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={FoodWebImage}
            alt="Food Web Image"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
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

      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6  lg:mt-8">
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

      <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6  lg:mt-8">
        <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
          Biomass
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <img
            src={BiomassImage}
            alt="Biomass Image"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
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

      <div className="w-full flex flex-col items-start gap-6 mt-12">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-snug text-gray-800">
          WORKSHEET
        </h1>
        <ul className="list-disc pl-6 text-lg text-gray-700 flex flex-col gap-5">
          <li className="hover:text-blue-600">
            <a href="#" className="text-blue-600 hover:underline">
              Lesson 1: Mendelian Genetics
            </a>
          </li>
          <li className="hover:text-blue-600">
            <a href="#" className="text-blue-600 hover:underline">
              Lesson 1: Mendelian Genetics
            </a>
          </li>
          <li className="hover:text-blue-600">
            <a href="#" className="text-blue-600 hover:underline">
              Lesson 1: Mendelian Genetics
            </a>
          </li>
          <li className="hover:text-blue-600">
            <a href="#" className="text-blue-600 hover:underline">
              Lesson 1: Mendelian Genetics
            </a>
          </li>
        </ul>
      </div>
      {/* Footer */}
      <div className="flex flex-col items-end mt-10 space-y-4">
        <div className="bg-gray-200 w-full h-[1px]"></div>

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

export default Organism;
