import React, { useEffect, useState } from "react";
import { FiArrowUp, FiPrinter } from "react-icons/fi";
import { FaDownload } from "react-icons/fa6";

const FloatingButton = ({
  onPrint,
  onDownload,
  hasPrinter = true,
  hasDownload = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);

  // Show or hide the button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowAdditionalButtons(false); // Hide additional buttons when scrolling up
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4">
          {/* Additional Buttons */}
          {showAdditionalButtons && (
            <>
              {hasDownload && (
                <button
                  onClick={onDownload}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                  aria-label="Download Page"
                >
                  <FaDownload size={20} />
                </button>
              )}
              {hasPrinter && (
                <button
                  onClick={onPrint}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                  aria-label="Print Page"
                >
                  <FiPrinter size={20} />
                </button>
              )}
              <button
                onClick={scrollToTop}
                className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                aria-label="Scroll to Top (Secondary)"
              >
                <FiArrowUp size={20} />
              </button>
            </>
          )}

          {/* Main Button */}
          <button
            onClick={() => setShowAdditionalButtons(!showAdditionalButtons)}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            aria-label="Toggle Additional Buttons"
          >
            <FiArrowUp size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingButton;
