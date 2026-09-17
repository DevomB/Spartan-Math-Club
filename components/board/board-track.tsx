"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent, type ReactNode, type TouchEvent } from "react";

/**
 * The sideways blackboard (brand v2.1 §5), as progressive enhancement:
 * - pan   (motion OK, board at least 480px tall): every panel is a full-viewport slide;
 *         vertical scroll pans the board, and a horizontal swipe steps one panel on touch
 * - stack (reduced motion, landscape phones, no JS, server render): vertical sections
 * Panel type and spacing are sized in viewport units (see --u in board.css) so slides fit
 * phones and short laptops alike. Pan still falls back to stack if content would be clipped
 * (zoom, very large text). Panels stay in DOM order with real headings.
 */

type Mode = "pan" | "stack";
export type PanelMeta = { id: string; title: string };

const TALL = "(min-height: 480px)";
const REDUCE = "(prefers-reduced-motion: reduce)";
/** A touch gesture this far sideways, and mostly sideways, steps one panel. */
const SWIPE_PX = 48;
/** Ghost formulas move at this % of panel speed; keep in sync with board-run.tsx. */
const GHOST_DRIFT = 100;

function readMode(): Mode {
  if (window.matchMedia(REDUCE).matches) return "stack";
  return window.matchMedia(TALL).matches ? "pan" : "stack";
}

/**
 * Runs as the first thing in the body, before any board markup is parsed, so the first
 * paint already has the right layout. Without it the server markup painted as one
 * layout and hydration moved every panel: CLS ≈ 0.45 on the home page.
 *
 * It sets data-board on <html>, and board.css grants the pan layout only when that
 * says "pan". With no JavaScript the attribute never appears and the board stays a
 * plain stack of sections.
 */
export const BOARD_MODE_SCRIPT = `document.documentElement.dataset.board=matchMedia("${REDUCE}").matches||!matchMedia("${TALL}").matches?"stack":"pan"`;

/**
 * Hydration has to agree with what the inline script already put on screen, so the
 * client reads the same media queries. The server assumes pan; without JavaScript the
 * missing data-board keeps the stack layout regardless.
 */
function initialMode(): Mode {
  if (typeof window === "undefined") return "pan";
  return readMode();
}

/** Native scroll anchoring (Chromium, Firefox) keeps content in place when layout above it changes. */
function supportsScrollAnchoring(): boolean {
  return typeof CSS !== "undefined" && CSS.supports("overflow-anchor", "auto");
}

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
  const [mediaMode, setMediaMode] = useState<Mode>(initialMode);

  // Keep following the media queries after hydration (rotation, resize, motion preference).
  useEffect(() => {
    const queries = [TALL, REDUCE].map((query) => window.matchMedia(query));
    const sync = () => setMediaMode(readMode());
    sync();
    queries.forEach((query) => query.addEventListener("change", sync));
    return () => queries.forEach((query) => query.removeEventListener("change", sync));
  }, []);
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

  /**
   * data-mode is set on the DOM node instead of rendered as a prop. The server cannot
   * know the viewport, so rendering it would guarantee a hydration mismatch, and React's
   * recovery from that re-creates the markup and drops the pre-paint data-board flag with
   * it — which would strip the pan layout mid-load. The CSS only needs this attribute to
   * take pan away, so the absence of it is the common case.
   */
  useEffect(() => {
    const run = runRef.current;
    if (!run) return;
    if (mode === "stack") run.setAttribute("data-mode", "stack");
    else run.removeAttribute("data-mode");
  }, [mode]);

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

  // Where the reader is, kept across layout changes: the panel index, fractional pan
  // position, and whether the board is on screen or already scrolled past.
  const place = useRef({ index: 0, x: 0, inBoard: false, belowBoard: false });
  // The board's own size at the last layout we accounted for. Scroll corrections are
  // based on changes to this, never on scroll position, so a resize that fires during a
  // scroll gesture (mobile toolbars collapsing) is a no-op and momentum is left alone.
  const size = useRef({ runHeight: 0, travel: 0 });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const runBox = runRef.current?.getBoundingClientRect();
    place.current.inBoard = Boolean(runBox && runBox.bottom > window.innerHeight * 0.25 && runBox.top < window.innerHeight * 0.75);
    place.current.belowBoard = Boolean(runBox && runBox.bottom <= window.innerHeight * 0.25);
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
      if (ghostsRef.current) ghostsRef.current.style.transform = `translate3d(${-x * GHOST_DRIFT}%, 0, 0)`;
      place.current.index = Math.round(x);
      place.current.x = x;
      setCurrent(Math.round(x));
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
    const { index, inBoard, belowBoard } = place.current;
    const heightBefore = size.current.runHeight;
    let frame = 0;
    if (inBoard) {
      frame = requestAnimationFrame(() => go(index, true));
    } else if (belowBoard && !supportsScrollAnchoring()) {
      // The board changed height above the reader. Browsers with scroll anchoring already
      // keep the content below in place; elsewhere (Safari) shift by exactly the delta.
      frame = requestAnimationFrame(() => {
        const heightAfter = runRef.current?.offsetHeight ?? heightBefore;
        const delta = heightAfter - heightBefore;
        if (heightBefore && delta) window.scrollBy({ top: delta, behavior: "instant" });
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
    const measureSize = () => {
      size.current = { runHeight: runRef.current?.offsetHeight ?? 0, travel: geometry()?.travel ?? 0 };
    };
    // Resizes only move the page when the board itself changed size. Mobile toolbars
    // firing `resize` mid-scroll leave svh-based heights untouched, so this does nothing
    // and momentum scrolling continues.
    const onResize = () => {
      const run = runRef.current;
      if (run) {
        const runHeight = run.offsetHeight;
        const geo = geometry();
        const travel = geo?.travel ?? 0;
        const { runHeight: previousHeight, travel: previousTravel } = size.current;
        if (previousHeight && runHeight !== previousHeight && place.current.belowBoard) {
          // Keep the content after the board where the reader left it.
          window.scrollBy({ top: runHeight - previousHeight, behavior: "instant" });
        } else if (mode === "pan" && geo && travel > 0 && previousTravel && travel !== previousTravel && place.current.inBoard) {
          // Pan distance per panel changed: hold the exact board position, fractional included.
          window.scrollTo({ top: geo.runTop - geo.stickTop + (travel * place.current.x) / Math.max(n - 1, 1), behavior: "instant" });
        }
        size.current = { runHeight, travel };
      }
      schedule();
    };
    // After a mode switch, record the new layout once the browser has applied it.
    const sizeFrame = requestAnimationFrame(measureSize);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(sizeFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
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

  // Touch: vertical drags scroll the page (and pan the board) natively; a clearly
  // horizontal flick steps one panel, like swiping a slide.
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
  const onTouchStart = (event: TouchEvent) => {
    if (mode !== "pan" || event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, t: event.timeStamp };
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || mode !== "pan") return;
    // Let horizontally scrollable formulas keep their own gesture.
    if ((event.target as Element).closest?.(".formal, .katex-display")) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.4 || event.timeStamp - start.t > 800) return;
    go(current + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      ref={runRef}
      className="run"
      // data-mode is written imperatively, never rendered: see the effect above.
      style={{ ["--n" as string]: n }}
      aria-label="The board"
      onFocus={onFocus}
    >
      <div ref={stickRef} className="stick" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
            <span className="counter-hint counter-hint--fine"> · {hints?.pan ?? "scroll"}</span>
            <span className="counter-hint counter-hint--coarse"> · {hints?.swipe ?? "swipe"}</span>
          </span>
          <span className="visually-hidden" aria-live="polite">
            {mode === "stack" ? "" : `Panel ${announced + 1} of ${n}: ${panels[announced]?.title ?? ""}`}
          </span>
        </div>
      </div>
    </section>
  );
}
