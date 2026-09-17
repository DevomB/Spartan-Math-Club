"use client";

import { activePrompt, fmt, pacificDate, type PromptCandidate } from "@/lib/dates";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Red chalk for right now (brand v2.1 §7). Floats in when a meeting or special
 * event starts within 24 hours or is in progress. The server supplies
 * candidates; this component applies the rule against the visitor's clock.
 */

const TICK_MS = 30_000;
const ENTER_DELAY_MS = 1200;
const STORAGE_KEY = "smc:prompt-dismissed";

function readDismissed(): string[] {
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function writeDismissed(keys: string[]) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(keys.slice(-20)));
  } catch {
    // Storage unavailable: dismissal lasts for this page view only.
  }
}

const shortClock = (iso: string) => fmt.clock(iso).replace(":00", "");

export function FloatingPrompt({ candidates }: { candidates: PromptCandidate[] }) {
  const [now, setNow] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);

  // Clock, dismissal memory, and the entrance trigger (1.2s or a quarter screen of scroll).
  useEffect(() => {
    const boot = window.setTimeout(() => {
      setNow(Date.now());
      setDismissed(readDismissed());
    }, 0);
    const tick = window.setInterval(() => setNow(Date.now()), TICK_MS);
    const arm = window.setTimeout(() => setArmed(true), ENTER_DELAY_MS);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.25) setArmed(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(boot);
      window.clearInterval(tick);
      window.clearTimeout(arm);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const active = now === null ? undefined : activePrompt(candidates, now);

  // Tuck away while the matching board panel or event card is on screen, or the menu is open.
  useEffect(() => {
    if (!active) return;
    const targets = [active.id, active.special ? "special-event" : "events"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const onScreen = new Set<Element>();
    let menuOpen = document.documentElement.classList.contains("menu-open");
    const sync = () => setTucked(menuOpen || onScreen.size > 0);

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        sync();
      },
      { threshold: [0, 0.35, 0.6] },
    );
    targets.forEach((target) => intersection.observe(target));
    const mutation = new MutationObserver(() => {
      menuOpen = document.documentElement.classList.contains("menu-open");
      sync();
    });
    mutation.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      intersection.disconnect();
      mutation.disconnect();
    };
  }, [active]);

  const visible = Boolean(active && armed && !tucked && !dismissed.includes(active.key));

  // Keep focused content clear of the prompt (WCAG 2.4.11).
  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollPaddingBottom = visible ? "7rem" : "";
    return () => {
      root.style.scrollPaddingBottom = "";
    };
  }, [visible]);

  if (!active || now === null) return null;

  const live = Date.parse(active.startsAt) <= now;
  const today = pacificDate(Date.parse(active.startsAt)) === pacificDate(now);
  const label = live ? "Happening now" : today ? "Today!" : "Tomorrow!";
  const when = live ? `until ${shortClock(active.endsAt)}` : shortClock(active.startsAt);
  const href = `/events#${active.id}`;

  const dismiss = () => {
    const next = [...dismissed, active.key];
    setDismissed(next);
    writeDismissed(next);
  };

  return (
    <aside
      className={cn("prompt", visible ? "is-in" : "is-out", live && "is-now")}
      aria-label="Happening soon"
      aria-hidden={visible ? undefined : true}
      inert={!visible}
    >
      <Link href={href} className="prompt-link">
        <span className="prompt-live" aria-hidden="true" />
        <span className="prompt-label">
          {active.special ? (
            <span className="prompt-star" aria-hidden="true">
              ✶{" "}
            </span>
          ) : null}
          {label}
        </span>
        <span className="prompt-go" aria-hidden="true">
          →
        </span>
        <span className="prompt-text">
          {active.title} · {when} · {active.location}
        </span>
      </Link>
      <button type="button" className="prompt-x" onClick={dismiss} aria-label={`Dismiss: ${active.title}`}>
        ×
      </button>
    </aside>
  );
}
