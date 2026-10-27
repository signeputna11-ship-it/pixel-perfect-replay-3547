// Non-sensitive completion progress only. Never store reflection text here.
import { useCallback, useEffect, useState } from "react";

const KEY = "sbl-progress-v1";
export type Progress = { completed: Record<string, number[]>; last?: { slug: string; day: number } };

function read(): Progress {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "");
    if (v && typeof v === "object" && v.completed) return v as Progress;
  } catch {}
  return { completed: {} };
}

export function useProgress() {
  const [p, setP] = useState<Progress>({ completed: {} });
  useEffect(() => setP(read()), []);
  const save = useCallback((fn: (p: Progress) => Progress) => {
    setP((cur) => {
      const next = fn(cur);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);
  return {
    progress: p,
    markComplete: (slug: string, day: number) =>
      save((c) => ({ ...c, completed: { ...c.completed, [slug]: [...new Set([...(c.completed[slug] ?? []), day])] } })),
    markIncomplete: (slug: string, day: number) =>
      save((c) => ({ ...c, completed: { ...c.completed, [slug]: (c.completed[slug] ?? []).filter((d) => d !== day) } })),
    visit: (slug: string, day: number) => save((c) => ({ ...c, last: { slug, day } })),
    reset: () => save(() => ({ completed: {} })),
  };
}

export function summaryText(title: string, sections: [string, string][]) {
  return [title, "", ...sections.filter(([, v]) => v.trim()).flatMap(([k, v]) => [`${k}:`, v, ""])].join("\n");
}
