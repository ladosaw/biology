import React from "react";
import { Html } from "@react-three/drei";

const TextLabel = ({ text, description, isHovered }) => {
  return (
    <Html center position={[-1, 9, -20]}>
      <div className="bg-[#353434] text-white select-none text-lg font-bold rounded-lg p-5 shadow-md text-center min-w-60">
        <div>{text}</div>
        {isHovered && (
          <p className="font-normal select-none text-base mt-2">
            {description}
          </p>
        )}
      </div>
    </Html>
  );
};

export default TextLabel;
