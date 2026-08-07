"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const BASE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 2.9,
  theta: 0,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    // Bengaluru
    { location: [12.9716, 77.5946], size: 0.2 },
  ],
};

// WebGL can't read CSS variables, so the palette is duplicated here.
const LIGHT_OVERRIDES: Partial<COBEOptions> = {
  dark: 0,
  diffuse: 1.2,
  mapBrightness: 3,
  baseColor: [0.78, 0.81, 0.92],
  glowColor: [0.85, 0.88, 0.96],
};

export function Globe({
  className,
  config,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const { theme } = useTheme();
  const resolvedConfig = useMemo<COBEOptions>(() => {
    if (config) return config;
    return theme === "light"
      ? { ...BASE_CONFIG, ...LIGHT_OVERRIDES }
      : BASE_CONFIG;
  }, [config, theme]);
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...resolvedConfig,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, resolvedConfig]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
