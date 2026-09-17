/**
 * Consulting division copy. Math fields use KaTeX source.
 * Do not add client names, logos, testimonials, or results until a client
 * has approved being named in writing.
 */
const tex = String.raw;

export const consultingCopy = {
  eyebrow: "SMC Consulting",
  headline: "Your problems, solved with math.",
  /** Hero: short enough to leave room for the buttons on a small phone. */
  lede: "One step at a time. Spartan Math Club's consulting division takes real questions from organizations — forecasts, pricing, schedules, experiments, models.",
  /** The rest of that thought, carried into the services section. */
  method:
    "We answer them the way mathematicians do: define the problem precisely, solve it rigorously, check the work, and explain it plainly.",
  availability: "Taking a limited number of projects this semester.",

  services: [
    {
      title: "Statistical analysis",
      formula: tex`\hat{\beta} = (X^{\top}X)^{-1}X^{\top}y`,
      body: "Regression, hypothesis tests, A/B experiments, and confidence intervals that mean what they say. We tell you what your data supports — and what it doesn't.",
    },
    {
      title: "Optimization",
      formula: tex`\min_{x \in \mathbb{R}^n} f(x) \ \text{s.t.}\ Ax \le b`,
      body: "Scheduling, routing, allocation, and pricing problems formulated as linear, integer, or convex programs — then actually solved.",
    },
    {
      title: "Probability & risk",
      formula: tex`\Pr(A \mid B) = \frac{\Pr(B \mid A)\Pr(A)}{\Pr(B)}`,
      body: "Expected value, variance, tail risk, and Monte Carlo simulation for decisions made under uncertainty.",
    },
    {
      title: "Mathematical modeling",
      formula: tex`\frac{dx}{dt} = f(x, t;\,\theta)`,
      body: "Turn a messy real-world system into equations you can reason about, simulate, and stress-test.",
    },
    {
      title: "Forecasting",
      formula: tex`\hat{y}_{t+h \mid t} = \mathbb{E}[\,y_{t+h} \mid \mathcal{F}_t\,]`,
      body: "Demand, enrollment, traffic, and time-series forecasts with honest error bars instead of a single optimistic line.",
    },
    {
      title: "Mathematical evaluation",
      formula: tex`\forall \varepsilon > 0\ \exists\, \delta > 0 \dots`,
      body: "A rigorous second pair of eyes on an existing model, spreadsheet, algorithm, or argument. We find the load-bearing assumptions and test them.",
    },
  ],

  process: [
    {
      label: "Given",
      title: "Define the problem",
      body: "A conversation to pin down the real question, the decision it informs, the data available, and what a useful answer looks like.",
    },
    {
      label: "Let",
      title: "Formalize",
      body: "We write the problem down precisely: variables, objective, constraints, assumptions. Most of the value is often created here.",
    },
    {
      label: "Then",
      title: "Solve",
      body: "Analysis, modeling, optimization, or simulation — whatever the problem actually requires, not whatever sounds impressive.",
    },
    {
      label: "Check",
      title: "Verify",
      body: "Sensitivity analysis, sanity checks, and peer review inside the club. Every result gets attacked before it reaches you.",
    },
    {
      label: "Done",
      /** Rendered as ∎ through KaTeX; the body font has no U+220E. */
      labelTex: tex`\blacksquare`,
      title: "Deliver",
      body: "A clear written report with the answer, the reasoning, the uncertainty, and the reproducible work behind it.",
    },
  ],

  principles: [
    {
      title: "We show our work.",
      body: "Every conclusion comes with the reasoning and the assumptions it depends on.",
    },
    {
      title: "We quantify uncertainty.",
      body: "An estimate without an error bar is an opinion wearing a lab coat.",
    },
    {
      title: "We say when math isn't the answer.",
      body: "If the honest answer is “you need more data” or “this isn't a math problem,” you'll hear it early.",
    },
  ],

  audiences: [
    "Small businesses",
    "Startups & student founders",
    "Nonprofits",
    "Campus organizations",
    "Researchers & labs",
    "Anyone with a spreadsheet they don't fully trust",
  ],

  faq: [
    {
      question: "Who does the work?",
      answer:
        "Spartan Math Club members at San José State — students who study and love mathematics, statistics, computer science, and adjacent fields. Work is reviewed by other members before it is delivered.",
    },
    {
      question: "What does it cost?",
      answer:
        "It depends on scope. Scope, timeline, deliverables, and any fees are agreed in writing before any work begins. Sending an inquiry commits you to nothing.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Small evaluations can take a couple of weeks; larger modeling projects are scoped to fit the academic term. We'll give you a realistic timeline after the first conversation.",
    },
    {
      question: "Will my data and project stay confidential?",
      answer:
        "We won't publish or discuss your project publicly without your written permission, and we can agree on confidentiality terms during scoping. Please don't send sensitive data in your first message.",
    },
    {
      question: "What don't you do?",
      answer:
        "We don't provide legal, tax, investment, medical, or licensed engineering advice, and our work is not a substitute for it. We also won't torture data until it confesses to a conclusion you've already chosen.",
    },
  ],

  inquiryHeadline: "Tell us the problem.",
  inquiryBody:
    "A few sentences is plenty. Describe the decision you're trying to make and the data you have. We'll reply to set up a short scoping conversation.",
} as const;

export const problemAreas = [
  "Statistical analysis",
  "Optimization",
  "Probability & risk",
  "Mathematical modeling",
  "Forecasting",
  "Mathematical evaluation",
  "Not sure yet",
] as const;
