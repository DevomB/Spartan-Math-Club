"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type FocusEvent, type ReactNode } from "react";

/**
 * The sideways blackboard (brand v2.1 §5), as progressive enhancement:
 * - pan   (≥ 860px wide and ≥ 640px tall, motion OK): vertical scroll pans the board
 * - swipe (< 860px): native horizontal scroll-snap, the next panel peeks in
 * - stack (reduced motion, short desktop screens, no JS, server render): vertical sections
 * Pan also falls back to stack if any panel's content would be clipped (zoom, large text).
 * Panels stay in DOM order with real headings, so reading order never changes.
 */

type Mode = "pan" | "swipe" | "stack";
export type PanelMeta = { id: string; title: string };

const WIDE = "(min-width: 860px)";
const TALL = "(min-height: 640px)";
const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const queries = [WIDE, TALL, REDUCE].map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", callback));
  return () => queries.forEach((query) => query.removeEventListener("change", callback));
}

function readMode(): Mode {
  if (window.matchMedia(REDUCE).matches) return "stack";
  if (!window.matchMedia(WIDE).matches) return "swipe";
  return window.matchMedia(TALL).matches ? "pan" : "stack";
}

const serverMode = (): Mode => "stack";

export function BoardTrack({
  panels,
  ghosts,
  hints,
  children,
}: {
  panels: PanelMeta[];
  /** Faint formulas that drift slower than the panels; typeset on the server. */
  ghosts?: ReactNode;
  /** Tray hints per mode, typeset on the server (notation goes through KaTeX). */
  hints?: { pan: ReactNode; swipe: ReactNode };
  children: ReactNode;
}) {
  const mediaMode = useSyncExternalStore(subscribe, readMode, serverMode);
  // Set when pan layout would clip a panel; cleared on resize so pan is retried.
  const [clipped, setClipped] = useState(false);
  const mode: Mode = mediaMode === "pan" && clipped ? "stack" : mediaMode;
  const runRef = useRef<HTMLElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ghostsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [announced, setAnnounced] = useState(0);
  const n = panels.length;

  // Pan guard: if any panel's content is taller than the board, stack instead.
  const clippedAt = useRef({ width: 0, height: 0 });
  useEffect(() => {
    if (mediaMode !== "pan") return;
    if (clipped) {
      // Retry pan only after a real change in available space, not toolbar collapse or
      // tiny window drags: debounced, and only if the width changed or the height grew
      // by at least 80px since the clip. Otherwise the page height would flip mid-scroll.
      let timer = 0;
      const onResize = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          const { width, height } = clippedAt.current;
          if (window.innerWidth !== width || window.innerHeight - height >= 80) setClipped(false);
        }, 250);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener("resize", onResize);
      };
    }
    const measure = () => {
      const overflows = Array.from(trackRef.current?.querySelectorAll<HTMLElement>(":scope > .panel") ?? []).some(
        (panel) => {
          const pin = panel.querySelector<HTMLElement>(".pin");
          if (!pin) return false;
          const style = getComputedStyle(panel);
          const available = panel.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
          return pin.scrollHeight > available + 2;
        },
      );
      if (overflows) {
        clippedAt.current = { width: window.innerWidth, height: window.innerHeight };
        setClipped(true);
      }
    };
    let frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    if (stickRef.current) observer.observe(stickRef.current);
    // Web fonts change line heights after first paint.
    document.fonts?.ready.then(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [mediaMode, clipped]);

  // Screen readers hear the panel once scrolling settles, not on every step.
  useEffect(() => {
    const timer = window.setTimeout(() => setAnnounced(current), 400);
    return () => window.clearTimeout(timer);
  }, [current]);

  const panelElements = useCallback(
    () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>(":scope > .panel") ?? []),
    [],
  );

  /** Distance the page must scroll to pan across the whole board. */
  const geometry = useCallback(() => {
    const run = runRef.current;
    const stick = stickRef.current;
    if (!run || !stick) return undefined;
    const stickTop = parseFloat(getComputedStyle(stick).top) || 0;
    const runTop = run.getBoundingClientRect().top + window.scrollY;
    const travel = run.offsetHeight - stick.offsetHeight;
    return { stickTop, runTop, travel };
  }, []);

  // Where the reader is, kept across layout changes: the panel index and whether the
  // board is on screen at all (so a mode switch never yanks someone reading further down).
  const place = useRef({ index: 0, x: 0, inBoard: false, belowBoard: false, runBottom: 0 });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const runBox = runRef.current?.getBoundingClientRect();
    place.current.inBoard = Boolean(runBox && runBox.bottom > window.innerHeight * 0.25 && runBox.top < window.innerHeight * 0.75);
    place.current.belowBoard = Boolean(runBox && runBox.bottom <= window.innerHeight * 0.25);
    place.current.runBottom = runBox?.bottom ?? 0;
    if (mode === "stack") {
      const line = window.innerHeight * 0.35;
      const index = panelElements().reduce((found, panel, i) => (panel.getBoundingClientRect().top <= line ? i : found), 0);
      place.current.index = index;
      setCurrent(index);
      return;
    }
    if (mode === "pan") {
      const geo = geometry();
      if (!geo || geo.travel <= 0) return;
      const progress = Math.min(1, Math.max(0, (window.scrollY + geo.stickTop - geo.runTop) / geo.travel));
      const x = progress * (n - 1);
      track.style.transform = `translate3d(${(-x * 100) / n}%, 0, 0)`;
      if (ghostsRef.current) ghostsRef.current.style.transform = `translate3d(${-x * 35}%, 0, 0)`;
      place.current.index = Math.round(x);
      place.current.x = x;
      setCurrent(Math.round(x));
    } else if (mode === "swipe") {
      const first = panelElements()[0];
      const index = Math.round(track.scrollLeft / (first?.offsetWidth || 1));
      place.current.index = index;
      setCurrent(index);
    }
  }, [geometry, mode, n, panelElements]);

  const go = useCallback(
    (index: number, instant = false) => {
      const target = Math.min(n - 1, Math.max(0, index));
      // "instant", not "auto": the page sets scroll-behavior: smooth, which "auto" would inherit.
      const behavior: ScrollBehavior = instant ? "instant" : "smooth";
      if (mode === "pan") {
        const geo = geometry();
        if (!geo) return;
        window.scrollTo({ top: geo.runTop - geo.stickTop + (geo.travel * target) / Math.max(n - 1, 1), behavior });
      } else if (mode === "swipe") {
        const track = trackRef.current;
        const panel = panelElements()[target];
        if (track && panel) {
          track.scrollTo({ left: panel.offsetLeft - track.offsetLeft, behavior });
          runRef.current?.scrollIntoView({ block: "start", behavior });
        }
      } else {
        panelElements()[target]?.scrollIntoView({ block: "start", behavior: "instant" });
      }
    },
    [geometry, mode, n, panelElements],
  );

  // On a real mode switch (not first hydration), keep the reader on the panel they were reading.
  const previousMode = useRef<Mode | null>(null);
  useEffect(() => {
    const previous = previousMode.current;
    previousMode.current = mode;
    if (previous === null || previous === mode) return;
    const { index, inBoard, belowBoard, runBottom } = place.current;
    let frame = 0;
    if (inBoard) {
      frame = requestAnimationFrame(() => go(index, true));
    } else if (belowBoard) {
      // The board's height changed above the reader: shift so the content below stays put.
      frame = requestAnimationFrame(() => {
        const bottom = runRef.current?.getBoundingClientRect().bottom;
        if (bottom !== undefined) window.scrollBy({ top: bottom - runBottom, behavior: "instant" });
      });
    }
    return () => cancelAnimationFrame(frame);
  }, [mode, go]);

  // Reset transforms whenever the mode changes, then sync position.
  useEffect(() => {
    const track = trackRef.current;
    if (track) track.style.transform = "";
    if (ghostsRef.current) ghostsRef.current.style.transform = "";
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
    };
    // In pan mode a resize (window drag, mobile toolbar collapsing) changes the scroll
    // distance per panel. Hold the reader's exact position on the board, fractional
    // included, so nothing jumps and no rounding moves them onto a neighbor.
    const onResize = () => {
      // Reading below the board: viewport-relative panel heights change on resize, so keep
      // the board's bottom edge (and everything after it) where the reader left it.
      if (place.current.belowBoard) {
        const bottom = runRef.current?.getBoundingClientRect().bottom;
        if (bottom !== undefined) window.scrollBy({ top: bottom - place.current.runBottom, behavior: "instant" });
      }
      if (mode === "pan" && place.current.inBoard) {
        const geo = geometry();
        if (geo && geo.travel > 0) {
          const top = geo.runTop - geo.stickTop + (geo.travel * place.current.x) / Math.max(n - 1, 1);
          window.scrollTo({ top, behavior: "instant" });
        }
      }
      schedule();
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    track?.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      track?.removeEventListener("scroll", schedule);
    };
  }, [mode, update, geometry, n]);

  // Deep links (/#events) resolve to panels: on load, on hashchange, and on same-page link clicks.
  useEffect(() => {
    const indexOf = (hash: string) => panels.findIndex((panel) => `#${panel.id}` === hash);
    const initial = indexOf(window.location.hash);
    if (initial > -1 && mode !== "stack") requestAnimationFrame(() => go(initial, true));

    const onHash = () => {
      const index = indexOf(window.location.hash);
      if (index > -1) go(index);
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;
      const url = new URL((anchor as HTMLAnchorElement).href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const index = indexOf(url.hash);
      if (index < 0) return;
      event.preventDefault();
      if (window.location.hash !== url.hash) window.history.pushState(null, "", url.hash);
      go(index);
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, [go, mode, panels]);

  // Keyboard: tabbing into an off-screen panel brings it into view.
  const onFocus = (event: FocusEvent) => {
    if (mode === "stack") return;
    const panel = (event.target as Element).closest(".panel");
    const index = panel ? panelElements().indexOf(panel as HTMLElement) : -1;
    if (index > -1 && index !== current) go(index, true);
  };

  return (
    <section
      ref={runRef}
      className="run"
      data-mode={mode}
      style={{ ["--n" as string]: n }}
      aria-label="The board"
      onFocus={onFocus}
    >
      <div ref={stickRef} className="stick">
        <div ref={ghostsRef} className="ghosts" aria-hidden="true">
          {ghosts}
        </div>
        <div ref={trackRef} className="track">
          {children}
        </div>
        <div className="tray">
          <span className="sticks" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="ticks" role="group" aria-label="Board panels">
            {panels.map((panel, index) => (
              <button
                key={panel.id}
                type="button"
                aria-label={`Panel ${index + 1} of ${n}: ${panel.title}`}
                aria-current={index === current ? "true" : undefined}
                onClick={() => go(index)}
              >
                <span />
              </button>
            ))}
          </span>
          <span className="counter" aria-hidden="true">
            {current + 1} / {n}
            <span className="counter-hint"> · {mode === "pan" ? hints?.pan ?? "scroll" : hints?.swipe ?? "swipe"}</span>
          </span>
          <span className="visually-hidden" aria-live="polite">
            {mode === "stack" ? "" : `Panel ${announced + 1} of ${n}: ${panels[announced]?.title ?? ""}`}
          </span>
        </div>
      </div>
    </section>
  );
}
