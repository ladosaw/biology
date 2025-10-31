import { React, useState } from "react";
import crossingOver from "../../../assets/images/crossingOver.jpg";
import FloatingButton from "../../../components/FloatingButton/FloatingButton.jsx";
import karyotype from "../../../assets/images/karyotype.jpg";
import sexChromosomes from "../../../assets/images/sexChromosomes.jpg";
import meiosisDivisions from "../../../assets/images/meiosisDivision.png";
import prophaseStage from "../../../assets/images/prophaseStage.png";
import roleMeiosis from "../../../assets/images/roleMeiosis.png";
import meiosisPdf from "../../../assets/pdf/meiosisPdf.pdf";
import { vocab, MiosisWorksheetsLink } from "./ConstantData.jsx";
import Worksheets from "../../../components/Worksheets/Worksheets.jsx";
import MitosisVsMeiosisAnimation from "./MitosisVsMeiosisAnimation.jsx";
import Worksheet2 from "./Worksheet2.jsx";
import Worksheet1 from "./Worksheet1.jsx";
import Worksheet3 from "./Worksheet3.jsx";
import Evaluation from "./Evaluation.jsx";
import Modal from "../../../components/Modal/Modal.jsx";

const MiosisAndMitosis = ({ hideFloating }) => {
  const [isModalWorksheetOpen, setIsModalWorksheetModalOpen] = useState(false);
  const [isModalWorksheet2Open, setIsModalWorksheet2ModalOpen] =
    useState(false);
  const [isModalWorksheet3Open, setIsModalWorksheet3ModalOpen] =
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

  const toggleEvaluation = () => {
    setEvaluationOpen((prev) => !prev);
  };

  const handleDownload = () => {
    const pdfUrl = meiosisPdf;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "LESSON 3: Cell Cycle: COMPARING MITOSIS AND MEIOSIS";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintHandout = () => {
    const pdfUrl = meiosisPdf;

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
      <div>
        <div className="flex flex-col gap-8">
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug">
            <span className="font-bold">LESSON 3:</span> Cell Cycle: COMPARING
            MITOSIS AND MEIOSIS
          </h1>
          <div className="space-y-6">
            <h2 className="font-semibold text-lg text-center sm:text-xl md:text-2xl">
              Vocabulary Words
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {vocab.map((vocab, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-black">
                    {vocab.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    {vocab.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold my-6 mt-10">
          The Process of Meiosis
        </h1>

        <div className="w-full sm:w-3/4 md:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg mx-auto">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/VzDMG7ke69g?si=1iQmpXPfUWhsojKS"
            title="MEIOSIS"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>

        {/* <div className="w-full h-auto rounded-lg">
          <MitosisVsMeiosisAnimation />
        </div> */}
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
                <span className="font-semibold">Figure 2</span>: Human Sex
                Chromosomes (XY, XX)
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
                <span className="font-semibold">Figure 3</span>: Human Karyotype
                with 46 diploid and 23 haploid
              </span>
            </p>
          </div>

          <div className="bg-white py-8 px-8 rounded-lg shadow-lg space-y-6">
            <h1 className="text-primary text-3xl sm:text-4xl font-extrabold border-b-4 border-primary pb-3 mb-6">
              MEIOSIS: DIPLOID AND HAPLOID CHROMOSOMES
            </h1>

            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                There are two main types of cells possessed by multicellular
                eukaryotic organisms:{" "}
                <b>somatic, or body cells, and gametes, or sex cells</b>. The
                majority of the cells are called somatic or body cells. These
                consist of two complete sets of chromosomes, making them diploid
                in number (2N).
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Humans have 46 chromosomes. This is our <b>diploid number</b>{" "}
                (2N). Diploid means the nucleus of the nucleus of our body
                contains two sets of homologous chromosomes. We inherited half
                of these chromosomes from our father and half from our mother
                2(23). <b>Homologous chromosomes</b> mean that they both carry
                the genes controlling the same traits. The exception is our
                reproductive cells – the <b>egg and the sperm</b>, collectively
                known as <b>gametes</b>.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Each egg or sperm has a single set of chromosomes composed of 22
                autosomes and one pair of sex chromosomes, which either be{" "}
                <b>X</b> or <b>Y</b>. Therefore, our gametes are{" "}
                <b>haploid cells (N)</b> since they carry a single set of
                chromosomes.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                The number of chromosomes normally remains the same within the
                species. It does not double or triple for every generation. This
                suggests that different kinds of cell division must take place
                in an individual. This kind of cell division is called{" "}
                <b>meiosis</b>, from the Greek word that means{" "}
                <b>“to make smaller”</b>, Meiosis reduces the chromosomes number
                in half. It is a form of sexual reproduction that takes place in
                the <b>ovaries</b> (egg cell) <b>and testes</b> (sperm cell)  of
                animals during the formation of{" "}
                <b>gametogenesis (spermatogenesis and oogenesis)</b>. Meiosis is
                a special type of cell division where the cell undergoes two
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
                The first meiotic division, also known as Meiosis I, is a{" "}
                <b>reduction division phase (diploid - haploid)</b>. There are
                two daughter cells produced after Meiosis 1, each daughter cell
                is carrying haploid number of chromosomes. This consists of four
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
                chromosomes begin to pair off. Pairs of chromosomes are called{" "}
                <b>homologous</b> chromosomes, and this pairing process is exact
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold">Pachytene</span> - The
                chromosomes contract due to repeated coiling.{" "}
                <b>Crossing-over</b> takes place where a segment of the sister
                chromatid of one of the chromosomes is exchanged with the same
                segment of the sister chromatid of the homologous chromosomes
                through the formation of a cross-linked of the segments called{" "}
                <b>chiasma</b>. After crossing over, the sister chromatids of
                each chromosome may no longer be identical to each other based
                on the genetic material they contain
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
                stage the chromosomes reach their respective poles.{" "}
                <b>Cytokinesis</b>
                follows and two daughter cells are formed. Each cell now has
                half the chromosome number because only one chromosome from each
                other pair goes to the daughter cell. This is called the{" "}
                <b>haploid condition</b>. In difference to the diploid condition
                at the beginning of the meiosis I where each chromosome pair is
                intact. Telophase comes after by interphase II.
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
                The second meiotic, also known as <b>meiosis II</b>, it contains
                the following stages:{" "}
                <b>prophase II, metaphase II, anaphase II, and Telophase II</b>;
                these stages are identical to mitotic stages. The outcome is
                four cells, two from each daughter cell from meiosis I, with
                one-half the diploid chromosome number and wait only one sister
                chromatid for each chromosome. Figure 10 shows the stages of
                Meiosis I and Meiosis II. In meiosis I, the two homologous
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
                  <tr className="bg-green-100">
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
                  <tr className="bg-green-100">
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

      <Worksheets
        WorksheetData={MiosisWorksheetsLink}
        toggleModalWorksheet={toggleModalWorksheet}
        toggleModalWorksheet2={toggleModalWorksheet2}
        toggleModalWorksheet3={toggleModalWorksheet3}
        toggleEvaluation={toggleEvaluation}
      />

      <Modal
        open={isModalWorksheetOpen}
        onClose={toggleModalWorksheet}
        title={MiosisWorksheetsLink.worksheet1.title}
      >
        <Worksheet1
          titles={"LESSON 3: Cell Cycle: COMPARING MITOSIS AND MEIOSIS"}
          worksheet_no={1}
          setIsModalWorksheetModalOpen={setIsModalWorksheetModalOpen}
          setIsModalWorksheet2ModalOpenNext={setIsModalWorksheet2ModalOpen}
        />
      </Modal>

      <Modal
        open={isModalWorksheet2Open}
        onClose={toggleModalWorksheet2}
        title={MiosisWorksheetsLink.worksheet2.title}
      >
        <Worksheet2
          titles={"LESSON 3: Cell Cycle: COMPARING MITOSIS AND MEIOSIS"}
          worksheet_no={2}
          setIsModalWorksheet2ModalOpen={setIsModalWorksheet2ModalOpen}
          setIsModalWorksheetModalOpenPrevious={setIsModalWorksheetModalOpen}
          setEvaluationOpenNext={setEvaluationOpen}
        />
      </Modal>

      {/* <Modal
        open={isModalWorksheet3Open}
        onClose={toggleModalWorksheet3}
        title={MiosisWorksheetsLink.worksheet3.title}
      >
        <Worksheet3 />
      </Modal> */}

      <Modal
        open={evaluationOpen}
        onClose={toggleEvaluation}
        title={MiosisWorksheetsLink.evaluation.title}
      >
        <Evaluation
          titles={"LESSON 3: Cell Cycle: COMPARING MITOSIS AND MEIOSIS"}
          worksheet_no={0}
          setEvaluationOpen={setEvaluationOpen}
          setIsModalWorksheet2ModalOpenPrevious={setIsModalWorksheet2ModalOpen}
        />
      </Modal>

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

export default MiosisAndMitosis;
