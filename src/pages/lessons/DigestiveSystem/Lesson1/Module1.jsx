import React from "react";
import FloatingButton from "../../../../components/floatingButton/floatingButton";
import Indigestion from "../../../../assets/images/indigestion.svg";
import Digestion from "../../../../assets/images/digestion.svg";
import Absorption from "../../../../assets/images/absorption.jpg";
import { FaArrowRight } from "react-icons/fa";
import Render3d from "../../../../components/renderer/render3d";
import DigestiveSystem from "../../../../components/model/DigestiveSystem";

const Module1 = () => {
  const handleClick = () => {
    // Empty function for now
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col gap-8">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug">
          <span className="font-bold">LESSON 1:</span> STRUCTURES AND FUNCTIONS
          IN HUMAN FOCUS ON THE DIGESTIVE SYSTEM
        </h1>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
          The food that we eat plays a central role in the survival of species.
          It provides energy that enables us to carry out many activities that
          we do each day such as breathing, walking, studying, and cooking. Food
          must be broken down into a form that these microscopic cells can use.
          The body changes food into usable form using a group of organs
          referred to as the digestive system.
        </p>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
          Food must be broken down into a form that these microscopic cells can
          use. The body changes food into usable form using a group of organs
          referred to as the digestive system.
        </p>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
          In humans, the digestive system is composed of the gastrointestinal
          tract (GI), also known as the alimentary canal and the accessory
          organs for digestion. The gastrointestinal tract starts at the mouth,
          continues to the esophagus, stomach, small intestines, large intestine
          (colon), and rectum, and ends at the anus. Accessory organs that play
          very important roles in the digestive process are the liver,
          gallbladder, and pancreas.
        </p>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
          The chief function of the digestive system is digestion, the breakdown
          of organic compounds into their simple forms for use by the cells. It
          breaks down food mechanically and chemically.
        </p>
      </div>

      {/* Digestive System Section */}
      <div className="flex flex-col justify-center items-center mt-8 gap-8">
        <h1 className="text-primary text-xl sm:text-2xl md:text-3xl font-semibold">
          Digestive System
        </h1>
        <div className="bg-gray-400 w-full h-64 sm:h-80 md:h-96 rounded-lg">
          <Render3d>
            <DigestiveSystem />
          </Render3d>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-center">
          These are processes namely:
          <span className="font-semibold block mt-2">
            INGESTION, DIGESTION, ABSORPTION, ASSIMILATION, AND EGESTION
          </span>
        </p>

        {/* Indigestion Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h1 className="text-primary text-2xl sm:text-3xl font-semibold border-b-4 border-primary pb-2">
            INDIGESTION
          </h1>

          <div className="relative float-left w-48 sm:w-60 md:w-72 lg:w-96 mr-6 mb-4">
            <img
              src={Indigestion}
              alt="Digestion illustration"
              className="w-full h-auto object-contain rounded-lg shadow-md"
            />
          </div>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <strong>A. Indigestion</strong> marks the beginning of the digestive
            process. It involves the intake of food or substances into the body
            through the mouth. This step is essential as it sets the stage for
            the breakdown and absorption of nutrients. The process starts with
            chewing, where food is mechanically broken down into smaller pieces,
            making it easier for the digestive system to process.
          </p>
        </div>

        {/* Digestion Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h1 className="text-primary text-2xl sm:text-3xl font-semibold border-b-4 border-primary pb-2">
            DIGESTION
          </h1>

          <div className="relative float-left w-48 sm:w-60 md:w-72 lg:w-96 mr-6 mb-4">
            <img
              src={Digestion}
              alt="Digestion illustration"
              className="w-full h-auto object-contain rounded-lg shadow-md"
            />
          </div>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <strong>B. Digestion</strong> is the second process involved in the
            digestive system. It involves the breakdown of large food molecules
            into smaller molecules for easy absorption by the cells. Both
            chemical and mechanical digestion begin immediately in the mouth.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Chewing starts the process of mechanical digestion as the teeth cut
            and grind the food into smaller pieces. At the same time, the
            salivary glands produce saliva to begin the process of chemical
            digestion. Saliva contains the enzyme amylase, which starts the
            breakdown of starch into sugar.
          </p>

          <ul className="text-sm sm:text-base md:text-lg leading-relaxed list-disc pl-6 mt-4">
            <li>
              The liver produces bile, a green fluid that emulsifies large fat
              droplets into smaller ones, stored in the gall bladder for later
              use.
            </li>
            <li>
              The pancreas releases enzymes through the pancreatic duct to aid
              in digestion:
              <ul className="list-[circle] pl-6 mt-2">
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

          <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-4">
            After about four hours, the stomach pushes partially digested food
            into the small intestine, where further breakdown and absorption
            occur.
          </p>
        </div>

        {/* Absorption Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h1 className="text-primary text-2xl sm:text-3xl font-semibold border-b-4 border-primary pb-2">
            ABSORPTION
          </h1>

          <div className="relative float-right w-48 sm:w-60 md:w-72 lg:w-96 ml-6 mb-4">
            <img
              src={Absorption}
              alt="Absorption illustration"
              className="w-full h-auto object-contain rounded-lg shadow-md"
            />
          </div>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <strong>C. Absorption</strong> is the third process that happens in
            the digestive system.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            It occurs mostly in the small intestine where several digestive
            juices, pancreatic juice, and bile aid in the chemical digestion of
            food.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Absorption is the process of passing the soluble food molecules in
            the wall of the small intestine through the villi – the tiny,
            finger-like projections from the epithelial lining of the intestinal
            wall. Each villus contains blood capillaries that absorb water,
            glucose, amino acids, vitamins, minerals, and fatty acids. It also
            increases the amount of surface area available for the absorption of
            nutrients.
          </p>
        </div>

        {/* Assimilation Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h1 className="text-primary text-2xl sm:text-3xl font-semibold border-b-4 border-primary pb-2">
            ASSIMILATION
          </h1>
          <div className=" flex flex-col items-center gap-6">
            <div className="flex justify-center w-full my-4">
              <img
                src={Absorption}
                alt="Absorption illustration"
                className="w-48 sm:w-60 md:w-72 lg:w-96 h-auto object-contain rounded-lg shadow-md"
              />
            </div>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              <strong>C. Assimilation</strong> is the third process that happens
              in the digestive system.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              It is the movement of digested food nutrients into the blood
              vessels of the small intestine through diffusion and the use of
              nutrients into the body cells through the microvilli – microscopic
              cellular membrane projections that serve to expand the surface
              area for diffusion and to lessen any increase in volume.
            </p>
          </div>
        </div>
      </div>

      {/* Footer  */}
      <div className="flex flex-col items-end mt-8 gap-4">
        <div className="bg-[#E9E9E9] w-full h-[1px]"></div>
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-2 rounded"
          onClick={handleClick}
        >
          <p className="text-primary font-semibold text-lg">
            Lesson 2: Mandelian Genetics
          </p>
          <FaArrowRight className="text-primary text-xl" />
        </div>
        <div className="bg-[#E9E9E9] w-full h-[1px]"></div>
      </div>

      {/* Floating Button */}
      <FloatingButton />
    </div>
  );
};

export default Module1;
