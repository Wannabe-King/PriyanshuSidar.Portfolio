"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { HeroText } from "../components/heroText";
import { Astronaut } from "../components/astronaut";
import { Suspense } from "react";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Loader } from "@/components/Loader";

export const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 857 });
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start">
      <HeroText />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 2, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.23 : undefined}
                position={isMobile ? [0, 1, 0] : undefined}
              />
              <Rig />
            </Float>
          </Suspense>
          <OrbitControls />
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}
