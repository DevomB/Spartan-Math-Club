"use client";

import { evaluate } from "@/lib/expression";
import { markSolved, useSolved } from "@/lib/solved-store";
import { useId, useState, type FormEvent, type ReactNode } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "correct" }
  | { kind: "wrong"; attempts: number; value: number }
  | { kind: "invalid"; message: string };

const encouragements = [
  "Not quite. Check your work — or your assumptions.",
  "Still no. Have you tried a smaller case?",
  "Close only counts in analysis. Try a hint?",
  "The problem is winning. Take a walk, come back.",
];

export function AnswerCheck({
  slug,
  answer,
  tolerance = 1e-6,
  format,
  glyphs,
}: {
  slug: string;
  answer: number;
  tolerance?: number;
  format: string;
  /** Pre-typeset ⊨ and ⊭ (KaTeX on the server; ⊭ only exists in the AMS font). */
  glyphs: { models: ReactNode; notModels: ReactNode };
}) {
  const id = useId();
  const solved = useSolved().has(slug);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    try {
      const value = evaluate(input);
      if (Math.abs(value - answer) <= tolerance) {
        setStatus({ kind: "correct" });
        markSolved(slug);
      } else {
        setStatus((prev) => ({ kind: "wrong", attempts: prev.kind === "wrong" ? prev.attempts + 1 : 1, value }));
      }
    } catch (error) {
      setStatus({ kind: "invalid", message: error instanceof Error ? error.message : "Couldn't read that" });
    }
  };

  const correct = status.kind === "correct" || (status.kind === "idle" && solved);

  return (
    <form className="answer" onSubmit={submit} noValidate>
      <label htmlFor={id} className="answer-label">
        Your answer
      </label>
      <div className="answer-row">
        <input
          id={id}
          className="answer-input"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            if (status.kind !== "idle") setStatus({ kind: "idle" });
          }}
          placeholder="e.g. 17/4, pi^2/6, sqrt(2)"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          inputMode="text"
          aria-describedby={`${id}-format ${id}-status`}
          aria-invalid={status.kind === "invalid" || status.kind === "wrong" || undefined}
        />
        <button type="submit" className="btn btn--ink answer-submit">
          <span>Check</span>
        </button>
      </div>
      <p className="answer-format" id={`${id}-format`}>
        {format}
      </p>
      <p className={`answer-status answer-status--${correct ? "correct" : status.kind}`} id={`${id}-status`} role="status">
        {correct ? (
          <>
            <span className="answer-glyph" aria-hidden="true">
              {glyphs.models}
            </span>
            <strong>Correct.</strong> {status.kind === "correct" ? "Your answer satisfies it. You're one of us now." : "Solved. Nicely done."}
          </>
        ) : status.kind === "wrong" ? (
          <>
            <span className="answer-glyph" aria-hidden="true">
              {glyphs.notModels}
            </span>
            {encouragements[(status.attempts - 1) % encouragements.length]}{" "}
            <span className="answer-echo">(you entered ≈ {Number(status.value.toPrecision(8))})</span>
          </>
        ) : status.kind === "invalid" ? (
          status.message
        ) : null}
      </p>
    </form>
  );
}

/** Small ✓ badge for archive listings. */
export function SolvedBadge({ slug }: { slug: string }) {
  const solved = useSolved().has(slug);
  if (!solved) return null;
  return (
    <span className="solved-badge" title="You've solved this one">
      ✓ Solved
    </span>
  );
}
