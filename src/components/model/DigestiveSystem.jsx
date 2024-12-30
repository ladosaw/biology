import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import TextLabel from "./TextLabel";
import ConstantDS from "./ConstantDS";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

const DigestiveSystem = (props) => {
  const { nodes, materials } = useGLTF("/models/human_digestive_system.glb");
  const [hovered, setHovered] = useState(null); // State to track hover
  const { width } = useScreenSize();

  const handlePointerOver = (meshName, description) => {
    setHovered({ name: meshName, description }); // Set the hovered mesh name and description
  };

  const handlePointerOut = () => {
    setHovered(null); // Reset hover when the pointer leaves
  };
  return (
    <group {...props} dispose={null} position={[5, 0.8, 0]}>
      <group scale={0.018}>
        <group position={[43.879, -85.302, 0]} scale={100}>
          {/* Display TextLabel based on hover */}
          {hovered && (
            <TextLabel
              text={hovered.name}
              description={hovered.description}
              isHovered={hovered !== null}
            />
          )}

          <mesh
            castShadow
            receiveShadow
            geometry={nodes["B��zierCurve005_Material004_0"].geometry}
            material={materials["Material.004"]}
            onPointerOver={() =>
              handlePointerOver(
                ConstantDS.smallIntestine.name,
                ConstantDS.smallIntestine.description
              )
            }
            onPointerOut={handlePointerOut}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["B��zierCurve005_Material001_0"].geometry}
            material={materials["Material.001"]}
            onPointerOver={() =>
              handlePointerOver(
                ConstantDS.liver.name,
                ConstantDS.liver.description
              )
            }
            onPointerOut={handlePointerOut}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["B��zierCurve005_Material002_0"].geometry}
            material={materials["Material.002"]}
            onPointerOver={() =>
              handlePointerOver(
                ConstantDS.stomach.name,
                ConstantDS.stomach.description
              )
            }
            onPointerOut={handlePointerOut}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["B��zierCurve005_Material003_0"].geometry}
            material={materials["Material.003"]}
            onPointerOver={() =>
              handlePointerOver(
                ConstantDS.gallbladder.name,
                ConstantDS.gallbladder.description
              )
            }
            onPointerOut={handlePointerOut}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["B��zierCurve005_Material_0"].geometry}
            material={materials.Material}
            onPointerOver={() =>
              handlePointerOver(
                ConstantDS.largeIntestine.name,
                ConstantDS.largeIntestine.description
              )
            }
            onPointerOut={handlePointerOut}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/human_digestive_system.glb");

export default DigestiveSystem;
