/**
 * Club-facing copy for the home and join pages. Math fields are KaTeX source.
 */
const tex = String.raw;

export const homeCopy = {
  pillars: [
    {
      symbol: tex`\exists`,
      title: "Problem sessions",
      body: "Bring a pencil. We bring the problems — olympiad-style, Putnam-style, and the ones nobody has a name for yet. Work in small groups, argue at the whiteboard, leave smarter.",
    },
    {
      symbol: tex`\vdash`,
      title: "Talks & proofs",
      body: "Students, faculty, and practitioners on the mathematics they can't stop thinking about, from topology to transformers. Proofs are shown in full. Hand-waving is heckled, politely.",
    },
    {
      symbol: tex`\mathbb{E}`,
      title: "Quant games",
      body: "Estimation markets, betting games, and expected value under pressure — the probability puzzles trading firms love, played for bragging rights instead of money.",
    },
    {
      symbol: tex`\int`,
      title: "Competitions",
      body: "Integration bees, team contests, and preparation for the Putnam. Glory is temporary; the problems are forever.",
      signature: { tex: tex`\max_{S \in \text{Schools}}\ \max_{x \in S}\ x`, read: "The best of the best." },
    },
    {
      symbol: tex`\nabla`,
      title: "Applied math & code",
      body: "Modeling, simulation, optimization, and the numerical methods that make them run. The place where the math meets a compiler.",
    },
    {
      symbol: tex`\Sigma`,
      title: "Consulting",
      body: "Real questions from real organizations, solved rigorously by members. The best way to learn applied math is to have someone depend on your answer.",
      href: "/consulting",
    },
  ],

  closingBody:
    "No application. No prerequisite. No minimum GPA. Show up to a session, pick up a problem, and you're one of us.",
};

export const joinCopy = {
  eyebrow: "Join the club",
  headline: "Membership has exactly one prerequisite: curiosity.",
  lede: "Spartan Math Club is open to SJSU students of every major and every level. You do not need to be a math major, and you do not need to be “good at math.” Nobody starts good at math — they get there by working problems with other people.",
  steps: [
    {
      title: "Show up",
      body: "Come to any event. Problem sessions are the best first step: you'll be handed a problem and a group within five minutes.",
      cta: { label: "See upcoming events", href: "/events" },
    },
    {
      title: "Get in the loop",
      body: "Follow along for announcements, problem drops, and the occasional unhinged proof at 2 a.m.",
    },
    {
      title: "Solve something",
      body: "Try the problem archive. Get one right and you have already done the only thing members actually do.",
      cta: { label: "Open the problem archive", href: "/problems" },
    },
    {
      title: "Give back",
      body: "Lead a session, give a lightning talk on something you love, write a problem, or join a consulting project.",
    },
  ],
  speakersKicker: "Faculty, alumni & industry",
  speakersHeadline: "Bring us a problem worth thinking about.",
  speakersBody:
    "Give a talk, lead a problem session, run a quant game, judge a competition, or bring a well-scoped question to the consulting division. A single evening from someone who uses mathematics seriously can change what a student thinks is possible.",
  faq: [
    {
      question: "Do I need to be a math major?",
      answer:
        "No. Members come from math, computer science, engineering, physics, economics, statistics, and plenty of majors with no math requirement at all. Formally, membership is independent of major.",
    },
    {
      question: "Do I need to be good at math?",
      answer:
        "No. You need to be curious and willing to be stuck for a while. Being stuck is the job. Everyone in the room is stuck on something.",
    },
    {
      question: "Is there an application?",
      answer:
        "Not for the club. Come to an event and you're in. Some consulting projects have limited team sizes, and we'll explain how to get involved when those open.",
    },
    {
      question: "I'm a grad student / alum / not at SJSU. Can I come?",
      answer:
        "Club membership follows SJSU student organization rules, but guest speakers, alumni, and collaborators are welcome at many events. Reach out and we'll figure out the right way to involve you.",
    },
  ],
};
