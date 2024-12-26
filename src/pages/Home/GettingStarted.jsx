import React from "react";
import bioImage from "../../assets/images/biology.png";
import Btn from "../../components/buttons/buttons.jsx";

const GettingStarted = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-16 min-h-screen p-6 ">
      {/* Left Section - Text */}
      <section className="text-center lg:text-left lg:w-1/2 space-y-8">
        <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-800 leading-tight">
          Limitless Learning at Your Fingertips
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
          Unlock your potential with our extensive library of educational
          content. Explore interactive lessons, quizzes, and more to enhance
          your learning journey.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Btn
            text="Get Started"
            className="px-8 py-3 text-lg bg-primary hover:bg-primary-dark text-white rounded-full transition-all duration-300"
          />
        </div>
      </section>

      {/* Right Section - Image */}
      <section className="w-full lg:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          src={bioImage}
          alt="Biology illustration"
          className="max-w-full h-auto object-cover transform transition duration-500 hover:scale-105"
        />
      </section>
    </div>
  );
};

export default GettingStarted;
