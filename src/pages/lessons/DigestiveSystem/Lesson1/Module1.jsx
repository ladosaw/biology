import React from "react";
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

const Module1 = ({ hideFloating }) => {
  const handleNextClick = () => {};

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
    <div className="px-4 lg:px-4 ">
      {/* Header Section */}
      <div>
        <div className="flex flex-col gap-8 title">
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug ">
            <span className="font-bold">LESSON 1:</span> STRUCTURES AND
            FUNCTIONS IN HUMAN FOCUS ON THE DIGESTIVE SYSTEM
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            The food that we eat plays a central role in the survival of
            species. It provides energy that enables us to carry out many
            activities that we do each day such as breathing, walking, studying,
            and cooking. Food must be broken down into a form that these
            microscopic cells can use. The body changes food into usable form
            using a group of organs referred to as the digestive system.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Food must be broken down into a form that these microscopic cells
            can use. The body changes food into usable form using a group of
            organs referred to as the digestive system.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            In humans, the digestive system is composed of the gastrointestinal
            tract (GI), also known as the alimentary canal and the accessory
            organs for digestion. The gastrointestinal tract starts at the
            mouth, continues to the esophagus, stomach, small intestines, large
            intestine (colon), and rectum, and ends at the anus. Accessory
            organs that play very important roles in the digestive process are
            the liver, gallbladder, and pancreas.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            The chief function of the digestive system is digestion, the
            breakdown of organic compounds into their simple forms for use by
            the cells. It breaks down food mechanically and chemically.
          </p>
        </div>

        {/* Digestive System Section */}
        {/* Digestive System Section */}
        <div className="flex flex-col justify-center items-center mt-8 gap-8">
          {/* Embedded YouTube Video */}
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/X3TAROotFfM?si=6_iy2e-FyJVBG_JK&amp;start=3"
              title="Human digestive system - How it works! "
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>

          <h1 className="text-primary text-xl sm:text-2xl md:text-3xl font-semibold mt-6">
            Digestive System
          </h1>
          <div className="w-full h-64 sm:h-80 md:h-[500px] rounded-lg">
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
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-6 p-4">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-snug text-gray-800">
          WORKSHEET
        </h1>
        <ul className="list-disc pl-6 text-lg text-gray-700 flex flex-col gap-5">
          <li className="hover:text-blue-600">
            <a
              href={DigestiveWorksheetsLink.worksheet1.link}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {DigestiveWorksheetsLink.worksheet1.title}
            </a>
          </li>
          <li className="hover:text-blue-600">
            <a
              href={DigestiveWorksheetsLink.worksheet2.link}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {DigestiveWorksheetsLink.worksheet2.title}
            </a>
          </li>
          <li className="hover:text-blue-600">
            <a
              href={DigestiveWorksheetsLink.worksheet3.link}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {DigestiveWorksheetsLink.worksheet3.title}
            </a>
          </li>
        </ul>
      </div>
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
