import React from "react";
import biologyImg from "../../assets/images/biology.png";
import Btn from "../../components/buttons/buttons.jsx";

const Lessons = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 justify-between items-center md:h-screen ">
        {/* title Section */}
        <div className="flex flex-col gap-4 justify-center text-center md:text-left">
          <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl">
            <span className="text-primary font-bold">Lesson 1:</span> Digestive
            System
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl">
            Module 1: What is the importance of Liver?
          </p>
          <p className="text-sm md:text-base lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
            repellat.
          </p>
          <div>
            <Btn text="Getting Started" />
          </div>
          <div className="flex flex-wrap gap-4 md:gap-8 font-bold text-lg md:text-xl lg:text-2xl mt-8 items-start justify-center md:justify-start">
            <p>MITOSIS</p>
            <p>DIGESTIVE</p>
            <p>ORGANISM</p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 lg:w-1/2">
          <img
            src={biologyImg}
            alt="Biology Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Lessons;
