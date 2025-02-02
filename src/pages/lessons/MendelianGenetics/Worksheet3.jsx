import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; // Import HTML5Backend
import axios from "axios";

const ItemTypes = {
  BOX: "box",
};

const DraggableCell = ({ value, row, col, onDrop }) => {
  const [, ref] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item) => {
      if (!value) onDrop(item.value, row, col, item.id);
    },
  });

  return (
    <td
      ref={ref}
      className={`border border-gray-400 p-4 h-16 w-16 text-center ${
        value ? "bg-green-200" : "bg-gray-100"
      }`}
    >
      {value}
    </td>
  );
};

const DraggableBox = ({ value, id }) => {
  const [, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { value, id },
  });

  return (
    <div
      ref={drag}
      className="border rounded-md bg-blue-500 text-white text-center p-4 cursor-move w-16 mb-4"
      style={{ touchAction: "none" }} // Disable touch action to improve mobile drag
    >
      {value}
    </div>
  );
};

const Worksheet3 = () => {
  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [answers, setAnswers] = useState({ genotype: "", phenotype: "" });
  const [draggableItems, setDraggableItems] = useState(
    ["Pp", "Pp", "Pp", "Pp", "p", "p", "p", "p"].map((value) => ({
      id: uuidv4(),
      value,
    }))
  );

  const handleInputChange = (type, value) => {
    setAnswers((prev) => ({ ...prev, [type]: value }));
  };

  const handleDrop = (value, row, col, id) => {
    if (grid[row][col] !== "") return; // Prevent overwriting cells

    setGrid((prevGrid) =>
      prevGrid.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((cell, colIndex) => (colIndex === col ? value : cell))
          : r
      )
    );

    // Remove the specific dropped item using its unique ID
    setDraggableItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const handleSubmit = async () => {
    const payload = {
      grid,
      genotype: answers.genotype,
      phenotype: answers.phenotype,
    };

    console.log(payload);

    // try {
    //   const response = await axios.post(
    //     "https://your-api-url.com/submit",
    //     payload
    //   );
    //   alert("Submission successful!");
    // } catch (error) {
    //   console.error("Submission failed", error);
    //   alert("There was an error submitting your answers.");
    // }
  };

  const handleReset = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setAnswers({ genotype: "", phenotype: "" });
    setDraggableItems(
      ["Pp", "Pp", "Pp", "Pp", "p", "p", "p", "p"].map((value) => ({
        id: uuidv4(),
        value,
      }))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="font-bold text-2xl text-center mb-6">
          Mendelian Genetics Worksheet 3
        </h1>
        <p className="text-center mb-6">
          Drag and drop the correct genotype values into the Punnett square,
          then provide genotype and phenotype results.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {draggableItems.map((item) => (
            <DraggableBox key={item.id} value={item.value} id={item.id} />
          ))}
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full mx-auto border border-gray-400">
            <tbody>
              {grid.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, colIdx) => (
                    <DraggableCell
                      key={`${rowIdx}-${colIdx}`}
                      value={cell}
                      row={rowIdx}
                      col={colIdx}
                      onDrop={handleDrop}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-6 max-w-lg mx-auto">
          <div>
            <label className="block text-lg font-medium mb-1">
              Genotype Result:
            </label>
            <input
              type="text"
              value={answers.genotype}
              onChange={(e) => handleInputChange("genotype", e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter genotype result (e.g., 100% Pp)"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">
              Phenotype Result:
            </label>
            <input
              type="text"
              value={answers.phenotype}
              onChange={(e) => handleInputChange("phenotype", e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phenotype result (e.g., 100% Purple flower)"
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg w-32 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>

          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-3 rounded-lg w-32 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reset
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default Worksheet3;
