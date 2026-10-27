import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Programmes — The Self-Belief Lab" },
      { name: "description", content: "Four guided self-belief programmes by Signe Coach, from €29." },
      { property: "og:title", content: "Programmes — The Self-Belief Lab" },
      { property: "og:description", content: "Self-worth, money beliefs, confidence and relationships." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <Shell>
      <section className="pt-6 fade-up">
        <p className="eyebrow">The programmes</p>
        <h1 className="mt-5 font-display text-5xl leading-tight">Four ways to go deeper.</h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          Short, practical daily lessons. Each has a free sample lesson you can try right now.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className={`${p.color} group flex flex-col p-7 transition hover:-translate-y-0.5`}>
              <p className="eyebrow text-forest">{p.format}</p>
              <h2 className="mt-6 font-display text-3xl leading-tight">{p.name}</h2>
              <p className="mt-2 text-sm leading-relaxed">{p.tagline}</p>
              <p className="mt-auto pt-8 font-display text-2xl">€{p.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}
