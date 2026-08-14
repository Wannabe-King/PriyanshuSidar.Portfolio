"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";

/** Hard ceiling - the page is revealed even if something never finishes. */
const MAX_HOLD_MS = 10000;
/** How long a page with no 3D scene waits before revealing. */
const GRACE_MS = 600;
/** Must match the overlay's fade duration below. */
const FADE_MS = 500;

// The percentage is a weighted blend of every phase of the load, not just the
// 3D assets: three.js reports nothing while the JS chunks are still coming
// down and the app hydrates, which is most of the wait on a warm cache.
const HYDRATION_WEIGHT = 15;
const DOCUMENT_WEIGHT = 25;
const SCENE_WEIGHT = 60;

/** Eased so the number always creeps forward instead of jumping between phases. */
const TICK_MS = 60;
const EASE = 0.18;

export type SceneProgress = {
  active: boolean;
  /** 0-100. */
  progress: number;
  /** Number of assets the loading manager knows about. */
  total: number;
};

type LoadingGateContextValue = {
  /** Tells the gate a 3D scene exists, so it waits for assets instead of a timer. */
  registerScene: () => () => void;
  reportProgress: (progress: SceneProgress) => void;
};

const LoadingGateContext = createContext<LoadingGateContextValue | null>(null);

/**
 * Holds the whole page behind a blurred overlay until it is actually ready:
 * the document has finished loading (fonts, images, stylesheets) *and* every
 * three.js asset the first paint needs has been downloaded. Without this the
 * hero text and sections pop in while the astronaut model is still streaming.
 *
 * Rendered on the server too, so the overlay is up before hydration. This file
 * deliberately has no three.js import - it sits in the root layout, which every
 * route shares. Scenes push their progress in via <SceneProgressReporter>.
 */
export const LoadingGate = ({ children }: { children: React.ReactNode }) => {
  const [sceneCount, setSceneCount] = useState(0);
  const [scene, setScene] = useState<SceneProgress>({
    active: false,
    progress: 0,
    total: 0,
  });
  const [documentReady, setDocumentReady] = useState(false);
  const [graceElapsed, setGraceElapsed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [overlayGone, setOverlayGone] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  const registerScene = useCallback(() => {
    setSceneCount((count) => count + 1);
    return () => setSceneCount((count) => count - 1);
  }, []);

  const reportProgress = useCallback((next: SceneProgress) => {
    setScene((current) =>
      current.active === next.active &&
      current.progress === next.progress &&
      current.total === next.total
        ? current
        : next
    );
  }, []);

  const contextValue = useMemo(
    () => ({ registerScene, reportProgress }),
    [registerScene, reportProgress]
  );

  useEffect(() => {
    if (document.readyState === "complete") {
      setDocumentReady(true);
      return;
    }
    const onLoad = () => setDocumentReady(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    const grace = setTimeout(() => setGraceElapsed(true), GRACE_MS);
    const cap = setTimeout(() => setTimedOut(true), MAX_HOLD_MS);
    return () => {
      clearTimeout(grace);
      clearTimeout(cap);
    };
  }, []);

  // Pages without a 3D scene never report assets, so they fall back to the
  // grace window rather than waiting on a loader that will never start.
  const assetsReady =
    sceneCount > 0
      ? scene.total > 0 && !scene.active && scene.progress >= 100
      : graceElapsed;
  const ready = timedOut || (documentReady && assetsReady);

  // Latched: a lazily-loaded scene later on must not bring the overlay back.
  useEffect(() => {
    if (ready) setRevealed(true);
  }, [ready]);

  const sceneShare =
    sceneCount > 0
      ? (Math.min(100, Math.max(0, scene.progress)) / 100) * SCENE_WEIGHT
      : graceElapsed
        ? SCENE_WEIGHT
        : 0;
  // Reaching this target only means the phase reported in; the ease below is
  // what the user actually sees, so the number never stalls at a round figure.
  const target =
    HYDRATION_WEIGHT + (documentReady ? DOCUMENT_WEIGHT : 0) + sceneShare;

  useEffect(() => {
    if (overlayGone) return;
    if (revealed) {
      setDisplayProgress(100);
      return;
    }
    const id = setInterval(() => {
      setDisplayProgress((current) =>
        // Math.max keeps it monotonic; the 99 cap reserves 100 for the reveal.
        Math.min(99, Math.max(current, current + (target - current) * EASE))
      );
    }, TICK_MS);
    return () => clearInterval(id);
  }, [target, revealed, overlayGone]);

  useEffect(() => {
    if (!revealed) return;
    const t = setTimeout(() => setOverlayGone(true), FADE_MS);
    return () => clearTimeout(t);
  }, [revealed]);

  // Nothing behind the overlay is meant to be scrolled to yet.
  useEffect(() => {
    if (overlayGone) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [overlayGone]);

  return (
    <LoadingGateContext.Provider value={contextValue}>
      {children}
      {!overlayGone && (
        <div
          aria-hidden={revealed}
          // Above every other layer in the app (the max elsewhere is z-50).
          // backdrop-blur does the blurring, so no filter is applied to the
          // page itself - that would break the fixed navbar and theme toggle.
          className={cn(
            "fixed inset-0 z-[100] grid place-items-center",
            "bg-background/70 backdrop-blur-xl",
            "transition-opacity duration-500 ease-out",
            revealed && "pointer-events-none opacity-0"
          )}
        >
          <ProgressRing percent={displayProgress} />
        </div>
      )}
    </LoadingGateContext.Provider>
  );
};

/** Null outside a <LoadingGate> so scenes can render without one. */
export const useLoadingGate = () => useContext(LoadingGateContext);
