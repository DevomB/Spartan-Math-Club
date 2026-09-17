/**
 * A tiny, safe arithmetic evaluator for answer checking. No eval.
 *
 *   expr    := term (("+" | "-") term)*
 *   term    := unary (("*" | "/") unary | implicit unary)*
 *   unary   := ("-" | "+") unary | power
 *   power   := primary ("^" unary)?
 *   primary := number | constant | func primary | "(" expr ")"
 *
 * Accepts: 17/4, 4.25, 2pi, pi^2/6, sqrt(2)/2, √3, e^2, 1e-3.
 */

type Token =
  | { type: "num"; value: number }
  | { type: "id"; value: string }
  | { type: "op"; value: string };

const CONSTANTS: Record<string, number> = { pi: Math.PI, "π": Math.PI, e: Math.E, tau: 2 * Math.PI, "τ": 2 * Math.PI };

const FUNCTIONS: Record<string, (x: number) => number> = {
  sqrt: Math.sqrt,
  "√": Math.sqrt,
  ln: Math.log,
  log: Math.log10,
  exp: Math.exp,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
};

function tokenize(input: string): Token[] {
  const source = input
    .replace(/[×·]/g, "*")
    .replace(/÷/g, "/")
    .replace(/[−–]/g, "-")
    .replace(/\*\*/g, "^")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .toLowerCase();
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    const number = /^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/.exec(source.slice(i));
    if (number) {
      tokens.push({ type: "num", value: Number(number[0]) });
      i += number[0].length;
      continue;
    }
    const word = /^[a-z]+/.exec(source.slice(i));
    if (word) {
      tokens.push({ type: "id", value: word[0] });
      i += word[0].length;
      continue;
    }
    if (ch === "π" || ch === "τ" || ch === "√") {
      tokens.push({ type: "id", value: ch });
      i += 1;
      continue;
    }
    if ("+-*/^()".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i += 1;
      continue;
    }
    throw new Error(`Unexpected “${ch}”`);
  }
  return tokens;
}

export function evaluate(input: string): number {
  const tokens = tokenize(input);
  let pos = 0;

  const peek = () => tokens[pos];
  const isOp = (value: string) => {
    const token = peek();
    return token?.type === "op" && token.value === value;
  };

  function expr(): number {
    let value = term();
    while (isOp("+") || isOp("-")) {
      const op = tokens[pos++] as { value: string };
      const rhs = term();
      value = op.value === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  function startsPrimary(): boolean {
    const token = peek();
    return Boolean(token && (token.type === "num" || token.type === "id" || (token.type === "op" && token.value === "(")));
  }

  function term(): number {
    let value = unary();
    for (;;) {
      if (isOp("*") || isOp("/")) {
        const op = tokens[pos++] as { value: string };
        const rhs = unary();
        value = op.value === "*" ? value * rhs : value / rhs;
      } else if (startsPrimary()) {
        value *= power();
      } else {
        return value;
      }
    }
  }

  function unary(): number {
    if (isOp("-")) {
      pos += 1;
      return -unary();
    }
    if (isOp("+")) {
      pos += 1;
      return unary();
    }
    return power();
  }

  function power(): number {
    const base = primary();
    if (isOp("^")) {
      pos += 1;
      return base ** unary();
    }
    return base;
  }

  function primary(): number {
    const token = tokens[pos++];
    if (!token) throw new Error("Expression ended early");
    if (token.type === "num") return token.value;
    if (token.type === "id") {
      if (token.value in CONSTANTS) return CONSTANTS[token.value];
      const fn = FUNCTIONS[token.value];
      if (fn) return fn(primary());
      throw new Error(`Unknown name “${token.value}”`);
    }
    if (token.value === "(") {
      const value = expr();
      if (!isOp(")")) throw new Error("Missing “)”");
      pos += 1;
      return value;
    }
    throw new Error(`Unexpected “${token.value}”`);
  }

  if (!tokens.length) throw new Error("Enter an answer");
  const result = expr();
  if (pos < tokens.length) throw new Error(`Unexpected “${String(tokens[pos].value)}”`);
  if (!Number.isFinite(result)) throw new Error("That isn't a finite number");
  return result;
}

export function isCorrect(input: string, answer: number, tolerance = 1e-6): boolean {
  return Math.abs(evaluate(input) - answer) <= tolerance;
}
