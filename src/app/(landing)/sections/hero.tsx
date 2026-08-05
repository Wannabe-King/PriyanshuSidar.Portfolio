"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { HeroText } from "../components/heroText";
import { Astronaut } from "../components/astronaut";
import { Suspense } from "react";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Loader } from "@/components/Loader";
import { MusicPlayer } from "../components/musicPlayer";

export const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 857 });
  return (
    <section
      id="home"
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start"
    >
      <MusicPlayer/>
      <HeroText />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* No OrbitControls: it calls preventDefault on wheel and sets
            touch-action: none on the canvas, which blocks page scrolling.
            Camera movement is handled by Rig below. */}
        <Canvas camera={{ position: [0, 2, 3] }} style={{ touchAction: "pan-y" }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.23 : undefined}
                position={isMobile ? [0, 1, 0] : undefined}
              />
              <Rig />
            </Float>
          </Suspense>
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
    // Keep the camera aimed at the origin as it moves. OrbitControls used to do
    // this every frame; without it the rotation stays frozen at the initial
    // position and the model drifts out of frame.
    state.camera.lookAt(0, 0, 0);
  });
}
