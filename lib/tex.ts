import katex from "katex";
import "server-only";

/** Render KaTeX source to HTML at build/request time. Never ships katex to the client. */
export function renderTex(source: string, displayMode = false): string {
  return katex.renderToString(source, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
    output: "htmlAndMathml",
  });
}

export type TextSegment =
  | { kind: "text"; value: string }
  | { kind: "inline"; value: string }
  | { kind: "display"; value: string };

/** Split prose containing `$inline$` and `$$display$$` math. */
export function splitMath(input: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let last = 0;
  for (const match of input.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) segments.push({ kind: "text", value: input.slice(last, index) });
    if (match[1] !== undefined) segments.push({ kind: "display", value: match[1].trim() });
    else segments.push({ kind: "inline", value: match[2] });
    last = index + match[0].length;
  }
  if (last < input.length) segments.push({ kind: "text", value: input.slice(last) });
  return segments;
}

/** Escape plain text for use inside `\text{...}`. */
export function texText(value: string): string {
  const map: Record<string, string> = {
    "\\": String.raw`\textbackslash{}`,
    "{": String.raw`\{`,
    "}": String.raw`\}`,
    "#": String.raw`\#`,
    $: String.raw`\$`,
    "%": String.raw`\%`,
    "&": String.raw`\&`,
    _: String.raw`\_`,
    "~": String.raw`\textasciitilde{}`,
    "^": String.raw`\textasciicircum{}`,
  };
  return value.replace(/[\\{}#$%&_~^]/g, (char) => map[char] ?? char);
}
