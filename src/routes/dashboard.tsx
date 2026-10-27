import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { getProduct } from "@/lib/products";
import { SAMPLE_MEMBER as m } from "@/lib/dashboard-sample";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Member Dashboard Preview — The Self-Belief Lab" },
      { name: "description", content: "A sample preview of the Self-Belief Lab member area." },
      { property: "og:title", content: "Member Dashboard Preview — The Self-Belief Lab" },
      { property: "og:description", content: "See what members will see: progress, exercises and resources." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const last = getProduct(m.lastExercise.program)!;
  return (
    <Shell>
      <span className="inline-block rounded-full bg-butter px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
        Preview · sample data, not a real account
      </span>
      <h1 className="mt-5 font-display text-5xl leading-tight">Welcome back, {m.name}.</h1>

      <section className="mt-10">
        <p className="eyebrow">Your programmes</p>
        <div className="mt-4 space-y-4">
          {m.programs.map(({ slug, completed }) => {
            const p = getProduct(slug)!;
            const pct = Math.round((completed / p.days) * 100);
            return (
              <div key={slug} className={`${p.color} p-6`}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
                  <h2 className="truncate font-display text-2xl">{p.name}</h2>
                  <span className="text-sm">{completed}/{p.days} days</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-background/60">
                  <div className="h-full bg-forest" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-3 text-sm">Next: Day {completed + 1} · {p.curriculum[completed]}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="card-soft">
          <p className="eyebrow">Last completed exercise</p>
          <p className="mt-3 font-display text-2xl leading-snug">{m.lastExercise.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{last.name} · Day {m.lastExercise.day}</p>
        </div>
        <div className="bg-forest p-7 text-primary-foreground">
          <p className="eyebrow text-primary-foreground/70">Next recommended action</p>
          <p className="mt-3 leading-relaxed">{m.nextAction}</p>
        </div>
      </section>

      <section className="mt-6 card-soft">
        <p className="eyebrow">Resources</p>
        <ul className="mt-3 divide-y divide-border">
          {m.resources.map((r) => (
            <li key={r} className="flex justify-between gap-3 py-3 text-sm">
              <span className="min-w-0">{r}</span><span className="shrink-0 text-muted-foreground">Coming soon</span>
            </li>
          ))}
        </ul>
      </section>

      <Link to="/shop" className="btn-ghost mt-8">Browse all programmes</Link>
    </Shell>
  );
}
