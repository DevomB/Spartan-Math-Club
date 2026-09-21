/**
 * Problem archive. Text fields accept inline math `$...$` and display
 * math `$$...$$` (KaTeX). Write them with String.raw so backslashes survive.
 *
 * Numeric `answer` values are checked client-side, so anyone reading the
 * page source can find them. Strategy problems may omit the answer field and
 * present their reasoning through hints and a written solution instead.
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
  answerFormat?: string;
  answer?: number;
  /** Guidance shown when a problem calls for an argument rather than a numeric answer. */
  responseNote?: string;
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
      tex`You roll a fair six-sided die and are paid its face value in dollars. After seeing the roll you may either keep it, or reroll exactly once. If you reroll, you must keep the second roll.`,
      tex`Playing optimally, what is your expected payout?`,
    ],
    answerFormat: "A number, fraction, or expression, such as 3.5 or 7/2",
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
      tex`By symmetry take $x < y$ (half the square). The pieces are $x,\ y - x,\ 1 - y$, and all are below $\tfrac12$ when $x < \tfrac12$, $y > \tfrac12$, and $y - x < \tfrac12$. This region is a triangle of area $\tfrac18$.`,
      tex`Doubling for the case $y < x$ gives $2 \cdot \tfrac18 = \tfrac14$.`,
    ],
  },
  {
    slug: "staying-below",
    number: 4,
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
    number: 5,
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
    number: 6,
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
      tex`Beukers used a close cousin of this integral to give a proof that $\zeta(2)$ and $\zeta(3)$ are irrational.`,
    ],
  },
  {
    slug: "the-sultans-glass",
    number: 7,
    title: "The Sultan's Glass",
    topic: "Logic · Coordination",
    difficulty: 3,
    statement: [
      tex`A sultan has captured $50$ wise men. A glass begins standing bottom down. Every minute, the sultan randomly calls one wise man, who may turn the glass upside down, set it bottom down, or do nothing. The same person may be called many times, and the process may continue indefinitely.`,
      tex`When a called wise man correctly states that all $50$ wise men have visited the sultan at least once, everyone goes free. If the statement is wrong, everyone is put to death. The wise men may agree on a strategy once before being imprisoned in separate rooms. Design a strategy that allows them to go free.`,
    ],
    responseNote: "This is an open-ended strategy problem. State the protocol and explain why the final declaration must be correct.",
    hints: [
      tex`Choose one wise man to keep count. The other $49$ should each contribute exactly one signal.`,
      tex`A non-counter who has not yet contributed should turn the glass upside down the first time he sees it bottom down. After contributing once, he should never change it again.`,
      tex`Whenever the counter sees the glass upside down, he should set it bottom down and increase his count. When should he make the declaration?`,
    ],
    solution: [
      tex`Before they are separated, the wise men designate one person as the counter. Each of the other $49$ wise men follows one rule: the first time he is called while the glass is bottom down, he turns it upside down. After he has done this once, he never moves the glass again.`,
      tex`Whenever the counter is called and finds the glass upside down, he sets it bottom down and adds $1$ to his count. Otherwise, he does nothing. When his count reaches $49$, he announces that everyone has visited the sultan.`,
      tex`Only a non-counter can create an upside-down signal, and each non-counter can do so at most once. Therefore, every increment represents a different one of the other $49$ wise men. A count of $49$ proves that all of them have visited. The counter has also visited because he is making the announcement, so all $50$ have been called at least once.`,
      tex`Under random repeated selection, each waiting participant is eventually called while able to contribute, and the counter is eventually called to record each signal, with probability $1$. Thus the process terminates almost surely, and the declaration is never made early.`,
    ],
  },
  {
    slug: "four-points-two-distances",
    number: 8,
    title: "Four Points, Two Distances",
    topic: "Geometry · Classification",
    difficulty: 4,
    statement: [
      tex`Place four distinct points in the plane so that the six distances between pairs of points take exactly two values. Two arrangements count as the same if one can be obtained from the other by translating, rotating, reflecting, or uniformly scaling the plane.`,
      tex`How many different arrangements are possible? One example is an equilateral triangle together with its center.`,
    ],
    answerFormat: "An integer",
    answer: 6,
    hints: [
      tex`Color each of the six segments according to which of the two lengths it has. Classify the resulting two-colorings of $K_4$ before imposing the geometry.`,
      tex`Consider the possible splits of the six segments between the two lengths: $5+1$, $4+2$, and $3+3$.`,
      tex`The six realizations include a square, four vertices of a regular pentagon, an equilateral triangle with its center, and two equilateral triangles sharing an edge. Two less familiar configurations begin with an equilateral triangle and put the fourth point on its axis of symmetry.`,
    ],
    solution: [
      tex`There are $\boxed{6}$ arrangements up to similarity. Classifying the two-colored edges of $K_4$ reduces the possibilities to the splits $5+1$, $4+2$, and $3+3$; the other edge patterns cannot be realized by four distinct planar points.`,
      tex`The $5+1$ case gives two equilateral triangles sharing an edge. The $4+2$ case gives a square and two additional configurations. For the latter two, take an equilateral triangle with base endpoints $(-\tfrac12,0)$ and $(\tfrac12,0)$ and apex $(0,\tfrac{\sqrt3}{2})$. The fourth point is either $(0,\tfrac{\sqrt3}{2}+1)$ or $(0,\tfrac{\sqrt3}{2}-1)$.`,
      tex`The $3+3$ case gives an equilateral triangle with its center and four vertices of a regular pentagon. Each listed arrangement has exactly two distances, and the edge-color classification shows that the list is complete.`,
    ],
  },
  {
    slug: "blindfolded-coins",
    number: 9,
    title: "Blindfolded Coins",
    topic: "Logic · Invariants",
    difficulty: 2,
    statement: [
      tex`Ten coins are on a table, with exactly five showing heads and five showing tails. You are blindfolded. You may touch and move the coins, but you cannot determine which side of any coin is facing up. You may flip any coins any number of times.`,
      tex`How can you divide the coins into two piles containing the same number of heads?`,
    ],
    responseNote: "This is a strategy problem. Describe the construction and explain why the head counts agree.",
    hints: [
      tex`Separate any five coins from the other five. You do not need to know how many heads are in either pile.`,
      tex`Flip every coin in one of the two piles.`,
    ],
    solution: [
      tex`Choose any five coins for the first pile and place the remaining five in the second pile. Flip all five coins in the first pile.`,
      tex`Suppose the first pile originally contained $h$ heads. It then contained $5-h$ tails, while the second pile contained the remaining $5-h$ heads. After every coin in the first pile is flipped, its $5-h$ tails become heads. Both piles therefore contain exactly $5-h$ heads.`,
    ],
  },
  {
    slug: "chessboard-multiples-of-ten",
    number: 10,
    title: "Multiples of Ten",
    topic: "Invariants · Chessboards",
    difficulty: 4,
    statement: [
      tex`Every square of an $8\times 8$ chessboard contains a positive integer. In one move, choose a contiguous $3\times3$ or $4\times4$ square and increase every number in it by $1$.`,
      tex`Is it always possible to make every number on the board a multiple of $10$?`,
    ],
    responseNote: "Decide whether the claim is always true. A complete answer should provide either a construction or an invariant and counterexample.",
    hints: [
      tex`It is enough to find an obstruction modulo $2$, since every multiple of $10$ is even.`,
      tex`Focus on rows $1,2,4,5,7,$ and $8$. Track the parity of the sum of all entries in those rows.`,
    ],
    solution: [
      tex`It is not always possible. Consider the parity of the sum of all entries in rows $1,2,4,5,7,$ and $8$.`,
      tex`Any three consecutive rows contain exactly two of these selected rows. A $3\times3$ move therefore changes the selected sum by $2\cdot3=6$, which is even. A $4\times4$ move changes it by four times some integer, which is also even. Thus this parity is invariant.`,
      tex`Start with $10$ in every square except for one square in a selected row, where the entry is $1$. The invariant is odd. If every entry became a multiple of $10$, the selected sum would be even, which is impossible. Therefore the answer is no.`,
    ],
  },
  {
    slug: "reciprocal-cubes",
    number: 11,
    title: "Reciprocal Cubes",
    topic: "Algebra · Identities",
    difficulty: 2,
    statement: [
      tex`Let $x$ be positive and suppose $$x^2+\frac{1}{x^2}=2019.$$ Find $$x^3+\frac{1}{x^3}.$$`,
    ],
    answerFormat: "An exact expression, such as 2018*sqrt(2021)",
    answer: 2018 * Math.sqrt(2021),
    hints: [
      tex`First find $x+\frac1x$ by squaring it. Positivity determines the sign.`,
      tex`Use $\left(x+\frac1x\right)^3=x^3+\frac1{x^3}+3\left(x+\frac1x\right)$.`,
    ],
    solution: [
      tex`Since $x>0$,
$$\left(x+\frac1x\right)^2=x^2+2+\frac1{x^2}=2021,$$
so $x+\frac1x=\sqrt{2021}$.`,
      tex`Therefore
$$x^3+\frac1{x^3}=\left(x+\frac1x\right)^3-3\left(x+\frac1x\right)=\sqrt{2021}(2021-3)=\boxed{2018\sqrt{2021}}.$$`,
    ],
  },
];

/** The problem featured on the home page. */
export const featuredProblemSlug = "the-reroll";

export function getProblem(slug: string): Problem | undefined {
  return problems.find((problem) => problem.slug === slug);
}
