// Geometry for the progress ring, in the SVG's 100x100 user space.
const RADIUS = 40;
const STROKE_WIDTH = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type ProgressRingProps = {
  /** 0-100. */
  percent: number;
  label?: string;
};

export const ProgressRing = ({
  percent,
  label = "Loading",
}: ProgressRingProps) => {
  const value = Math.min(100, Math.max(0, Math.round(percent)));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="flex flex-col items-center gap-4 pointer-events-none select-none"
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
            strokeWidth={STROKE_WIDTH}
            className="stroke-muted-foreground/20"
          />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - value / 100)}
            className="stroke-red-400 transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>
        <span className="col-start-1 row-start-1 text-2xl font-semibold tabular-nums text-foreground">
          {value}
          <span className="ml-0.5 text-base font-normal text-muted-foreground">
            %
          </span>
        </span>
      </div>
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
        {label}
      </p>
    </div>
  );
};
