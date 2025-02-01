import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend"; // Import TouchBackend

const ItemTypes = {
  BOX: "box",
};

const DraggableCell = ({ value, row, col, onDrop }) => {
  const [, ref] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item) => onDrop(item.value, row, col),
  });

  return (
    <td
      ref={ref}
      className="border border-gray-400 p-4 h-16 w-16 text-center bg-gray-100"
    >
      {value}
    </td>
  );
};

const DraggableBox = ({ value }) => {
  const [, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { value },
  });

  return (
    <div
      ref={drag}
      className="border rounded-md bg-blue-500 text-white text-center p-4 cursor-move w-16 mb-4"
    >
      {value}
    </div>
  );
};

const Worksheet3 = () => {
  const [grid, setGrid] = useState([
    ["", "", ""], // First row (header) starts empty, but we can drag into it
    ["", "", ""],
    ["", "", ""],
  ]);

  const [answers, setAnswers] = useState({ genotype: "", phenotype: "" });
  const draggableItems = ["Pp", "Pp", "Pp", "Pp", "p", "p", "p", "p"];

  const handleInputChange = (type, value) => {
    setAnswers((prev) => ({ ...prev, [type]: value }));
  };

  const handleDrop = (value, row, col) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = value; // Update the specific row and column with dropped value
      return newGrid;
    });
  };

  const handleSubmit = () => {
    console.log("User Answers:", answers);
    alert("Answers submitted successfully!");
  };

  // Reset the grid to initial empty state
  const handleReset = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setAnswers({ genotype: "", phenotype: "" }); // Optionally reset other inputs too
  };

  return (
    <DndProvider backend={TouchBackend}>
      {" "}
      {/* Wrap with DndProvider using TouchBackend */}
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
            <DraggableBox key={uuidv4()} value={item} />
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
                      row={rowIdx} // Pass row index as 0-based
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
