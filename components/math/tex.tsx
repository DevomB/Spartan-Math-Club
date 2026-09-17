import { cn } from "@/lib/cn";
import { renderTex, splitMath } from "@/lib/tex";

/** Typeset a KaTeX expression on the server. */
export function Tex({
  children,
  display = false,
  className,
  hidden = false,
}: {
  children: string;
  display?: boolean;
  className?: string;
  /**
   * Decorative notation next to words that already say the same thing
   * (formal lines under headlines, status and nav glyphs).
   */
  hidden?: boolean;
}) {
  const Tag = display ? "div" : "span";
  return (
    <Tag
      className={cn(display ? "tex tex--display" : "tex", className)}
      aria-hidden={hidden || undefined}
      dangerouslySetInnerHTML={{ __html: renderTex(children, display) }}
    />
  );
}

/** A small decorative glyph that sits beside a visible word. Always aria-hidden. */
export function Glyph({ tex, className }: { tex: string; className?: string }) {
  return <Tex hidden className={cn("glyph", className)}>{tex}</Tex>;
}

/** Prose with embedded `$inline$` and `$$display$$` math. */
export function MathText({ children, as: Tag = "p", className }: { children: string; as?: "p" | "div" | "span"; className?: string }) {
  const segments = splitMath(children);
  const hasDisplay = segments.some((segment) => segment.kind === "display");
  const Wrapper = hasDisplay && Tag === "p" ? "div" : Tag;
  return (
    <Wrapper className={cn(Wrapper !== Tag && "p", className)}>
      {segments.map((segment, index) =>
        segment.kind === "text" ? (
          segment.value
        ) : (
          <Tex key={index} display={segment.kind === "display"}>
            {segment.value}
          </Tex>
        ),
      )}
    </Wrapper>
  );
}
