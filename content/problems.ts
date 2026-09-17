/**
 * Problem archive. Text fields accept inline math `$...$` and display
 * math `$$...$$` (KaTeX). Write them with String.raw so backslashes survive.
 *
 * `answer` is checked client-side by numeric comparison, so anyone reading
 * the page source can find it. That is fine: if you are reading the source
 * of a math club website, you have already passed the real test.
 */
const tex = String.raw;

export type Difficulty = 1 | 2 | 3 | 4;

export const difficultyLabel: Record<Difficulty, string> = {
  1: "O(1)",
  2: "O(n)",
  3: "O(n²)",
  4: "O(2ⁿ)",
};

export const difficultyName: Record<Difficulty, string> = {
  1: "Warm-up",
  2: "Standard",
  3: "Hard",
  4: "Brutal",
};

export type Problem = {
  slug: string;
  number: number;
  title: string;
  topic: string;
  difficulty: Difficulty;
  statement: string[];
  /** Short description of the answer format shown under the input. */
  answerFormat: string;
  answer: number;
  /** Absolute tolerance. Defaults to 1e-6. */
  tolerance?: number;
  hints: string[];
  solution: string[];
};

export const problems: Problem[] = [
  {
    slug: "the-reroll",
    number: 1,
    title: "The Reroll",
    topic: "Probability · Optimal stopping",
    difficulty: 2,
    statement: [
      tex`You roll a fair six-sided die and are paid its face value in dollars. After seeing the roll you may either keep it, or reroll exactly once — in which case you must keep the second roll.`,
      tex`Playing optimally, what is your expected payout?`,
    ],
    answerFormat: "A number, fraction, or expression — e.g. 3.5 or 7/2",
    answer: 17 / 4,
    hints: [
      tex`If you reroll, the value of the game from that point on is fixed. What is it?`,
      tex`Keep the first roll exactly when it beats $\mathbb{E}[\text{second roll}] = 3.5$.`,
    ],
    solution: [
      tex`A reroll is worth $\mathbb{E}[X] = 3.5$. So the optimal policy is to keep any first roll of $4$, $5$, or $6$ and reroll otherwise.`,
      tex`$$\mathbb{E}[\text{payout}] = \tfrac{1}{6}(4+5+6) + \tfrac{3}{6}\cdot 3.5 = 2.5 + 1.75 = \tfrac{17}{4}.$$`,
      tex`Extension: with two rerolls allowed, the threshold for the first roll becomes $\mathbb{E} = 4.25$, so you keep only $5$ or $6$. The value climbs to $\tfrac{14}{3}$.`,
    ],
  },
  {
    slug: "waiting-for-hh",
    number: 2,
    title: "Waiting for HH",
    topic: "Probability · Markov chains",
    difficulty: 2,
    statement: [
      tex`Flip a fair coin repeatedly. What is the expected number of flips until you see two heads in a row for the first time?`,
    ],
    answerFormat: "An integer",
    answer: 6,
    hints: [
      tex`Track only what matters: have you just flipped a head, or not?`,
      tex`Let $E_0$ be the expected remaining flips with no progress, and $E_1$ after a single trailing head. Write one equation for each.`,
    ],
    solution: [
      tex`With the states from the hint,
$$E_0 = 1 + \tfrac12 E_1 + \tfrac12 E_0, \qquad E_1 = 1 + \tfrac12\cdot 0 + \tfrac12 E_0.$$`,
      tex`The first gives $E_0 = 2 + E_1$. Substituting into the second, $E_1 = 2 + \tfrac12 E_1$, so $E_1 = 4$ and $E_0 = 6$.`,
      tex`Surprise: waiting for $HT$ takes only $4$ flips on average. After an $H$, a failed attempt at $HT$ (another $H$) keeps your progress; a failed attempt at $HH$ (a $T$) destroys it.`,
    ],
  },
  {
    slug: "broken-stick",
    number: 3,
    title: "The Broken Stick",
    topic: "Geometric probability",
    difficulty: 2,
    statement: [
      tex`A stick of length $1$ is broken at two points chosen independently and uniformly at random. What is the probability that the three pieces can form a triangle?`,
    ],
    answerFormat: "A probability, e.g. 0.3 or 3/10",
    answer: 1 / 4,
    hints: [
      tex`Three lengths summing to $1$ form a triangle exactly when every piece is shorter than $\tfrac12$.`,
      tex`Plot the two break points as $(x, y)$ in the unit square and shade the good region.`,
    ],
    solution: [
      tex`By the triangle inequality, lengths $a + b + c = 1$ form a triangle iff $\max(a,b,c) < \tfrac12$.`,
      tex`By symmetry take $x < y$ (half the square). The pieces are $x,\ y - x,\ 1 - y$, and all are below $\tfrac12$ when $x < \tfrac12$, $y > \tfrac12$, and $y - x < \tfrac12$ — a triangle of area $\tfrac18$.`,
      tex`Doubling for the case $y < x$ gives $2 \cdot \tfrac18 = \tfrac14$.`,
    ],
  },
  {
    slug: "last-two-digits",
    number: 4,
    title: "Last Two Digits",
    topic: "Number theory · Modular arithmetic",
    difficulty: 1,
    statement: [tex`What are the last two digits of $7^{2026}$?`],
    answerFormat: "A two-digit number",
    answer: 49,
    hints: [
      tex`Compute small powers of $7 \bmod 100$ until something nice happens.`,
    ],
    solution: [
      tex`$7^2 = 49$ and $7^4 = 2401 \equiv 1 \pmod{100}$, so powers of $7$ cycle with period $4$ modulo $100$.`,
      tex`Since $2026 = 4 \cdot 506 + 2$, $$7^{2026} = \left(7^4\right)^{506}\cdot 7^2 \equiv 1 \cdot 49 \equiv 49 \pmod{100}.$$`,
    ],
  },
  {
    slug: "factorial-zeros",
    number: 5,
    title: "Zeros at the End",
    topic: "Number theory · Legendre's formula",
    difficulty: 1,
    statement: [tex`How many zeros does $2026!$ end with?`],
    answerFormat: "An integer",
    answer: 505,
    hints: [
      tex`Each trailing zero is a factor of $10 = 2 \cdot 5$, and factors of $2$ are plentiful.`,
    ],
    solution: [
      tex`Count factors of $5$ with Legendre's formula:
$$\sum_{k\ge1}\left\lfloor \frac{2026}{5^k} \right\rfloor = 405 + 81 + 16 + 3 = 505.$$`,
    ],
  },
  {
    slug: "the-lockers",
    number: 6,
    title: "The Lockers",
    topic: "Number theory · Divisors",
    difficulty: 1,
    statement: [
      tex`A hallway has $2026$ closed lockers numbered $1$ to $2026$. Student $k$ walks by and toggles every locker whose number is a multiple of $k$, for $k = 1, 2, \dots, 2026$.`,
      tex`How many lockers are open at the end?`,
    ],
    answerFormat: "An integer",
    answer: 45,
    hints: [
      tex`Locker $n$ is toggled once for each divisor of $n$.`,
      tex`Which numbers have an odd number of divisors?`,
    ],
    solution: [
      tex`Divisors pair up as $d \leftrightarrow n/d$. The pairing fails only when $d = n/d$, so $n$ has an odd number of divisors iff $n$ is a perfect square.`,
      tex`Open lockers are the squares up to $2026$. Since $45^2 = 2025 \le 2026 < 46^2$, there are $\boxed{45}$.`,
    ],
  },
  {
    slug: "staying-below",
    number: 7,
    title: "Staying Below the Line",
    topic: "Combinatorics · Lattice paths",
    difficulty: 3,
    statement: [
      tex`A path from $(0,0)$ to $(6,6)$ uses unit steps right $(+1, 0)$ and up $(0, +1)$. How many such paths never rise strictly above the line $y = x$?`,
    ],
    answerFormat: "An integer",
    answer: 132,
    hints: [
      tex`Without the restriction there are $\binom{12}{6}$ paths. Count the bad ones.`,
      tex`Reflect the portion of a bad path after it first touches $y = x + 1$.`,
    ],
    solution: [
      tex`A bad path first touches $y = x + 1$ at some point. Reflecting the remainder of the path across that line maps it bijectively to a path ending at $(5, 7)$.`,
      tex`So the number of good paths is
$$\binom{12}{6} - \binom{12}{5} = 924 - 792 = 132 = C_6,$$
the sixth Catalan number, $C_n = \frac{1}{n+1}\binom{2n}{n}$.`,
    ],
  },
  {
    slug: "sum-of-squares-over-powers",
    number: 8,
    title: "A Series Worth Knowing",
    topic: "Analysis · Generating functions",
    difficulty: 3,
    statement: [tex`Evaluate $$\sum_{n=1}^{\infty} \frac{n^2}{2^n}.$$`],
    answerFormat: "A number",
    answer: 6,
    hints: [
      tex`Start from $\sum_{n\ge0} x^n = \frac{1}{1-x}$ and apply the operator $x\,\frac{d}{dx}$.`,
    ],
    solution: [
      tex`Applying $x\frac{d}{dx}$ twice to the geometric series:
$$\sum_{n\ge1} n x^n = \frac{x}{(1-x)^2}, \qquad \sum_{n\ge1} n^2 x^n = \frac{x(1+x)}{(1-x)^3}.$$`,
      tex`At $x = \tfrac12$: $\dfrac{\tfrac12\cdot\tfrac32}{\tfrac18} = 6$.`,
    ],
  },
  {
    slug: "the-basel-double-integral",
    number: 9,
    title: "Basel in Disguise",
    topic: "Analysis · Integrals",
    difficulty: 4,
    statement: [
      tex`Evaluate $$\int_0^1\!\!\int_0^1 \frac{1}{1 - xy}\,dx\,dy.$$`,
      tex`Exact expressions are welcome; decimals are accepted to three places.`,
    ],
    answerFormat: "An expression like pi^2/6, sqrt(2), or a decimal",
    answer: Math.PI ** 2 / 6,
    tolerance: 5e-4,
    hints: [
      tex`For $|xy| < 1$, expand the integrand as a geometric series.`,
      tex`$\int_0^1\!\int_0^1 (xy)^k\,dx\,dy = \frac{1}{(k+1)^2}.$`,
    ],
    solution: [
      tex`Expanding and exchanging sum and integral (justified by monotone convergence):
$$\int_0^1\!\!\int_0^1 \sum_{k\ge0} (xy)^k \,dx\,dy = \sum_{k\ge0} \frac{1}{(k+1)^2} = \zeta(2).$$`,
      tex`Euler's resolution of the Basel problem gives $\zeta(2) = \dfrac{\pi^2}{6} \approx 1.6449$.`,
      tex`Beukers used a close cousin of this integral to give a slick proof that $\zeta(2)$ — and $\zeta(3)$ — are irrational.`,
    ],
  },
];

/** The problem featured on the home page. */
export const featuredProblemSlug = "the-reroll";

export function getProblem(slug: string): Problem | undefined {
  return problems.find((problem) => problem.slug === slug);
}
