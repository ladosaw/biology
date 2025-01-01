import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

function Render3D({ children }) {
  return (
    <Canvas>
      <Suspense fallback={<div>Loading 3D model...</div>}>{children}</Suspense>
      <Environment preset="city" />
      <OrbitControls enableZoom enablePan />
      <ContactShadows position={[0, -2, 0]} scale={50} blur={2} far={4.5} />
    </Canvas>
  );
}

export default Render3D;
