import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    if (!getProduct(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const title = p ? `${p.name} — The Self-Belief Lab` : "Programme — The Self-Belief Lab";
    return {
      meta: [
        { title },
        { name: "description", content: p?.description ?? "A Signe Coach programme." },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.tagline ?? "A Signe Coach programme." },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const p = getProduct(Route.useLoaderData().slug)!;
  const [tried, setTried] = useState(false);
  return (
    <Shell>
      <Link to="/shop" className="text-sm text-muted-foreground hover:underline">← All programmes</Link>
      <section className={`${p.color} mt-6 p-8 fade-up`}>
        <p className="eyebrow text-forest">{p.format}</p>
        <h1 className="mt-5 font-display text-5xl leading-tight">{p.name}</h1>
        <p className="mt-3 font-display text-2xl italic">{p.tagline}</p>
        <p className="mt-6 font-display text-4xl">€{p.price}</p>
      </section>
      <p className="mt-8 leading-relaxed text-muted-foreground">{p.description}</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="eyebrow">For you if</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">{p.forYouIf.map((x) => <li key={x}>— {x}</li>)}</ul>
        </div>
        <div>
          <p className="eyebrow">You'll practise</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">{p.outcomes.map((x) => <li key={x}>— {x}</li>)}</ul>
        </div>
      </div>

      <div className="mt-10">
        <p className="eyebrow">Day by day</p>
        <ol className="mt-3 divide-y divide-border border-y border-border">
          {p.curriculum.map((t, i) => (
            <li key={t} className="flex gap-4 py-3 text-sm">
              <span className="w-12 shrink-0 text-muted-foreground">Day {i + 1}</span>
              <span className="min-w-0">{t}</span>
              {i + 1 === p.sample.day && <span className="ml-auto shrink-0 text-xs text-muted-foreground">Free sample</span>}
            </li>
          ))}
        </ol>
      </div>
      {p.note && <p className="mt-4 text-xs text-muted-foreground">{p.note}</p>}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link to="/shop/$slug/sample" params={{ slug: p.slug }} className="btn-primary">Try Day {p.sample.day} free →</Link>
        <button onClick={() => setTried(true)} className="btn-ghost">Buy · €{p.price}</button>
      </div>
      {tried && (
        <p role="status" className="mt-3 text-sm text-muted-foreground">
          Checkout isn't open yet — no payment was taken. Try the free sample lesson in the meantime.
        </p>
      )}
    </Shell>
  );
}
