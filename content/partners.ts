/**
 * Confirmed club partners. Names, links, and descriptions are supplied by the
 * partner and reproduced verbatim — never paraphrase or add entries that are
 * not agreed in writing.
 */
export type Partner = {
  name: string;
  href: string;
  logo: { src: string; width: number; height: number };
  description: string;
};

export const partners: Partner[] = [
  {
    name: "Tradermath",
    href: "https://www.tradermath.org",
    logo: { src: "/partners/tradermath/tradermath-logo.svg", width: 525, height: 76 },
    description:
      "The largest interview preparation platform for trading and quant finance worldwide. Purpose-built for every stage of the trading and quant interview, with mental maths drills, probability and reasoning tests, market-making games, cognitive games and coding problems. Many trading firms also use Tradermath to screen their own applicants.",
  },
];
