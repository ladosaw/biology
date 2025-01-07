import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { suspend } from "suspend-react";

const city = import("@pmndrs/assets/hdri/city.exr");

function Render3D({ children }) {
  return (
    <Canvas>
      <Suspense fallback={<>Loading...</>}>{children}</Suspense>
      <Environment files={suspend(city).default} />
      <OrbitControls enableZoom enablePan />
      <ContactShadows position={[0, -2, 0]} scale={50} blur={2} far={4.5} />
    </Canvas>
  );
}

export default Render3D;
