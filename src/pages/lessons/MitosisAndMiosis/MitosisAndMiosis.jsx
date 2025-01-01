import { React, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaArrowRight } from "react-icons/fa";
import crossingOver from "../../../assets/images/crossingOver.png";
import FloatingButton from "../../../components/floatingButton/FloatingButton.jsx";
import karyotype from "../../../assets/images/karyotype.png";
import sexChromosomes from "../../../assets/images/sexChromosomes.png";
import meiosisDivisions from "../../../assets/images/meiosisDivision.png";
import prophaseStage from "../../../assets/images/prophaseStage.png";
import roleMeiosis from "../../../assets/images/roleMeiosis.png";

const MiosisAndMitosis = () => {
  const handleNextClick = () => {};

  // const handlePrintHandout = () => {
  //   const pdfUrl = pdfDgestive;

  //   const link = document.createElement("a");
  //   link.href = pdfUrl;
  //   link.download = "Meiosis";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const contentRef = useRef(null);
  const handlePrintHandout = useReactToPrint({
    contentRef,
    documentTitle: "Digestive System",
  });

  return (
    <div className="px-4 lg:px-4">
      {/* Header Section */}
      <div ref={contentRef}>
        <div className="flex flex-col gap-8">
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug">
            <span className="font-bold">LESSON 1:</span> Cell Cycle: COMPARING
            MITOSIS AND MEIOSIS
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            VOCABULARY WORDS:
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <span className="font-semibold">Diploid Cell (2N)</span> - means the
            nucleus of our body contains two sets of homologous chromosomes that
            we inherited half from our father (n=23) and half from our mother
            (n=23)
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <span className="font-semibold">Haploid cells (n)</span> - a gamete
            (either sperm or egg) containing a half set of chromosomes
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <span className="font-semibold">Crossing over</span> - the exchange
            of genetic materials that produce a combination of genes along
            chromosomes. It brings variation to organisms that no one is exactly
            alike.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <span className="font-semibold">XY Chromosomes</span>
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <span className="font-semibold">XX Chromosomes</span>
          </p>
        </div>

        {/* Digestive System Section */}
        <div className="flex flex-col justify-center items-center mt-8 gap-8">
          <div className="w-full h-64 sm:h-80 md:h-auto rounded-lg flex items-center justify-center">
            <img
              src={crossingOver}
              alt="Illustration of homologous chromosomes showing crossing-over"
              className="max-h-full max-w-full rounded "
            />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-center mt-4">
            <span className="block">
              <span className="font-semibold">Figure 1</span>: Homologous
              chromosomes showing crossing-over
            </span>
          </p>

          <div className="w-full h-64 sm:h-80 md:h-auto rounded-lg flex items-center justify-center">
            <img
              src={sexChromosomes}
              alt="Illustration of homologous chromosomes showing crossing-over"
              className="max-h-full max-w-full rounded"
            />
          </div>
          <div className="chromosomesContainer">
            <p className="text-sm sm:text-base md:text-lg text-center mt-4">
              <span className="block">
                <span className="font-semibold">Figure 2</span>:  Figure 2 :
                Human Sex Chromosomes (XY, XX)               
              </span>
            </p>

            <div className="w-full h-64 sm:h-80 md:h-auto rounded-lg flex items-center justify-center">
              <img
                src={karyotype}
                alt="Illustration of homologous chromosomes showing crossing-over"
                className="max-h-full max-w-full rounded"
              />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-center mt-4">
              <span className="block">
                <span className="font-semibold">Figure 3</span>: Figure 3; Human
                Karyotype with 46 diploid and 23 haploid
              </span>
            </p>
          </div>

          {/* Indigestion Section */}
          <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
            <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
              MEIOSIS: DIPLOID AND HAPLOID CHROMOSOMES
            </h1>

            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                There are two main types of cells possessed by multicellular
                eukaryotic organisms: somatic, or body cells, and gametes, or
                sex cells. The majority of the cells are called somatic or body
                cells. These consist of two complete sets of chromosomes, making
                them diploid in number (2N).
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Humans have 46 chromosomes. This is our diploid number (2N).
                Diploid means the nucleus of the nucleus of our body contains
                two sets of homologous chromosomes. We inherited half of these
                chromosomes from our father and half from our mother 2(23).
                Homologous chromosomes mean that they both carry the genes
                controlling the same traits. The exception is our reproductive
                cells – the egg and the sperm, collectively known as gametes.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Each egg or sperm has a single set of chromosomes composed of 22
                autosomes and one pair of sex chromosomes, which either be X or
                Y. Therefore, our gametes are haploid cells (N) since they carry
                a single set of chromosomes.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                The number of chromosomes normally remains the same within the
                species. It does not double or triple for every generation. This
                suggests that different kinds of cell division must take place
                in an individual. This kind of cell division is called meiosis,
                from the Greek word that means “to make smaller”, Meiosis
                reduces the chromosomes number in half. It is a form of sexual
                reproduction that takes place in the ovaries (egg cell) and
                testes (sperm cell)  of animals during the formation of
                gametogenesis (spermatogenesis and oogenesis). Meiosis is a
                special type of cell division where the cell undergoes two
                cellular divisions: Meiosis 1 and Meiosis II.
              </p>
            </div>
          </div>

          <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
            <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
              Meiosis I.
            </h1>

            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                The first meiotic division, also known as Meiosis I, is a
                reduction division phase (diploid - haploid). There are two
                daughter cells produced after Meiosis 1, each daughter cell is
                carrying haploid number of chromosomes. This consists of four
                stages, namely, prophase I, metaphase I, anaphase I, and
                telophase I. Another important event is{" "}
                <span className="font-semibold"> crossing-over</span> where the
                exchange of genetic materials may bring variation to organisms.
              </p>
            </div>
            <h1 className="text-primary text-1xl sm:text-2xl font-extrabold border-b-4 border-primary pb-3 mb-6">
              Prophase I Stage
            </h1>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Meiosis starts with this stage and includes the following
                substages: leptotene, zygotene, pachytene, diplotene, and
                diakinesis. Figure 2 and 3 shows the homologous chromosomes with
                the occurrence of crossingover and different substages of
                prophase I respectively.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Leptotene</span> - Each
                chromosome is made up of two long threads of sister chromatids
                because of replication during the S phase of the cell cycle.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Zygotene</span> - The
                chromosomes begin to pair off. Pairs of chromosomes are called
                homologous chromosomes, and this pairing process is exact
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Pachytene</span> - The
                chromosomes contract due to repeated coiling. Crossing-over
                takes place where a segment of the sister chromatid of one of
                the chromosomes is exchanged with the same segment of the sister
                chromatid of the homologous chromosomes through the formation of
                a cross-linked of the segments called chiasma. After crossing
                over, the sister chromatids of each chromosome may no longer be
                identical to each other based on the genetic material they
                contain
              </p>
            </div>
            <p className="text-gray-700 text-base sm:text-lg">
              <span className="font-semibold">Diplotene</span> - The chromosomes
              begin to uncoil
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              <span className="font-semibold">Diakinesis</span> - The paired
              chromosomes disperse in the nucleus.
            </p>
            <div className="w-full h-64 sm:h-80 md:h-auto rounded-lg flex flex-col items-center justify-center">
              <img
                src={prophaseStage}
                alt="Illustration of homologous chromosomes showing crossing-over"
                className="max-h-full max-w-full rounded "
              />
              <p>Figure 3: Showing the Prophase Stage of Meiosis Source:</p>
            </div>
          </div>

          <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Metaphase 1</span> - The paired
                chromosomes arrange themselves along the equatorial plate.
              </p>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Anaphase 1</span> - Spindle
                fibers form and attach to the centromeres of the chromosomes.
                The homologous chromosomes separate from each other completely
                and start their movement towards the poles of the cells as they
                pulled by the spindle fibers. As the centromere of each other
                chromosomes do not divide, the sister chromatids remain
                together.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Telophase 1</span> - In this
                stage the chromosomes reach their respective poles. Cytokinesis
                follows and two daughter cells are formed. Each cell now has
                half the chromosome number because only one chromosome from each
                other pair goes to the daughter cell. This is called the haploid
                condition. In difference to the diploid condition at the
                beginning of the meiosis I where each chromosome pair is intact.
                Telophase comes after by interphase II.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Take note that each chromosome still has two sister chromatids;
                it is therefore required for the cells to undergo another round
                of division.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                The second meiotic, also known as meiosis II, it contains the
                following stages: prophase II, metaphase II, anaphase II, and
                Telophase II; these stages are identical to mitotic stages. The
                outcome is four cells, two from each daughter cell from meiosis
                I, with one-half the diploid chromosome number and wait only one
                sister chromatid for each chromosome. Figure 10 shows the stages
                of Meiosis I and Meiosis II. In meiosis I, the two homologous
                chromosomes separate which results in two haploid (n) daughter
                cells with chromosomes with two chromatids each. In meiosis II,
                four haploid (n) daughter cells are formed. Each cell is
                carrying a haploid number of chromosomes
              </p>
            </div>
            <div className="w-full h-64 sm:h-80 md:h-auto rounded-lg flex flex-col items-center justify-center">
              <img
                src={meiosisDivisions}
                alt="Illustration of homologous chromosomes showing crossing-over"
                className="max-h-full max-w-full rounded "
              />
              <p>Figure 3: Showing the Prophase Stage of Meiosis Source:</p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Diplotene</span> - The
                chromosomes begin to uncoil
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Diakinesis</span> - The paired
                chromosomes disperse in the nucleus.
              </p>
            </div>
          </div>

          <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
            <div>
              <h2 className="text-lg font-bold text-center mb-4">
                Comparison Between Mitosis and Meiosis
              </h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">
                      Characteristics
                    </th>
                    <th className="border border-gray-300 p-2">Mitosis</th>
                    <th className="border border-gray-300 p-2">Meiosis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Location</td>
                    <td className="border border-gray-300 p-2">
                      Somatic cells
                    </td>
                    <td className="border border-gray-300 p-2">
                      Reproductive cells
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      Chromosome number of parent cell
                    </td>
                    <td className="border border-gray-300 p-2">
                      Diploid (2n) or haploid (n)
                    </td>
                    <td className="border border-gray-300 p-2">Haploid (n)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      Chromosome number of daughter cell
                    </td>
                    <td className="border border-gray-300 p-2">Diploid (2n)</td>
                    <td className="border border-gray-300 p-2">Haploid (n)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      Number of daughter cells produced
                    </td>
                    <td className="border border-gray-300 p-2">Two</td>
                    <td className="border border-gray-300 p-2">Four</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      Number of nuclear divisions
                    </td>
                    <td className="border border-gray-300 p-2">One</td>
                    <td className="border border-gray-300 p-2">Two</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      Kind of reproduction
                    </td>
                    <td className="border border-gray-300 p-2">Asexual</td>
                    <td className="border border-gray-300 p-2">Sexual</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h2 className="text-lg font-bold text-center mt-8 mb-4">
                Role of Mitosis and Meiosis in Cell Division
              </h2>
              <div className="w-full h-64 sm:h-80 md:h-auto rounded-lg flex flex-col items-center justify-center">
                <img
                  src={roleMeiosis}
                  alt="Illustration of homologous chromosomes showing crossing-over"
                  className="max-h-full max-w-full rounded "
                />
                <p>Figure 3: Showing the Prophase Stage of Meiosis Source:</p>
              </div>

              <table className="w-full border-collapse border border-gray-300 tables">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Mitosis</th>
                    <th className="border border-gray-300 p-2">Meiosis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <strong>1. For somatic or body cell production</strong>
                      <p>
                        The repeated cell division through mitosis increases the
                        number of somatic cells, which is important for the
                        growth of organisms.
                      </p>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <strong>1. For gametes or sex cell production</strong>
                      <p>
                        The diploid parent sex cells divide twice, resulting in
                        four genetically different haploid (N) daughter cells.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <strong>2. For asexual reproduction</strong>
                      <p>
                        Unicellular organisms reproduce fast and easily by
                        mitosis, resulting in genetically identical offspring.
                        Among plants, reproduction is possible through cloning,
                        grafting, and marcotting.
                      </p>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <strong>2. For sexual reproduction</strong>
                      <p>
                        Most multicellular organisms start as a single cell—a
                        fertilized egg (zygote) formed by the union of a female
                        gamete (egg) and a male gamete (sperm) through meiotic
                        cell division.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <strong>3. For genetic stability</strong>
                      <p>
                        During mitosis, the resulting two daughter cells have
                        the same type and number of genes as the original parent
                        cell, preserving genetic composition.
                      </p>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <strong>3. For genetic diversity</strong>
                      <p>
                        Meiosis produces gametes with half the genetic
                        information of the parent cell. These gametes combine
                        during fertilization, resulting in offspring with varied
                        DNA sequences.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <strong>
                        4. For the repair of damaged cells/tissues
                      </strong>
                      <p>
                        Mitosis helps repair worn-out body cells and replaces
                        damaged cells and tissues through repeated cell
                        division.
                      </p>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <strong>4. Aids in the repair of genetic defects</strong>
                      <p>
                        Meiosis involves DNA repair through recombination,
                        replacing defective genes with healthy alleles,
                        contributing to healthy offspring.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
      <div className="flex flex-col items-end mt-10 space-y-4">
        <div className="bg-gray-200 w-full h-[1px]"></div>
        <button
          className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded shadow hover:bg-primary-dark transition"
          onClick={handleNextClick}
        >
          <p className="font-semibold text-lg">Lesson 3: Meiosis</p>
          <FaArrowRight />
        </button>
        <div className="bg-gray-200 w-full h-[1px]"></div>
      </div>

      {/* Floating Button */}
      <div className="floatingbtns">
        <FloatingButton onPrint={handlePrintHandout} />
      </div>
    </div>
  );
};

export default MiosisAndMitosis;
