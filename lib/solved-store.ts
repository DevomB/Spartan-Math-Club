"use client";

import { useSyncExternalStore } from "react";

/** Per-browser record of solved problems. Purely a convenience; never required. */
const KEY = "smc:solved";
const EVENT = "smc:solved-change";

function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function markSolved(slug: string) {
  const solved = new Set(read().split(",").filter(Boolean));
  solved.add(slug);
  try {
    window.localStorage.setItem(KEY, [...solved].join(","));
  } catch {
    // Storage unavailable (private mode, blocked). The in-page state still shows success.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Comma-joined slugs; a string keeps the snapshot referentially stable. */
export function useSolved(): Set<string> {
  const raw = useSyncExternalStore(subscribe, read, () => "");
  return new Set(raw.split(",").filter(Boolean));
}
