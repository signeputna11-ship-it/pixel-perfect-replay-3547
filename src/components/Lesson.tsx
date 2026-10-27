import { useState } from "react";
import type { Lesson } from "@/lib/products";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const [scale, setScale] = useState(5);
  const ex = lesson.exercise;

  return (
    <article className="fade-up">
      <p className="eyebrow">Day {lesson.day}</p>
      <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{lesson.title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
        {lesson.intro.map((p) => <p key={p}>{p}</p>)}
      </div>
      <div className="mt-6 border-l-2 border-forest pl-5 text-sm italic leading-relaxed">{lesson.example}</div>

      <div className="mt-10 card-soft border-0 bg-powder text-navy">
        <p className="eyebrow text-navy">Reflect</p>
        <p className="mt-3 font-display text-2xl leading-snug">{lesson.reflection}</p>
        <textarea rows={3} className="field mt-4" placeholder="Write freely…" />
      </div>

      <div className="mt-4 card-soft">
        <p className="eyebrow">Exercise</p>
        <p className="mt-3 leading-relaxed">{ex.prompt}</p>
        {ex.kind === "reframe" && (
          <div className="mt-4 space-y-3">
            <textarea rows={2} className="field" placeholder={ex.thoughtPlaceholder} aria-label="Automatic thought" />
            <textarea rows={2} className="field" placeholder={ex.balancedPlaceholder} aria-label="Balanced thought" />
          </div>
        )}
        {ex.kind === "list" && (
          <div className="mt-4 space-y-3">
            {Array.from({ length: ex.count }, (_, i) => (
              <input key={i} className="field" placeholder={i === 0 ? ex.placeholder : `${i + 1}.`} aria-label={`Item ${i + 1}`} />
            ))}
          </div>
        )}
        {ex.kind === "scale" && (
          <div className="mt-4">
            <input type="range" min={1} max={10} value={scale} onChange={(e) => setScale(+e.target.value)} className="w-full accent-[var(--forest)]" aria-label="Steadiness" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{ex.low}</span><span className="font-medium text-foreground">{scale}/10</span><span>{ex.high}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 bg-forest p-8 text-primary-foreground">
        <p className="eyebrow text-primary-foreground/70">Balanced belief</p>
        <p className="mt-3 font-display text-3xl italic leading-snug">"{lesson.affirmation}"</p>
      </div>
      <div className="mt-4 card-soft border-0 bg-butter">
        <p className="eyebrow text-forest">Today's action</p>
        <p className="mt-3 leading-relaxed">{lesson.action}</p>
      </div>

      <div className="mt-8 rounded-md border border-border p-5 text-sm leading-relaxed">
        <p className="font-medium">If this feels like too much</p>
        <p className="mt-1 text-muted-foreground">
          You can stop at any point. Try grounding: feet on the floor, name five things you can see, and take three slow
          breaths, longer out than in.
        </p>
        <button onClick={() => setPaused(true)} className="mt-3 underline underline-offset-4">Pause this lesson</button>
        {paused && <p role="status" className="mt-2 text-muted-foreground">Paused. Come back whenever you're ready — nothing is lost by stepping away.</p>}
      </div>

      <button onClick={() => setDone(true)} disabled={done} className="btn-primary mt-8 w-full disabled:opacity-60">
        {done ? "Marked complete ✓" : "Mark complete"}
      </button>
      {done && (
        <p role="status" className="mt-3 text-center text-xs text-muted-foreground">
          Sample preview: your answers and progress aren't saved. Saving will come with member accounts.
        </p>
      )}
    </article>
  );
}
