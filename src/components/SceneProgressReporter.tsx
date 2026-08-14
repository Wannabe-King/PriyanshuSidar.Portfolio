"use client";

import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useLoadingGate } from "./LoadingGate";

/**
 * Bridges three's global loading manager to the page-level <LoadingGate>.
 * Render it (outside <Canvas>) on any page that has a 3D scene, so the gate
 * waits for the models instead of falling back to its timer.
 */
export const SceneProgressReporter = () => {
  const { active, progress, total } = useProgress();
  const gate = useLoadingGate();
  const registerScene = gate?.registerScene;
  const reportProgress = gate?.reportProgress;

  useEffect(() => registerScene?.(), [registerScene]);

  useEffect(() => {
    reportProgress?.({ active, progress, total });
  }, [active, progress, total, reportProgress]);

  return null;
};
