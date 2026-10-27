import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import portrait from "@/assets/DSC01766.jpg.asset.json";
import laughing from "@/assets/DSC01921.jpg.asset.json";
import sunlit from "@/assets/DSC02285.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Self-Belief Lab by Signe Coach — Discover your pattern" },
      { name: "description", content: "A ten-question reflection for women founders and leaders exploring confidence, pricing and visibility." },
      { property: "og:title", content: "The Self-Belief Lab by Signe Coach" },
      { property: "og:description", content: "You've built the skills. Now build the self-belief to match." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Shell>
      <section className="grid items-center gap-10 pt-6 sm:grid-cols-[1.3fr_1fr] fade-up">
        <div>
          <p className="eyebrow">A five-minute reflection</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] sm:text-6xl">
            You've built the skills. <em>Now build the self-belief</em> to match.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Explore the beliefs influencing how you show up, speak up, and value your work.
          </p>
          <Link to="/audit" className="btn-primary mt-10">
            Discover My Pattern <span aria-hidden>→</span>
          </Link>
          <Link to="/shop" className="btn-ghost ml-0 mt-3 sm:ml-3">See the programmes</Link>
          <p className="mt-4 text-xs text-muted-foreground">Ten questions · No email required · Result shown instantly</p>
        </div>
        <div className="relative">
          <div className="absolute -right-3 -top-3 h-full w-full bg-blush" aria-hidden />
          <img src={portrait.url} alt="Signe smiling with a cup of coffee" className="relative aspect-[4/5] w-full object-cover" />
        </div>
      </section>

      <section className="mt-20 grid gap-4 sm:grid-cols-3">
        {[
          ["01", "Answer ten questions", "On pricing, visibility, boundaries, praise, rest and more.", "bg-blush"],
          ["02", "See your pattern", "A gentle, non-diagnostic reflection with one practical step.", "bg-powder"],
          ["03", "Reflect", "A short guided exercise to reframe one automatic thought.", "bg-butter"],
        ].map(([n, t, d, bg]) => (
          <div key={n} className={`${bg} p-6`}>
            <p className="font-display text-2xl">{n}</p>
            <h3 className="mt-6 font-display text-2xl">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 grid gap-0 sm:grid-cols-2">
        <div className="bg-forest p-10 text-primary-foreground">
          <p className="font-display text-4xl leading-tight">A softer place.<br />An honest voice.</p>
          <p className="mt-6 font-display text-xl italic leading-snug opacity-90">
            Recognition without shame. Insight without diagnosis. Choice without pressure.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <img src={laughing.url} alt="Signe laughing outdoors" className="h-full min-h-64 w-full object-cover" />
          <img src={sunlit.url} alt="Signe in the sunshine" className="h-full min-h-64 w-full object-cover" />
        </div>
      </section>
    </Shell>
  );
}
