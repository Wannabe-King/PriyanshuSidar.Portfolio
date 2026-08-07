import { Html, useProgress } from "@react-three/drei";

// Geometry for the progress ring, in the SVG's 100x100 user space.
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const Loader = () => {
  const { progress } = useProgress();
  // useProgress reports a float; round it so the label doesn't churn.
  const percent = Math.round(progress);

  return (
    <Html center>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading 3D scene"
        className="flex flex-col items-center gap-4 select-none pointer-events-none"
      >
        <div className="grid size-28 place-items-center">
          {/* -rotate-90 moves the dash origin from 3 o'clock to 12 o'clock. */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden
            className="col-start-1 row-start-1 size-28 -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="5"
              className="stroke-muted-foreground/20"
            />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
              className="stroke-red-400 transition-[stroke-dashoffset] duration-300 ease-out"
            />
          </svg>
          <span className="col-start-1 row-start-1 text-2xl font-semibold tabular-nums text-foreground">
            {percent}
            <span className="ml-0.5 text-base font-normal text-muted-foreground">
              %
            </span>
          </span>
        </div>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Loading
        </p>
      </div>
    </Html>
  );
};
