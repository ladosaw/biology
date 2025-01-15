import React from "react";
import FloatingButton from "../../../components/FloatingButton/FloatingButton";
import MendelianGeneticsPdf from "../../../assets/pdf/MendelianGenetics.pdf";
import {
  mendelResults,
  mendelResults2,
  vocabulary,
  DominantRecessiveTraits,
  GenotypePhenotype,
  MendelianGeneticsWorksheetsLink,
} from "./ConstantData";
import FlowerParentalCross from "../../../assets/images/FlowerParentalCross.svg";
import FlowerParentalCross2 from "../../../assets/images/FlowerParentalCross2.svg";
import Figure3 from "../../../assets/images/Figure3.png";
import Figure4 from "../../../assets/images/Figure4.png";
import PunnettSquare from "../../../assets/images/PunnettSquares.jpg";
import DihybridCrossExample from "../../../assets/images/DihybridCrossExample.jpg";
import Worksheets from "../../../components/Worksheets/Worksheets";

const MendelianGenetics = ({ hideFloating }) => {
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
      <div>
        <div className="flex flex-col gap-8">
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug">
            <span className="font-bold">LESSON 4:</span> PATTERNS OF MENDELIAN
            GENETICS
          </h1>
          <div className="space-y-6">
            <h2 className="font-semibold text-lg text-center sm:text-xl md:text-2xl">
              Vocabulary Words
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {vocabulary.map((vocab, index) => (
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

        <h2 className="text-xl font-bold mt-8">
          MENDEL<span>&#39;</span>S DISCOVERY OF THE PRINCIPLE OF HEREDITY
        </h2>

        <p className="indent-8 text-sm sm:text-base md:text-lg mb-8">
          The concept of a gene was first put forth in the late 19th century
          when an Augustinian monk <b>GREGOR JOHANN MENDEL</b> performed a
          series of breeding experiments involving a garden pea plant (Pisum
          sativum) using a garden in the monastery. Mendel was interested in
          investigating how individual traits were inherited. He wanted to find
          out whether both parents contribute equally to the traits of the
          offspring. He also wanted to know if the traits present in the
          offspring were produced by the blending of the traits of the parents.
        </p>
        <h2 className="text-xl font-bold my-4">
          MENDEL<span>&#39;</span>S EXPERIMENT
        </h2>
        <p className="indent-8 text-sm sm:text-base md:text-lg mb-8 ">
          Gregor Mendel did study the changes in traits of pea plants. He
          developed the fundamental laws of heredity. He used to study genetics
          in garden peas (Pisum sativum) as they are easily planted, and their
          pollination is easily managed. He controlled pollination by manually
          extracting pollen between plants. He developed true-breeding plants by
          self-pollination. He is known as the father of Genetics.
        </p>

        <div className="w-full sm:w-3/4 md:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg mx-auto">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Mehz7tCxjSE?si=xKfgPmBoDiPMmbqC&amp;start=12"
            title="Mendelian Genetics"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>

        <div className="rounded-md mt-8">
          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            First: Production of pure-breeding strains of pea plants
          </h3>
          <p className="text-gray-800 indent-8 text-sm sm:text-base md:text-lg">
            Mendel allowed his pea plants for many generations until he gathered
            all the offspring that had the same features as the parents,
            generation after generation. The result of the cross is shown in
            Table 1.
          </p>
        </div>

        <div className="md:py-8 md:px-8 rounded-lg space-y-6 my-4">
          <div>
            <h2 className="text-lg font-bold text-center mb-4">
              Table 1: The Results of Mendel<span>&#39;</span>s crosses between
              pure-breeding pea plants
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-300 p-2">Traits</th>
                    <th className="border border-gray-300 p-2">
                      Parent 1 (P1)
                    </th>
                    <th className="border border-gray-300 p-2">
                      First Filial Generation (F1)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mendelResults.map((result, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 p-2">
                        {result.trait}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {result.parents}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {result.firstFilialGeneration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-md  mt-6">
          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            Second: The crossing of two different varieties of pure-breeding
            strains.
          </h3>
          <p className="text-gray-800 indent-8">
            When he had pure-breeding plants, Mendel began cross-pollinating
            peas with contrasting traits. The pure-breeding pea constituted the{" "}
            <span className="font-semibold">parental or P1 generation.</span>{" "}
            All offspring of these crosses resembled one another. For example,
            when he crossed pea plants that produced purple-colored flowers with
            pea plants that produced white-colored flowers all the resulting
            offspring had purple-colored flowers. He labeled the first set of
            offspring{" "}
            <span className="font-semibold">
              as the F1 generation of the first filial generation.
            </span>
          </p>
        </div>

        <div className="flex flex-col justify-center items-center mt-8 gap-2 mb-6">
          <img
            src={FlowerParentalCross}
            alt="Flower Parental Cross"
            className="w-full md:w-1/2 lg:w-1/2 h-auto object-contain rounded-lg shadow-md"
          />
          <span className="text-sm sm:text-base md:text-lg text-center font-semibold block">
            Figure 1: Cross between two different pure-breeding traits
          </span>
        </div>

        <div className="md:py-8 md:px-8 rounded-lg space-y-6 my-4">
          <div>
            <h2 className="text-lg font-bold text-center mb-4">
              Table 2: Results of Mendel<span>&#39;</span>s crosses between
              hybrid plants
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-300 p-2">TRAITS</th>
                    <th className="border border-gray-300 p-2">F1/Hybrid</th>
                    <th className="border border-gray-300 p-2" colSpan={2}>
                      F2 Generation Produced by Self-Pollinating F1 Hybrids
                    </th>
                    <th className="border border-gray-300 p-2">
                      Observe Ratio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mendelResults2.map((result, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 p-2">
                        {result.trait}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {result.f1Hybrid}
                      </td>
                      {result.f2Generation.map((entry, i) => (
                        <td key={i} className="border border-gray-300 p-2">
                          {entry.type.charAt(0).toUpperCase() +
                            entry.type.slice(1)}{" "}
                          ({entry.count})
                        </td>
                      ))}
                      <td className="border border-gray-300 p-2">
                        {result.observeRatio}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg mt-6">
          The offspring of the parental cross is called the first filial (F1)
          generation. In Mendel’s experiment, the F1 generation they called
          hybrids because they resulted from a cross between two pure breeding
          with contrasting traits. (See Figure 1). The third column shows the
          number of plants (offspring) resulting from the crosses. For instance,
          F1 plants were allowed to self-pollinate Mendel got 5474 plants for
          round seeds and 1850 for wrinkled seeds. The fourth column of the
          Table shows that in the F2 generation, the ratio of the plants with
          the dominant character to the plants with the recessive character.is
          almost 3:1 ratio.
        </p>

        <div className="rounded-md mt-6">
          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            Third: The crossing of the F1 generation
          </h3>
          <p className="text-gray-800 indent-8">
            Finally, he pollinated the F1 generation.{" "}
            <span className="font-semibold">
              He called this the P2 or second parental generation.
            </span>{" "}
            He gathered and planted seeds and when they germinated and produced
            flowers,{" "}
            <span className="font-semibold">
              he noticed that 75% of the garden peas had purple-colored flowers
              and 25% had white-colored flowers.
            </span>{" "}
            He labeled this second set of offspring as the F2 or second filial
            generation.{" "}
            <span className="font-semibold">
              The white flower did not appear in the F1 but appeared in the F2
              in a ratio of 3:1 (See Table 2).
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-8 gap-2 mb-6">
        <img
          src={FlowerParentalCross2}
          alt="Flower Parental Cross2"
          className="w-full md:w-1/2 lg:w-1/2 h-auto object-contain rounded-lg shadow-md"
        />
        <span className="text-sm sm:text-base md:text-lg text-center font-semibold block">
          Figure 2: Cross between the offspring of F1 generation
        </span>
      </div>

      <h2 className="text-xl font-bold my-4">
        MENDELIAN PRINCIPLES OF GENETICS
      </h2>
      <p className="indent-8 text-sm sm:text-base md:text-lg mb-4 ">
        Gregor Mendel from the result of his experiment hypothesized that there
        each of the F1 plants must have contained <b>two determiners</b>, one
        for round seed and wrinkled seed. The determiner for round seed masked
        the determiner for wrinkled seed. This <b>unit of determiner</b> now
        called <b>genes</b>. Since there are{" "}
        <b>two alternative expressions of a trait</b> (round and wrinkled) he
        also hypothesized that traits were regulated by a{" "}
        <b>pair of “factors” now called alleles</b>. With these findings, Gregor
        Mendel was able to formulate the three principles of heredity.
      </p>

      <p className="text-sm sm:text-base md:text-lg mb-4 ">
        Gregor Mendel conceived the idea of heredity units, which he called
        hereditary "factors". Mendel found that there are alternative forms of
        factors currently called genes that account for variations in inherited
        characteristics.
      </p>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed">
        <span className="font-semibold">1. Law of Dominance</span> - states that
        in every organism, there is a pair of factors or genes that control the
        appearance of a particular trait. One of the pair of genes/alleles may
        hide or prevent the appearance of the other. One allele is a dominant
        trait, while the other is a recessive trait. The dominant traits hide or
        mask the appearance of the recessive trait. The dominant trait is
        represented by a big letter and a small letter for the recessive trait.
        (See Table 3).
      </p>
      <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-6">
        Example:{" "}
        <span className="block indent-8">
          <b>R</b> for round seed (dominant trait), r for wrinkled seed
          (recessive trait)
        </span>
        <span className="block indent-8">
          <b>G</b> for the green pod (dominant trait), g for the yellow pod
          (recessive trait).
        </span>
      </p>

      <div className="md:py-8 md:px-8 rounded-lg space-y-6 my-4">
        <div>
          <h2 className="text-lg font-bold text-center mb-4">
            Table 3: Dominant and Recessive traits in <i>Pisum sativum</i>{" "}
            (Garden Pea)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-gray-300 p-2">
                    Character Studied
                  </th>
                  <th className="border border-gray-300 p-2">Dominant</th>
                  <th className="border border-gray-300 p-2">Recessive</th>
                </tr>
              </thead>
              <tbody>
                {DominantRecessiveTraits.map((result, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                  >
                    <td className="border border-gray-300 p-2">
                      {result.characterStudied}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {result.dominant}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {result.recessive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="indent-8 text-sm sm:text-base md:text-lg my-8 ">
        Note that in a particular trait, the same letter will be used for both
        the dominant and recessive traits. Since genes are in pairs, the{" "}
        <b>pure-breeding</b> green seed peas will be represented with letters{" "}
        <b>GG</b> and the pure-breeding yellow seed peas gg. There are pairs of
        alleles that are{" "}
        <b>identical and are called homozygous or homozygote</b> while the pair
        of alleles that are{" "}
        <b>not identical are called heterozygous or heterozygote</b>. Each one
        of us has genes or alleles that are either homozygous or heterozygous.
      </p>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-6">
        Example:{" "}
        <span className="block indent-8">
          <b>RR</b> - homozygous genes for round seed
        </span>
        <span className="block indent-8">
          <b>Rr</b> - heterozygous genes round seed
        </span>
      </p>

      <p className="indent-8 text-sm sm:text-base md:text-lg my-8 ">
        The pair of genes or alleles is the <b>genetic makeup</b> for a
        particular trait of an organism called <b>genotype</b> while the
        <b>phenotype</b> is the <b>observable trait, or the visible trait</b> of
        an organism based on the genotype (See Table 4).
      </p>

      <div className="md:py-8 md:px-8 rounded-lg space-y-6">
        <div>
          <h2 className="text-lg font-bold text-center mb-4">
            Table 4: Genotype and Phenotype of Pea Plant
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-gray-300 p-2">Genotype</th>
                  <th className="border border-gray-300 p-2">
                    Description of the Alleles of Genes
                  </th>
                  <th className="border border-gray-300 p-2">Phenotype</th>
                </tr>
              </thead>
              <tbody>
                {GenotypePhenotype.map((result, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                  >
                    <td className="border border-gray-300 p-2">
                      {result.genotype}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {result.description}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {result.phenotype}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed my-8">
        <span className="font-semibold">2. Law of Segregation </span> - – states
        the pair of genes segregate or separate from each other during gamete
        formation. Gregor Mendel argued that for any trait, an organism must
        inherit one factor from the sperm and one factor from the egg. Thus, a
        new organism receives one factor for each trait from each parent. (See
        Figures 3, 6, 7).
      </p>

      <div className="flex flex-col justify-center items-center mt-8 gap-2 mb-6">
        <img
          src={Figure3}
          alt="Figure 3"
          className="w-full md:w-1/2 lg:w-1/2 h-auto object-contain rounded-lg shadow-md"
        />
        <span className="text-sm sm:text-base md:text-lg text-center font-semibold block">
          Figure 3: Cross between one trait showing the Law of Segregation
        </span>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 gap-2 mb-6">
        <img
          src={Figure4}
          alt="Figure 4"
          className="w-full md:w-1/2 lg:w-1/2 h-auto object-contain rounded-lg shadow-md"
        />
        <span className="text-sm sm:text-base md:text-lg text-center font-semibold block">
          Figure 4: The result of crossing pure-breeding round and wrinkled seed
        </span>
      </div>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed my-8">
        <span className="font-semibold">3. Law of Independent Assortment </span>{" "}
        - states that the distribution or assortment of one pair of factors is
        independent of the distribution of the other pair. Traits are inherited
        independent of each other. The law applies to genes that are found on
        separate chromosomes. Thus, one pair of genes is not affected by the
        other pair.
      </p>

      <h2 className="text-xl font-bold my-4">Dihybrid Cross</h2>
      <p className="indent-8 text-sm sm:text-base md:text-lg mb-4 ">
        Aside from Gregor Mendel’s study on the inheritance of one pair of genes
        or alleles, he also studied the inheritance of two pairs of genes or
        alleles. A cross that involves two pairs of genes or alleles is called a
        dihybrid cross. An easy way to do the dihybrid cross is through the use
        of <b>Punnett square.</b>
      </p>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-6">
        Example:{" "}
        <span className="block indent-8">
          <b>RRYY</b>(Round, Yellow Seed) X <b>rryy</b>(Wrinkled, Green Seed)
        </span>
      </p>

      <h2 className="text-xl font-bold my-4">Punnett Square</h2>
      <p className="indent-8 text-sm sm:text-base md:text-lg mb-4 ">
        Reginald C. Punnett devised the Punnett square. This is a simple way to
        determine the possible combinations of genes in a given cross. It can
        help you predict easily the outcome of a given cross.
      </p>

      <div className="flex flex-col justify-center items-center mt-8 gap-2 mb-6">
        <img
          src={PunnettSquare}
          alt="Punnett Square"
          className="w-full md:w-1/2 lg:w-1/2 h-auto object-contain rounded-lg shadow-md"
        />
        <span className="text-sm sm:text-base md:text-lg text-center font-semibold block">
          Figure 5: Showing how to use the Punnet Square with Monohybrid cross
        </span>
      </div>

      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          How to Make a Punnett Square
        </h1>

        <ol className="list-decimal list-inside">
          <li>
            Make a square and divide it into 4 boxes for a monohybrid cross and
            16 boxes for a dihybrid cross.
          </li>
          <li>
            The letters of the possible genes for a trait from the female (♀)
            are written down on the left side.
          </li>
          <li>
            The letters of the possible genes for the same trait from the male
            (♂) are written across the top of the square.
          </li>
          <li>Place the phenotype of the offspring in the square.</li>
        </ol>

        <h2 className="text-xl font-bold mt-4">Example Illustration</h2>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-lg font-semibold">A - Axial</p>
            <p className="text-lg font-semibold">a - Terminal</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Aa X Aa</p>
          </div>
        </div>

        <p className="mt-4">5. Lastly, interpret the result.</p>
        <div className="flex flex-col justify-center items-center mt-8 gap-2 mb-6">
          <div className="rounded w-full max-w-3xl">
            <p className="font-semibold mb-2">
              Result of the sample illustration:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                There are 4 offspring produced from crossing both hybrid axial
                flowers: Aa x Aa.
              </li>
              <li>Their genotypes are:</li>
              <ul className="list-disc list-inside ml-4">
                <li>1 AA - homozygous axial flower</li>
                <li>2 Aa - heterozygous axial flowers</li>
                <li>1 aa - homozygous terminal flower</li>
              </ul>
              <li>The genotypic ratio: 1:2:1</li>
              <li>Their phenotypes are:</li>
              <ul className="list-disc list-inside ml-4">
                <li>3 axial flowers, 1 terminal flower</li>
              </ul>
              <li>The phenotypic ratio: 3:1</li>
            </ul>
          </div>
          <p className="font-semibold">
            Example 1: Dihybrid Cross using the Punnett Square:
          </p>
          <img
            src={DihybridCrossExample}
            alt="Dihybrid Cross using Punnett Square Example"
            className="w-full md:w-1/2 lg:w-1/2 h-auto object-contain rounded-lg shadow-md"
          />
        </div>

        <h4 className="text-xl font-bold mt-4">
          <span className="block">Result:</span>
          There are 16 offspring from the cross of both hybrid/heterozygous
          round, yellow-seed pea plants.
        </h4>
        <ul className="list-disc list-inside mb-4">
          <li>
            The <span className="font-semibold">Genotypes</span>:
          </li>
          <ul className="list-disc list-inside ml-4">
            <li>1 RRYy - homozygous round, yellow seed</li>
            <li>2 RRYy - homozygous round, heterozygous yellow seed</li>
            <li>1 RRyy - homozygous round, green seed</li>
            <li>2 RrYY - heterozygous round, homozygous yellow seed</li>
            <li>4 RrYy - heterozygous round, yellow seed</li>
            <li>2 Rryy - heterozygous round, green seed</li>
            <li>1 rrYY - homozygous wrinkled, yellow seed</li>
            <li>2 rrYy - homozygous wrinkled, heterozygous yellow seed</li>
            <li>1 rryy - homozygous wrinkled, green seed</li>
          </ul>
        </ul>

        <p>
          Genotypic ratio:{" "}
          <span className="font-semibold">1:2:1:2:4:2:1:2:1</span>
        </p>

        <h4 className="text-xl font-bold mt-4">
          Figure 6: Showing the Dihybrid Cross
        </h4>
        <p className="font-semibold">The Phenotype:</p>

        <ul className="list-disc list-inside ml-4">
          <li>9 round yellow</li>
          <li>3 wrinkled yellow</li>
          <li>3 round green</li>
          <li>1 wrinkled green</li>
        </ul>
      </div>
      <p>
        Phenotypic ratio:
        <span className="font-semibold"> 9:3:3:1</span>
      </p>

      <Worksheets WorksheetData={MendelianGeneticsWorksheetsLink} />
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

export default MendelianGenetics;
