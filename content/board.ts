/**
 * Classic public-domain theorems for the board's proof panel. One is shown
 * per week, in rotation. Do not add research results here unless the user
 * has approved a specific one by name.
 */
const tex = String.raw;

export type BoardProof = {
  name: string;
  /** Plain-text statement for the chalk headline. */
  statement: string;
  /** Optional formal restatement (KaTeX). */
  formal?: string;
  /** Proof lines; inline math with $...$. */
  lines: string[];
};

export const boardProofs: BoardProof[] = [
  {
    name: "Euclid",
    statement: "There are infinitely many primes.",
    formal: tex`\neg\exists\, n \in \mathbb{N} : |\text{Primes}| = n`,
    lines: [
      tex`Suppose $p_1, \dots, p_n$ were all of them.`,
      tex`Let $N = p_1 p_2 \cdots p_n + 1$.`,
      tex`No $p_i$ divides $N$, since each leaves remainder $1$.`,
      tex`But $N > 1$ has a prime factor, and it isn't on the list. Contradiction.`,
    ],
  },
  {
    name: "Pythagoreans",
    statement: "The square root of two is irrational.",
    formal: tex`\sqrt{2} \notin \mathbb{Q}`,
    lines: [
      tex`Suppose $\sqrt{2} = a/b$ in lowest terms.`,
      tex`Then $a^2 = 2b^2$, so $a^2$ is even, so $a$ is even: $a = 2c$.`,
      tex`Then $4c^2 = 2b^2$, so $b^2 = 2c^2$, and $b$ is even too.`,
      tex`Both even contradicts lowest terms.`,
    ],
  },
];

const WEEK_MS = 7 * 86_400_000;
/** A Monday, so the rotation turns over at the start of the club week. */
const EPOCH = Date.parse("2026-08-24T00:00:00-07:00");

export function proofOfTheWeek(now: number): BoardProof {
  const week = Math.floor((now - EPOCH) / WEEK_MS);
  const index = ((week % boardProofs.length) + boardProofs.length) % boardProofs.length;
  return boardProofs[index];
}
