import { Html, useProgress } from "@react-three/drei";
import { ProgressRing } from "./ProgressRing";

/**
 * In-canvas Suspense fallback. The page-level <LoadingGate> normally covers
 * this, but it stays as the fallback for any scene that streams in later.
 */
export const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      {/* useProgress reports a float; round it so the label doesn't churn. */}
      <ProgressRing percent={Math.round(progress)} />
    </Html>
  );
};
