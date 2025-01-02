import React, { useRef } from "react";
import FloatingButton from "../../../../components/FloatingButton/FloatingButton.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import cellCycle from "../../../../assets/images/cellCycle.png";

const Module1 = () => {
  const handleNextClick = () => {};

  const contentRef = useRef(null);
  const handlePrintHandout = useReactToPrint({
    contentRef,
    documentTitle: "Digestive System - Module 1",
    pageStyle: `
      .title: {
        font-size: 24px;
        font-weight: bold;
        display: flex;
        items-align: center;
        justify-content: center;
      }
    `,
  });

  return (
    <div className="px-4 lg:px-4 ">
      {/* Header Section */}
      <div ref={contentRef}>
        <div className="flex flex-col gap-8 title">
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug ">
            <span className="font-bold">LESSON 3:</span> CELL CYCLE: Interphase
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
            also undergo the same cycle of growth and division. The series of
            activities is called Cell Cycle.         
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            The two main stages in the cell cycle are Interphase- Period of
            Growth and Cell division (Mitosis and Meiosis). In Figure 1 is
            illustration of the stages of the cell cycle.
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

        {/* Digestive System Section */}
        <div className="flex flex-col justify-center items-center mt-8z gap-8">
          <img
            src={cellCycle}
            alt="Digestion illustration"
            className="w-full md:w-1/2 lg:w-1/3 h-auto object-contain rounded-lg shadow-md"
          />
          <p className="text-sm sm:text-base md:text-lg text-center">
            <span className="font-semibold block mt-2">
              Figure 1. Cell cycle in Eukaryotic cells
            </span>
          </p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">A. INTERPHASE</h2>
          <table className="w-full border border-gray-300">
            <caption className="text-lg font-semibold mb-2">
              Table 1: Event of Interphase stage
            </caption>
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  SUMMARY EVENTS DURING THE INTERPHASE STAGE
                </th>
                <th className="border border-gray-300 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  GO
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc pl-5">
                    <li>
                      A resting phase where the cell has left the cycle and has
                      stopped dividing
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  First Gap 1 – G1
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc pl-5">
                    <li>Cell grows initially</li>
                    <li>
                      Synthesis of protein and ribonucleic acid or RNA occurs
                    </li>
                    <li>Organelles such as mitochondria increase in number</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  Synthesis phase or S phase
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc pl-5">
                    <li>
                      DNA is synthesized, thus replicating the chromosomes in
                      preparation for the next cell division
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  Second Gap or G2
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc pl-5">
                    <li>Cell grows rapidly</li>
                    <li>
                      Cell prepares for the actual cell division (mitosis)
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
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
        <h2 className="text-xl font-bold mb-4">B. Cell Division</h2>
        <h2 className="text-sm sm:text-base md:text-lg mb-4">
          Cell Division may be the nuclear division (karyokinesis), which
          involves the division of the nucleus, and cytoplasmic division
          (cytokinesis) is the division of cytoplasm. There are two types: the
          mitosis (asexual reproduction) division and meiosis (sexual
          reproduction )
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-4">
          <span className="font-semibold"> I. MITOSIS</span> - a type of cell
          division that occurs in the nonreproductive (somatic) cells such as
          the skin, bones, nails, and hair. It is responsible for the increase
          in weight and height of the baby as she grows and develops into a
          teenager. Also responsible for the healing of the wounded when a part
          of a body is accidentally cut or scratched.
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
          <h2 className="text-2xl font-bold mb-4">
            Table 2: Stages of Mitosis with Each Activity
          </h2>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-gray-100 font-bold p-2">
              <div>Stages of Mitosis - PMAT</div>
              <div>Activities within the Cell</div>
            </div>

            {/* Prophase Row */}
            <div className="grid grid-cols-2 border-t border-gray-300 p-2">
              <div className="flex flex-col items-center">
                <img
                  src="/images/Prophase.jpg"
                  alt="Prophase of Mitosis"
                  className="mb-2 w-32 h-32 object-contain"
                />
                <p className="font-bold">Prophase of Mitosis</p>
              </div>
              <ul className="list-disc list-inside">
                <li>
                  Nucleolus disappears in the nucleus, serving as a starting
                  signal.
                </li>
                <li>The nuclear membrane disintegrates.</li>
                <li>
                  Each chromosome appears as two identical sister chromatids
                  joined at the centromere.
                </li>
                <li>
                  In the cytoplasm, spindle fibers begin to form, made of
                  microtubules arranged between the two centrioles.
                </li>
                <li>
                  The centrioles move away from each other, propelled by
                  lengthening bundles of microtubules.
                </li>
              </ul>
            </div>

            {/* Metaphase Row */}
            <div className="grid grid-cols-2 border-t border-gray-300 p-2">
              <div className="flex flex-col items-center">
                <img
                  src="/images/Metaphase.jpg"
                  alt="Metaphase of Mitosis"
                  className="mb-2 w-32 h-32 object-contain"
                />
                <p className="font-bold">Metaphase of Mitosis</p>
              </div>
              <ul className="list-disc list-inside">
                <li>
                  The centrioles are now at the opposite poles of the cell.
                </li>
                <li>Chromosomes align at the equatorial plane.</li>
                <li>
                  Each spindle fiber from both centrosomes connects to each
                  chromosome through its kinetochore.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 border-t border-gray-300 p-2">
              <div className="flex flex-col items-center">
                <img
                  src="/images/Anaphase.jpg"
                  alt="Anaphase of Mitosis"
                  className="mb-2 w-32 h-32 object-contain"
                />
                <p className="font-bold">Anaphase of Mitosis</p>
              </div>
              <ul className="list-disc list-inside">
                <li>
                  Spindle fibers begin to contract and become shorter. Continued
                  contraction causes the separation of the genetically identical
                  sister chromatids.
                </li>
                <li>Centromeres divide.</li>
                <li>The single chromatids move towards the opposite poles</li>
                <li>
                  Each chromatid is now considered an individual chromosome.
                </li>
                <li>
                  At the end of anaphase, the two poles of the cell have an
                  equal set of chromosomes.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 border-t border-gray-300 p-2">
              <div className="flex flex-col items-center">
                <img
                  src="/images/telophase.jpg"
                  alt="Telophase of Mitosis"
                  className="mb-2 w-32 h-32 object-contain"
                />
                <p className="font-bold">Telophase of Mitosis</p>
              </div>
              <ul className="list-disc list-inside">
                <li>
                  The chromosomes are now at the opposing poles of the spindle.
                </li>
                <li>The microtubules disappear. </li>
                <li>
                  Two sets of chromosomes are surrounded by new nuclear
                  membranes, completing the nuclear division process known as{" "}
                  <b>karyokinesis</b>.
                </li>
                <li>
                  Cytoplasmic division called <b>cytokinesis</b> occurs
                  concurrently, splitting the cell into two.
                </li>
              </ul>
            </div>
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

      <div className="w-full flex flex-col items-start gap-6 p-4">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-snug text-gray-800">
          WORKSHEET
        </h1>
        <ul className="list-disc pl-6 text-lg text-gray-700 flex flex-col gap-5">
          <li className="hover:text-blue-600">
            <a href="#" className="text-blue-600 hover:underline">
              Lesson 1: Digestive System
            </a>
          </li>
          <li className="hover:text-blue-600">
            <a href="#" className="text-blue-600 hover:underline">
              Lesson 1: Digestive System
            </a>
          </li>
          <li className="hover:text-blue-600">
            <a href="#" className="text-blue-600 hover:underline">
              Lesson 1: Digestive System
            </a>
          </li>
          <li className="hover:text-blue-600">
            <a href="#" className="text-blue-600 hover:underline">
              Lesson 1: Digestive System
            </a>
          </li>
        </ul>
      </div>
      {/* Footer */}
      <div className="flex flex-col items-end mt-10 space-y-4">
        <div className="bg-gray-200 w-full h-[1px]"></div>
        <button
          className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded shadow hover:bg-primary-dark transition"
          onClick={handleNextClick}
        >
          <p className="font-semibold text-lg">Lesson 2: Mendelian Genetics</p>
          <FaArrowRight />
        </button>
        <div className="bg-gray-200 w-full h-[1px]"></div>
      </div>

      {/* Floating Button */}
      <FloatingButton onPrint={handlePrintHandout} />
    </div>
  );
};

export default Module1;
