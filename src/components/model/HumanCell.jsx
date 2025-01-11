import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const HumanCell = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/human_cell.glb");
  const [scale, setScale] = useState(7);
  const [position, setPosition] = useState([0, 0, 0]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  // // Update scale and position based on screen size
  // useEffect(() => {
  //   const handleResize = () => {
  //     const width = window.innerWidth;
  //     if (width < 600) {
  //       // Mobile
  //       setScale(1.5);
  //       setPosition([0, -1, 0]);
  //     } else if (width < 1024) {
  //       // Tablet
  //       setScale(2.5);
  //       setPosition([0, -0.5, 0]);
  //     } else {
  //       // Desktop
  //       setScale(3.3);
  //       setPosition([0, 0, 0]);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={scale}
      position={position}
      rotation={[-5.6, 0, 0]}
    >
      <group
        position={[-0.295, -0.022, 0.078]}
        rotation={[0, 0, 0.011]}
        scale={0.353}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials["Material.008"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials["Material.009"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials["Material.010"]}
        />
      </group>

      <group
        position={[0.497, -0.098, 0.447]}
        rotation={[0.107, -0.686, -2.951]}
        scale={[0.087, 0.078, 0.14]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_13.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_14.geometry}
          material={materials["Material.005"]}
        />
      </group>

      <group
        position={[-0.622, 0.018, -0.657]}
        rotation={[2.447, -0.432, 2.794]}
        scale={0.005}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_16.geometry}
          material={materials["Material.022"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_17.geometry}
          material={materials["Material.022"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_18.geometry}
          material={materials["Material.022"]}
        />
      </group>

      <group
        position={[-0.031, -0.08, -0.638]}
        rotation={[0.616, -0.263, 0.292]}
        scale={0.061}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_30.geometry}
          material={materials["Material.019"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_31.geometry}
          material={materials["Material.026"]}
        />
      </group>

      <group
        position={[-0.755, -0.083, 0.082]}
        rotation={[0.01, -0.163, -2.884]}
        scale={0.005}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_35.geometry}
          material={materials["Material.028"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_36.geometry}
          material={materials["Material.028"]}
        />
      </group>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials["Material.029"]}
        position={[-0.133, 0.085, -0.01]}
        rotation={[-Math.PI / 2, 0, 0.248]}
        scale={0.004}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials["Material.021"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_20.geometry}
        material={materials["Material.004"]}
        position={[0.661, -0.114, -0.078]}
        rotation={[0, 0.058, 0]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_22.geometry}
        material={materials["Material.002"]}
        position={[0.611, -0.056, -0.229]}
        rotation={[-0.327, 0.176, -0.155]}
        scale={0.015}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_24.geometry}
        material={materials.Material}
        position={[0.123, -0.105, 0.632]}
        rotation={[0.804, 0.585, -0.861]}
        scale={0.004}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_26.geometry}
        material={materials["Material.019"]}
        position={[0.013, -0.078, 0.78]}
        rotation={[0.593, -0.315, 0.212]}
        scale={0.061}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_28.geometry}
        material={materials["Material.006"]}
        position={[0.179, -0.021, -0.438]}
        rotation={[0.004, 0.944, -0.025]}
        scale={0.012}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_33.geometry}
        material={materials["Material.003"]}
        position={[-0.153, -0.057, 0.073]}
        rotation={[0.011, -0.19, -0.002]}
        scale={[0.802, 0.578, 0.8]}
      />
    </group>
  );
};

useGLTF.preload("/models/human_cell.glb");

export default HumanCell;
