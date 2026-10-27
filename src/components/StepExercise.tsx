import { useState } from "react";
import { EXERCISES, type ExerciseKind } from "@/lib/exercises";

/** Reusable step-by-step exercise. Values live in the parent (memory only). */
export function StepExercise({
  kind,
  values,
  onChange,
}: {
  kind: ExerciseKind;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const def = EXERCISES[kind];
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const done = step >= def.steps.length;
  const s = def.steps[step];
  const set = (i: number, v: string) => onChange(def.steps.map((_, j) => (j === i ? v : values[j] ?? "")));

  if (skipped)
    return (
      <div className="mt-4 card-soft">
        <p className="eyebrow">Exercise · {def.name}</p>
        <p className="mt-3 text-sm text-muted-foreground">You skipped this exercise. That's completely fine.</p>
        <button onClick={() => setSkipped(false)} className="mt-3 text-sm underline underline-offset-4">Return to the exercise</button>
      </div>
    );

  return (
    <section aria-labelledby="ex-title" className="mt-4 card-soft">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <p id="ex-title" className="eyebrow">Exercise · {def.name}</p>
        <button
          onClick={() => onChange(def.steps.map((x) => x.demo))}
          className="shrink-0 text-xs underline underline-offset-4"
        >
          Fill with example
        </button>
      </div>
      <p className="mt-3 leading-relaxed">{def.intro}</p>

      <ol className="mt-5 flex gap-1.5" aria-label="Exercise steps">
        {def.steps.map((x, i) => (
          <li key={x.label} className="flex-1">
            <button
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}: ${x.label}`}
              aria-current={i === step ? "step" : undefined}
              className={`block h-1.5 w-full rounded-full ${i < step || done ? "bg-forest" : i === step ? "bg-blush" : "bg-muted"}`}
            />
          </li>
        ))}
      </ol>

      {!done && s ? (
        <div key={step} className="mt-5 fade-up">
          <label htmlFor={`ex-${step}`} className="block font-display text-2xl leading-snug">
            {step + 1}. {s.label}
          </label>
          <p className="mt-1 text-sm text-muted-foreground">{s.hint}</p>
          <textarea
            id={`ex-${step}`}
            rows={3}
            className="field mt-3"
            value={values[step] ?? ""}
            onChange={(e) => set(step, e.target.value)}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {step > 0 && <button onClick={() => setStep(step - 1)} className="btn-ghost px-5 py-2.5">Back</button>}
            <button onClick={() => setStep(step + 1)} className="btn-primary px-5 py-2.5">
              {step + 1 === def.steps.length ? "See summary" : "Next"}
            </button>
            <button onClick={() => setStep(step + 1)} className="px-3 py-2.5 text-sm text-muted-foreground underline underline-offset-4">
              Skip this step
            </button>
          </div>
        </div>
      ) : (
        <div role="status" className="mt-5 bg-blush p-6 fade-up">
          <p className="eyebrow text-forest">Your {def.name.toLowerCase()}</p>
          <dl className="mt-4 space-y-4">
            {def.steps.map((x, i) => (
              <div key={x.label}>
                <dt className="text-xs uppercase tracking-[0.12em]">{x.label}</dt>
                <dd className={`mt-1 ${i === def.steps.length - 1 ? "font-display text-2xl leading-snug" : ""}`}>
                  {values[i]?.trim() || <span className="opacity-60">Skipped</span>}
                </dd>
              </div>
            ))}
          </dl>
          <button onClick={() => setStep(0)} className="mt-5 text-sm underline underline-offset-4">Edit answers</button>
        </div>
      )}

      <button onClick={() => setSkipped(true)} className="mt-5 block text-xs text-muted-foreground underline underline-offset-4">
        Skip this exercise
      </button>
    </section>
  );
}
