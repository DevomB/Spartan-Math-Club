import { BoardRun } from "@/components/board/board-run";
import { ChaosFigure } from "@/components/home/chaos-figure";
import { EventsPreview } from "@/components/home/events-preview";
import { FeaturedProblem } from "@/components/home/featured-problem";
import { Pillars } from "@/components/home/pillars";
import { requestTime } from "@/lib/dates";

export const revalidate = 3600;

export default function HomePage() {
  const now = requestTime();

  return (
    <main id="content" tabIndex={-1}>
      <BoardRun now={now} />
      <Pillars />
      <FeaturedProblem />
      <EventsPreview now={now} />
      <ChaosFigure />
    </main>
  );
}
