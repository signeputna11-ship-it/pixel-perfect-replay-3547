import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { EXERCISES } from "@/lib/exercises";
import { summaryText, useProgress } from "@/lib/progress";
import { AudioSlot } from "@/components/AudioSlot";
import { StepExercise } from "@/components/StepExercise";

export function LessonView({ product }: { product: Product }) {
  const lesson = product.sample;
  const { progress, markComplete, markIncomplete, visit } = useProgress();
  const [refl, setRefl] = useState<string[]>(lesson.reflections.map(() => ""));
  const [ex, setEx] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState("");
  const done = (progress.completed[product.slug] ?? []).includes(lesson.day);
  const count = (progress.completed[product.slug] ?? []).length;

  useEffect(() => visit(product.slug, lesson.day), [product.slug, lesson.day]); // eslint-disable-line react-hooks/exhaustive-deps

  const def = EXERCISES[lesson.exercise];
  const text = () =>
    summaryText(`${product.name} — Day ${lesson.day}: ${lesson.title}`, [
      ...lesson.reflections.map((q, i) => [q, refl[i] ?? ""] as [string, string]),
      ...def.steps.map((s, i) => [`${def.name} — ${s.label}`, ex[i] ?? ""] as [string, string]),
    ]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text());
      setCopied("Copied to your clipboard.");
    } catch {
      setCopied("Copying isn't available here. Try Download instead.");
    }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([text()], { type: "text/plain" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${product.slug}-day-${lesson.day}.txt` });
    a.click();
    URL.revokeObjectURL(url);
    setCopied("Downloaded as a text file.");
  };

  return (
    <article className="fade-up">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="eyebrow">Day {lesson.day} of {product.days}</span>
        <span>{count}/{product.days} complete</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={product.days} aria-valuenow={count} aria-label="Course progress">
        <div className="h-full bg-forest transition-all" style={{ width: `${(count / product.days) * 100}%` }} />
      </div>

      <h1 className="mt-8 font-display text-4xl leading-tight sm:text-5xl">{lesson.title}</h1>
      <div className="mt-6"><AudioSlot title={`Day ${lesson.day} guided audio`} /></div>
      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
        {lesson.intro.map((p) => <p key={p}>{p}</p>)}
      </div>
      <div className="mt-6 border-l-2 border-forest pl-5 text-sm italic leading-relaxed">{lesson.example}</div>

      <section className="mt-10 card-soft border-0 bg-powder text-navy">
        <p className="eyebrow text-navy">Reflect · all optional</p>
        <div className="mt-4 space-y-5">
          {lesson.reflections.map((q, i) => (
            <div key={q}>
              <label htmlFor={`r-${i}`} className="block font-display text-xl leading-snug">{q}</label>
              <textarea id={`r-${i}`} rows={3} className="field mt-2" value={refl[i]} onChange={(e) => setRefl(refl.map((x, j) => (j === i ? e.target.value : x)))} placeholder="Write freely, or skip" />
            </div>
          ))}
        </div>
      </section>

      <StepExercise kind={lesson.exercise} values={ex} onChange={setEx} />

      <div className="mt-4 bg-forest p-8 text-primary-foreground">
        <p className="eyebrow text-primary-foreground/70">Balanced belief</p>
        <p className="mt-3 font-display text-3xl italic leading-snug">"{lesson.affirmation}"</p>
      </div>
      <div className="mt-4 card-soft border-0 bg-butter">
        <p className="eyebrow text-forest">Today's action</p>
        <p className="mt-3 leading-relaxed">{lesson.action}</p>
      </div>

      <section className="mt-4 card-soft">
        <p className="eyebrow">Keep your reflections</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          What you write stays on this screen only. It isn't saved anywhere and disappears when you leave the page. Copy
          or download it if you'd like to keep it.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={copy} className="btn-ghost px-5 py-2.5">Copy summary</button>
          <button onClick={download} className="btn-ghost px-5 py-2.5">Download .txt</button>
        </div>
        {copied && <p role="status" className="mt-2 text-xs text-muted-foreground">{copied}</p>}
      </section>

      <div className="mt-8 rounded-md border border-border p-5 text-sm leading-relaxed">
        <p className="font-medium">If this feels like too much</p>
        <p className="mt-1 text-muted-foreground">
          You can stop at any point. Try grounding: feet on the floor, name five things you can see, and take three slow
          breaths, longer out than in.
        </p>
        <button onClick={() => setPaused(true)} className="mt-3 underline underline-offset-4">Pause this lesson</button>
        {paused && <p role="status" className="mt-2 text-muted-foreground">Paused. Come back whenever you're ready — nothing is lost by stepping away.</p>}
      </div>

      <button
        onClick={() => (done ? markIncomplete(product.slug, lesson.day) : markComplete(product.slug, lesson.day))}
        aria-pressed={done}
        className="btn-primary mt-8 w-full"
      >
        {done ? "Completed ✓ · tap to undo" : "Mark lesson complete"}
      </button>
      <p className="mt-2 text-center text-xs text-muted-foreground">Only your tick is remembered in this browser — never what you wrote.</p>

      <nav aria-label="Lesson navigation" className="mt-8 grid grid-cols-2 gap-3 text-sm">
        <Link to="/shop/$slug" params={{ slug: product.slug }} className="btn-ghost px-4">← Course overview</Link>
        <Link to="/shop/$slug" params={{ slug: product.slug }} hash="curriculum" className="btn-ghost px-4">
          Day {lesson.day + 1} 🔒
        </Link>
      </nav>
    </article>
  );
}
