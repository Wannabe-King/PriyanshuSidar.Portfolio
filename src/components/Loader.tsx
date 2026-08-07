import { Html, useProgress } from "@react-three/drei";

export const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center className="text-xl font-normal text-center text-muted-foreground">
      {progress}% Loaded
    </Html>
  );
};
