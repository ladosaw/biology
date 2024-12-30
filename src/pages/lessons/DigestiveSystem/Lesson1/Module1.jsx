import React from "react";
import FloatingButton from "../../../../components/floatingButton/floatingButton";
import Indigestion from "../../../../assets/images/indigestion.svg";
import Digestion from "../../../../assets/images/digestion.svg";

const Module1 = () => {
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
        <div className="bg-gray-400 w-full h-64 sm:h-80 md:h-96 rounded-lg"></div>
        <p className="text-sm sm:text-base md:text-lg text-center">
          These are processes namely:
          <span className="font-semibold block mt-2">
            INGESTION, DIGESTION, ABSORPTION, ASSIMILATION, AND EGESTION
          </span>
        </p>

        {/* Ingestion Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-100 p-6 rounded-lg shadow-md">
          <img
            src={Indigestion}
            alt="Indigestion illustration"
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain rounded-lg shadow-lg"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-primary text-2xl sm:text-3xl font-semibold border-b-4 border-primary pb-2">
              INDIGESTION
            </h1>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              <strong>A. Indigestion</strong> is the first process that happens
              in the digestive system. It is the journey of taking in food or
              any substance into the body through the mouth.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <FloatingButton />
    </div>
  );
};

export default Module1;
