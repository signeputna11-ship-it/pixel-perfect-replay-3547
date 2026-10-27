import { useState } from "react";
import type { Exercise, Lesson } from "@/lib/products";
import { AudioSlot } from "@/components/AudioSlot";

function ExerciseBlock({ ex }: { ex: Exercise }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [scale, setScale] = useState(5);
  const [items, setItems] = useState<string[]>(ex.kind === "list" ? Array(ex.count).fill("") : []);
  const [pick, setPick] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  const ready =
    ex.kind === "reframe" ? a.trim() && b.trim() : ex.kind === "scale" ? a.trim() : items.some((i) => i.trim());

  return (
    <div className="mt-4 card-soft">
      <p className="eyebrow">Exercise</p>
      <p className="mt-3 leading-relaxed">{ex.prompt}</p>

      {ex.kind === "reframe" && (
        <div className="mt-4 space-y-3">
          <textarea rows={2} className="field" value={a} onChange={(e) => setA(e.target.value)} placeholder={ex.thoughtPlaceholder} aria-label="Automatic thought" />
          <textarea rows={2} className="field" value={b} onChange={(e) => setB(e.target.value)} placeholder={ex.balancedPlaceholder} aria-label="Balanced thought" />
        </div>
      )}
      {ex.kind === "scale" && (
        <div className="mt-4 space-y-4">
          <input className="field" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} placeholder="Your intended rate, e.g. 2800" aria-label="Your intended rate in euros" />
          <div>
            <input type="range" min={1} max={10} value={scale} onChange={(e) => setScale(+e.target.value)} className="w-full accent-[var(--forest)]" aria-label="Steadiness" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{ex.low}</span><span className="font-medium text-foreground">{scale}/10</span><span>{ex.high}</span>
            </div>
          </div>
        </div>
      )}
      {ex.kind === "list" && (
        <div className="mt-4 space-y-3">
          {items.map((v, i) => (
            <input key={i} className="field" value={v} onChange={(e) => setItems(items.map((x, j) => (j === i ? e.target.value : x)))} placeholder={i === 0 ? ex.placeholder : `${i + 1}.`} aria-label={`Item ${i + 1}`} />
          ))}
        </div>
      )}

      <button onClick={() => setShow(true)} disabled={!ready} className="btn-ghost mt-5 w-full disabled:opacity-40">
        See my reflection
      </button>

      {show && ready && (
        <div role="status" className="mt-5 bg-blush p-6 fade-up">
          {ex.kind === "reframe" && (
            <div className="space-y-4">
              <div><p className="eyebrow text-forest">The old story</p><p className="mt-1 line-through decoration-forest/40">{a}</p></div>
              <div><p className="eyebrow text-forest">A more balanced view</p><p className="mt-1 font-display text-2xl leading-snug">{b}</p></div>
              <p className="text-xs">Both can feel true. You're simply practising giving the balanced view equal airtime.</p>
            </div>
          )}
          {ex.kind === "scale" && (
            <div className="space-y-3">
              <p className="eyebrow text-forest">Your practice script</p>
              <p className="font-display text-2xl leading-snug">"My fee for this is €{a.replace(/[^\d.,]/g, "")}. It includes everything we discussed."</p>
              <p className="text-sm">
                {scale <= 4
                  ? "That felt shaky, and that's useful to know. Say the script slowly five more times, then pause and stay quiet afterwards."
                  : scale <= 7
                    ? "Steadier than you might think. Practise once more, then stop talking after the number."
                    : "Steady. Notice what helped, so you can come back to it before your next call."}
              </p>
            </div>
          )}
          {ex.kind === "list" && (
            <div className="space-y-3">
              <p className="eyebrow text-forest">Choose one to focus on today</p>
              {items.filter((i) => i.trim()).map((v, i) => (
                <button key={i} onClick={() => setPick(i)} className={`option ${pick === i ? "option-active" : ""}`}>{v}</button>
              ))}
              {pick !== null && <p className="text-sm">Lovely. Keep this one in mind as you take today's action.</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function LessonView({ lesson }: { lesson: Lesson }) {
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <article className="fade-up">
      <p className="eyebrow">Day {lesson.day}</p>
      <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{lesson.title}</h1>
      <div className="mt-6"><AudioSlot title={`Day ${lesson.day} guided audio`} /></div>
      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
        {lesson.intro.map((p) => <p key={p}>{p}</p>)}
      </div>
      <div className="mt-6 border-l-2 border-forest pl-5 text-sm italic leading-relaxed">{lesson.example}</div>

      <div className="mt-10 card-soft border-0 bg-powder text-navy">
        <p className="eyebrow text-navy">Reflect</p>
        <p className="mt-3 font-display text-2xl leading-snug">{lesson.reflection}</p>
        <textarea rows={3} className="field mt-4" placeholder="Write freely — this stays on your screen only" />
      </div>

      <ExerciseBlock ex={lesson.exercise} />

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
          Preview only: nothing you wrote is saved or sent anywhere.
        </p>
      )}
    </article>
  );
}
