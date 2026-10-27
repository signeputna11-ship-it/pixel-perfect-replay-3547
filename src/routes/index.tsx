import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Self-Belief Lab — Discover your pattern" },
      { name: "description", content: "A five-question reflection for women founders and leaders exploring confidence, pricing and visibility." },
      { property: "og:title", content: "The Self-Belief Lab" },
      { property: "og:description", content: "You've built the skills. Now build the self-belief to match." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Shell>
      <section className="pt-10 pb-6 sm:pt-20 fade-up">
        <p className="eyebrow">A five-minute reflection</p>
        <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
          You've built the skills. <em className="text-gold">Now build the self-belief</em> to match.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          Explore the beliefs influencing how you show up, speak up, and value your work.
        </p>
        <Link to="/audit" className="btn-primary mt-10">
          Discover My Pattern <span aria-hidden>→</span>
        </Link>
        <p className="mt-4 text-xs text-muted-foreground">Five questions · No email required · Result shown instantly</p>
      </section>
      <div className="my-14 h-px bg-border" />
      <section className="grid gap-8 sm:grid-cols-3">
        {[
          ["01", "Answer five questions", "On pricing, visibility, achievement, approval and success."],
          ["02", "See your pattern", "A gentle, non-diagnostic reflection with one practical step."],
          ["03", "Reflect", "A short guided exercise to reframe one automatic thought."],
        ].map(([n, t, d]) => (
          <div key={n}>
            <p className="font-display text-2xl text-gold">{n}</p>
            <h3 className="mt-2 font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
    </Shell>
  );
}
