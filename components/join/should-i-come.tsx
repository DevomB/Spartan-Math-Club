"use client";

import { cn } from "@/lib/cn";
import { useState, type ReactNode } from "react";

type Symbols = {
  top: ReactNode;
  bot: ReactNode;
  c: ReactNode;
  g: ReactNode;
  cOrNotC: ReactNode;
  gOrNotG: ReactNode;
  formula: ReactNode;
};

const ROWS: Array<[boolean, boolean]> = [
  [true, true],
  [true, false],
  [false, true],
  [false, false],
];

/**
 * "Should I come?" A truth table that is a tautology: every row is true.
 * Toggles highlight the row that matches you. Symbols arrive pre-typeset.
 */
export function ShouldICome({ symbols }: { symbols: Symbols }) {
  const [curious, setCurious] = useState(true);
  const [good, setGood] = useState(false);

  const value = (truth: boolean) => (
    <>
      <span aria-hidden="true">{truth ? symbols.top : symbols.bot}</span>
      <span className="visually-hidden">{truth ? "true" : "false"}</span>
    </>
  );

  return (
    <div className="truth">
      <div className="truth-controls">
        <button type="button" className="truth-toggle" aria-pressed={curious} onClick={() => setCurious((v) => !v)}>
          <span>
            I&apos;m curious <span className="d" aria-hidden="true">({symbols.c})</span>
          </span>
          <span className={cn("truth-val", curious ? "gr" : "r")}>{value(curious)}</span>
        </button>
        <button type="button" className="truth-toggle" aria-pressed={good} onClick={() => setGood((v) => !v)}>
          <span>
            I&apos;m &ldquo;good at math&rdquo; <span className="d" aria-hidden="true">({symbols.g})</span>
          </span>
          <span className={cn("truth-val", good ? "gr" : "r")}>{value(good)}</span>
        </button>
        <p className="truth-formula" aria-hidden="true">
          {symbols.formula}
        </p>
        <p className="truth-verdict" aria-live="polite">
          <span className="gr" aria-hidden="true">
            {symbols.top}
          </span>{" "}
          So come Monday.
        </p>
      </div>
      <div className="truth-table-wrap" tabIndex={0} role="region" aria-label="Truth table for Come">
        <table className="truth-table">
          <caption className="visually-hidden">
            Truth table for Come: every combination of curious and good at math evaluates to true.
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span aria-hidden="true">{symbols.c}</span>
                <span className="visually-hidden">Curious</span>
              </th>
              <th scope="col">
                <span aria-hidden="true">{symbols.g}</span>
                <span className="visually-hidden">Good at math</span>
              </th>
              <th scope="col">
                <span aria-hidden="true">{symbols.cOrNotC}</span>
                <span className="visually-hidden">C or not C</span>
              </th>
              <th scope="col">
                <span aria-hidden="true">{symbols.gOrNotG}</span>
                <span className="visually-hidden">G or not G</span>
              </th>
              <th scope="col">Come</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([c, g]) => (
              <tr key={`${c}${g}`} className={cn(c === curious && g === good && "is-you")}>
                <td className={c ? "T" : "F"}>{value(c)}</td>
                <td className={g ? "T" : "F"}>{value(g)}</td>
                <td className="T">{value(true)}</td>
                <td className="T">{value(true)}</td>
                <td className="T">{value(true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
