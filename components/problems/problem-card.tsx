import { Glyph, MathText, Tex } from "@/components/math/tex";
import { AnswerCheck, SolvedBadge } from "@/components/problems/answer-check";
import { difficultyLabel, difficultyName, type Problem } from "@/content/problems";
import { cn } from "@/lib/cn";

export function problemNumber(problem: Problem): string {
  return `Problem ${String(problem.number).padStart(3, "0")}`;
}

export function ProblemMeta({ problem }: { problem: Problem }) {
  return (
    <p className="problem-meta">
      <span className="problem-number">{problemNumber(problem)}</span>
      <span className="problem-topic">{problem.topic}</span>
      <span className={cn("difficulty", `difficulty--${problem.difficulty}`)} title={difficultyName[problem.difficulty]}>
        {difficultyLabel[problem.difficulty]}
        <span className="visually-hidden">, {difficultyName[problem.difficulty]}</span>
      </span>
      <SolvedBadge slug={problem.slug} />
    </p>
  );
}

export function ProblemCard({
  problem,
  headingLevel = "h2",
  showSolution = true,
  className,
}: {
  problem: Problem;
  headingLevel?: "h2" | "h3";
  showSolution?: boolean;
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <article className={cn("problem", className)} id={problem.slug} aria-labelledby={`${problem.slug}-title`}>
      <ProblemMeta problem={problem} />
      <Heading className="problem-title" id={`${problem.slug}-title`}>
        {problem.title}
      </Heading>
      <div className="problem-statement">
        {problem.statement.map((paragraph) => (
          <MathText key={paragraph}>{paragraph}</MathText>
        ))}
      </div>

      {problem.answer !== undefined && problem.answerFormat ? (
        <AnswerCheck
          slug={problem.slug}
          answer={problem.answer}
          tolerance={problem.tolerance}
          format={problem.answerFormat}
          glyphs={{ models: <Tex>{String.raw`\models`}</Tex>, notModels: <Tex>{String.raw`\nvDash`}</Tex> }}
        />
      ) : problem.responseNote ? (
        <p className="answer answer--open">{problem.responseNote}</p>
      ) : null}

      <div className="problem-reveals">
        {problem.hints.map((hint, index) => (
          <details className="reveal" key={hint}>
            <summary>
              <span className="reveal-kind">Hint {index + 1}</span>
            </summary>
            <div className="reveal-body">
              <MathText>{hint}</MathText>
            </div>
          </details>
        ))}
        {showSolution ? (
          <details className="reveal reveal--solution">
            <summary>
              <Glyph tex={String.raw`\vdash`} className="b" />
              <span className="reveal-kind">Show the proof</span>
              <span className="reveal-warn">spoilers</span>
            </summary>
            <div className="reveal-body">
              {problem.solution.map((paragraph) => (
                <MathText key={paragraph}>{paragraph}</MathText>
              ))}
              <p className="qed-line">
                <Glyph tex={String.raw`\blacksquare`} />
              </p>
            </div>
          </details>
        ) : null}
      </div>
    </article>
  );
}
