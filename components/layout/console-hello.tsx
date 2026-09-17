"use client";

import { useEffect } from "react";

/** A note for the kind of person who opens devtools on a math club website. */
export function ConsoleHello() {
  useEffect(() => {
    const w = window as Window & { __smcHello?: boolean };
    if (w.__smcHello) return;
    w.__smcHello = true;
    console.log(
      "%c∀ Spartan Math Club%c\n\nYou opened the console on a math club website.\nThat's a proof you belong here.\n\nLemma: every answer on /problems is in this page's source.\nCorollary: finding it doesn't count. Solve it properly.\n\n→ /join",
      "font: 700 20px Georgia, serif; color: #ffd23f",
      "font: 13px ui-monospace, monospace; color: inherit",
    );
  }, []);
  return null;
}
