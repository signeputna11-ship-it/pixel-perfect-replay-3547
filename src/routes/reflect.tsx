import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FoundingCircle, Shell } from "@/components/Shell";

export const Route = createFileRoute("/reflect")({
  head: () => ({
    meta: [
      { title: "Reflection Exercise — The Self-Belief Lab" },
      { name: "description", content: "A guided exercise to examine an automatic thought and choose a balanced alternative." },
      { property: "og:title", content: "Reflection Exercise — The Self-Belief Lab" },
      { property: "og:description", content: "Reframe one automatic thought in five gentle steps." },
    ],
  }),
  component: Reflect,
});

const STEPS = [
  { key: "situation", label: "The situation", hint: "What happened? Keep it factual.", ph: "e.g. A prospect asked for my rates on a call." },
  { key: "thought", label: "The automatic thought", hint: "What went through your mind?", ph: "e.g. They'll think I'm too expensive." },
  { key: "for", label: "Evidence for", hint: "What supports this thought?", ph: "e.g. One client once negotiated down." },
  { key: "against", label: "Evidence against", hint: "What doesn't fit it?", ph: "e.g. My last three clients accepted without hesitation." },
  { key: "balanced", label: "A balanced alternative", hint: "A fairer, kinder way to see it.", ph: "e.g. My rate reflects my results; the right clients see that." },
  { key: "action", label: "One small next action", hint: "Something doable within a day or two.", ph: "e.g. Send the proposal at my full rate tomorrow." },
] as const;

type Key = (typeof STEPS)[number]["key"];

function Reflect() {
  // Kept in memory only — never stored or sent anywhere.
  const [v, setV] = useState<Record<Key, string>>({ situation: "", thought: "", for: "", against: "", balanced: "", action: "" });
  const [copied, setCopied] = useState(false);
  const done = STEPS.every((s) => v[s.key].trim());
  const summary = STEPS.map((s) => `${s.label}:\n${v[s.key].trim()}`).join("\n\n");

  return (
    <Shell>
      <section className="pt-8 fade-up">
        <p className="eyebrow">Reflection exercise</p>
        <h1 className="mt-5 font-display text-4xl leading-tight">Look at one thought, gently.</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your answers stay on this device only and disappear when you leave the page.
        </p>
        <div className="mt-10 space-y-8">
          {STEPS.map((s, i) => (
            <label key={s.key} className="block">
              <span className="font-display text-xl">
                <span className="mr-2 rounded-sm bg-butter px-1.5">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{s.hint}</span>
              <textarea
                rows={2}
                value={v[s.key]}
                onChange={(e) => setV({ ...v, [s.key]: e.target.value })}
                placeholder={s.ph}
                className="field mt-3"
              />
            </label>
          ))}
        </div>

        {done && (
          <div className="card-soft mt-12 fade-up">
            <p className="eyebrow">Your summary</p>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed">{summary}</pre>
            <button
              className="btn-primary mt-6"
              onClick={async () => {
                await navigator.clipboard.writeText(summary);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? "Copied ✓" : "Copy summary"}
            </button>
          </div>
        )}
        {!done && <p className="mt-10 text-sm text-muted-foreground">Complete all six steps to see your summary.</p>}
      </section>
      <FoundingCircle />
    </Shell>
  );
}
