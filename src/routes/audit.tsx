import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { QUESTIONS, scoreAnswers, type PatternId } from "@/lib/audit";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "The Audit — The Self-Belief Lab" },
      { name: "description", content: "Five reflective questions on pricing, visibility, achievement, approval and success." },
      { property: "og:title", content: "The Self-Belief Audit" },
      { property: "og:description", content: "Five questions to discover your self-belief pattern." },
    ],
  }),
  component: Audit,
});

function Audit() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PatternId[]>([]);
  const navigate = useNavigate();
  const q = QUESTIONS[step]!;

  const choose = (p: PatternId) => {
    const next = [...answers.slice(0, step), p];
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else navigate({ to: "/result/$pattern", params: { pattern: scoreAnswers(next) } });
  };

  return (
    <Shell>
      <div className="pt-6">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="eyebrow">{q.topic}</span>
          <span>
            {step + 1} / {QUESTIONS.length}
          </span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-gold transition-all duration-500" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
        <div key={step} className="fade-up">
          <h1 className="mt-12 font-display text-3xl leading-snug sm:text-4xl">{q.prompt}</h1>
          <div className="mt-8 space-y-3">
            {q.options.map((o) => (
              <button
                key={o.label}
                onClick={() => choose(o.pattern)}
                className={`option ${answers[step] === o.pattern ? "option-active" : ""}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="mt-8 text-sm text-muted-foreground underline-offset-4 hover:underline">
            ← Back
          </button>
        )}
      </div>
    </Shell>
  );
}
