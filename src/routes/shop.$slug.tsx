import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { getProduct } from "@/lib/products";
import { EXERCISES } from "@/lib/exercises";
import { useProgress } from "@/lib/progress";
import portrait from "@/assets/DSC01766.jpg.asset.json";

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
        { property: "og:description", content: p?.headline ?? "A Signe Coach programme." },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ProductPage,
});

const FAQ = (days: number): [string, string][] => [
  ["How do I get access?", "Checkout isn't open yet. When it is, you'll create an account and your programme will appear in your dashboard straight after a confirmed payment. Day 1 is free to try now."],
  ["How long do I have access?", "The intended plan is ongoing access to the programme you buy. Signe will confirm the final terms before sales open."],
  ["What's the refund policy?", "Not yet published. Signe is finalising refund and digital-content withdrawal terms, and they'll be shown here before checkout opens."],
  ["Will it work on my phone?", "Yes. Lessons work in any modern browser on phone, tablet or computer. There's nothing to install."],
  ["Is this therapy?", "No. This is an educational, RTT-informed self-reflection programme, not individual RTT therapy, diagnosis or treatment. If you're struggling, please speak to a qualified professional."],
  ["What if a lesson brings up something difficult?", `Every one of the ${days} lessons has optional skip and pause controls and simple grounding guidance. You never have to finish an exercise.`],
];

function ProductPage() {
  const p = getProduct(Route.useLoaderData().slug)!;
  const { progress } = useProgress();
  const [open, setOpen] = useState<number | null>(0);
  const [faq, setFaq] = useState<number | null>(null);
  const [tried, setTried] = useState(false);
  const done = progress.completed[p.slug] ?? [];
  const resume = progress.last?.slug === p.slug;
  const kinds = [...new Set(p.curriculum.map((d) => d.exercise))];

  const cta = (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={() => setTried(true)} className="btn-primary">Get Access · €{p.price}</button>
        <Link to="/shop/$slug/sample" params={{ slug: p.slug }} className="btn-ghost">
          {resume ? "Resume Day 1" : "Try Day 1 free"}
        </Link>
      </div>
      {tried && (
        <p role="status" className="mt-3 text-sm text-muted-foreground">
          Checkout isn't open yet, so no payment can be taken. You can try Day 1 for free in the meantime.
        </p>
      )}
    </div>
  );

  return (
    <Shell>
      <Link to="/shop" className="text-sm text-muted-foreground hover:underline">← All programmes</Link>
      <section className={`${p.color} mt-6 p-8 fade-up`}>
        <p className="eyebrow text-forest">{p.name} · {p.format}</p>
        <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{p.headline}</h1>
        <p className="mt-4 leading-relaxed">{p.description}</p>
        <p className="mt-6 font-display text-4xl">€{p.price}</p>
        <p className="mt-1 text-sm">Self-guided · {p.days} days · {p.minutes}</p>
      </section>
      <div className="mt-6">{cta}</div>

      {done.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between text-xs text-muted-foreground"><span className="eyebrow">Your progress</span><span>{done.length}/{p.days} days</span></div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-forest" style={{ width: `${(done.length / p.days) * 100}%` }} /></div>
        </div>
      )}

      <section className="mt-14">
        <p className="eyebrow">Who it's for</p>
        <p className="mt-3 font-display text-2xl leading-snug">{p.audience}</p>
        <ul className="mt-6 space-y-3">
          {p.forYouIf.map((x) => <li key={x} className="border-l-2 border-blush pl-4 leading-relaxed">{x}</li>)}
        </ul>
      </section>

      <section className="mt-14">
        <p className="eyebrow">What you'll learn and practise</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {p.outcomes.map((x) => <li key={x} className="card-soft p-5 text-sm leading-relaxed">{x}</li>)}
        </ul>
      </section>

      <section id="curriculum" className="mt-14 scroll-mt-6">
        <p className="eyebrow">Day by day</p>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {p.curriculum.map((d, i) => {
            const isOpen = open === i;
            return (
              <div key={d.title}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`day-${i}`}
                  className="grid w-full grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3 py-4 text-left"
                >
                  <span className="text-xs text-muted-foreground">Day {i + 1}</span>
                  <span className="font-display text-xl leading-snug">{d.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {done.includes(i + 1) ? "✓ Done" : i === 0 ? "Free" : "🔒"}
                  </span>
                </button>
                {isOpen && (
                  <div id={`day-${i}`} className="pb-5 pl-[4.25rem] text-sm leading-relaxed">
                    <p>{d.summary}</p>
                    <p className="mt-1 text-muted-foreground">Exercise: {EXERCISES[d.exercise].name}</p>
                    {i === 0 ? (
                      <Link to="/shop/$slug/sample" params={{ slug: p.slug }} className="mt-3 inline-block underline underline-offset-4">Open Day 1 →</Link>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">Unlocks with full access.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {p.note && <p className="mt-4 text-xs text-muted-foreground">{p.note}</p>}
      </section>

      <section className="mt-14">
        <p className="eyebrow">What's included</p>
        <ul className="mt-4 space-y-4 text-sm leading-relaxed">
          <li><strong className="font-medium">{p.days} written lessons.</strong> Each has a short explanation, a realistic example, three reflection questions, a balanced belief and one real-life action.</li>
          <li><strong className="font-medium">Interactive exercises:</strong> {kinds.map((k) => EXERCISES[k].name).join(", ")}. Each one has an example you can load, skip controls and a summary.</li>
          <li><strong className="font-medium">Copy or download</strong> your reflections from any lesson as a text file.</li>
          <li><strong className="font-medium">Progress tracking</strong> so you can see which days you've completed.</li>
          <li className="text-muted-foreground">Guided audio and downloadable worksheets aren't included yet. They'll be added once Signe has recorded and created them.</li>
        </ul>
      </section>

      <section className="mt-14 grid gap-0 sm:grid-cols-[1fr_1.4fr]">
        <img src={portrait.url} alt="Signe smiling with a cup of coffee" className="aspect-square w-full object-cover sm:aspect-auto sm:h-full" />
        <div className="bg-forest p-8 text-primary-foreground">
          <p className="eyebrow text-primary-foreground/70">Created by</p>
          <h2 className="mt-3 font-display text-3xl">Signe</h2>
          <p className="mt-1 text-sm opacity-80">Certified Rapid Transformational Therapy Practitioner</p>
          <p className="mt-4 text-sm leading-relaxed opacity-90">
            Signe combines RTT training with years as a digital strategist working alongside ambitious women. Her
            programmes are practical, kind and honest about what self-reflection can and can't do.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <p className="eyebrow">Questions</p>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {FAQ(p.days).map(([q, a], i) => (
            <div key={q}>
              <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i} className="flex w-full justify-between gap-4 py-4 text-left">
                <span className="font-medium">{q}</span><span aria-hidden className="shrink-0">{faq === i ? "–" : "+"}</span>
              </button>
              {faq === i && <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className={`${p.color} mt-14 p-8`}>
        <h2 className="font-display text-3xl leading-tight">{p.name}</h2>
        <p className="mt-1">{p.tagline}</p>
        <p className="mt-4 font-display text-3xl">€{p.price}</p>
        <div className="mt-5">{cta}</div>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        This programme is educational self-development. It is not therapy, diagnosis or medical advice, and it doesn't
        guarantee any particular outcome.
      </p>
    </Shell>
  );
}
