import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FoundingCircle, Shell } from "@/components/Shell";
import { isPatternId, PATTERNS } from "@/lib/audit";

export const Route = createFileRoute("/result/$pattern")({
  loader: ({ params }) => {
    if (!isPatternId(params.pattern)) throw notFound();
    return { id: params.pattern };
  },
  head: ({ loaderData }) => {
    const name = loaderData ? PATTERNS[loaderData.id].name : "Your pattern";
    return {
      meta: [
        { title: `${name} — The Self-Belief Lab` },
        { name: "description", content: `Your reflection pattern: ${name}.` },
        { property: "og:title", content: `${name} — The Self-Belief Lab` },
        { property: "og:description", content: "A gentle, non-diagnostic reflection on your self-belief pattern." },
      ],
    };
  },
  component: Result,
});

function Result() {
  const { id } = Route.useLoaderData();
  const p = PATTERNS[id];
  return (
    <Shell>
      <section className="pt-8 fade-up">
        <p className="eyebrow">Your reflection pattern</p>
        <h1 className="mt-5 font-display text-5xl leading-tight">{p.name}</h1>
        <p className="mt-2 font-display text-2xl italic">"{p.tagline}"</p>
        <p className="mt-8 leading-relaxed text-muted-foreground">{p.explanation}</p>

        <div className="mt-10 space-y-4">
          <div className="card-soft border-0 bg-powder text-navy">
            <p className="eyebrow text-navy">Reflect</p>
            <p className="mt-3 font-display text-2xl leading-snug">{p.question}</p>
          </div>
          <div className="card-soft border-0 bg-blush">
            <p className="eyebrow text-forest">Try this</p>
            <p className="mt-3 leading-relaxed">{p.action}</p>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Patterns are a starting point for curiosity, not a label. Most people recognise a little of each.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/reflect" className="btn-primary">Begin the reflection exercise →</Link>
          <Link to="/audit" className="btn-ghost">Retake the audit</Link>
        </div>
      </section>
      <FoundingCircle />
    </Shell>
  );
}
