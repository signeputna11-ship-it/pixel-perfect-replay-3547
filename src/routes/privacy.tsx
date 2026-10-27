import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Safety — The Self-Belief Lab" },
      { name: "description", content: "What The Self-Belief Lab collects, and how to use these exercises safely." },
      { property: "og:title", content: "Privacy & Safety — The Self-Belief Lab" },
      { property: "og:description", content: "Educational self-reflection. Nothing you write is saved in this version." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

const sections: [string, string][] = [
  ["What we collect", "In this preview version, nothing. Your audit answers, reflections and exercises stay on your screen and disappear when you leave the page. Nothing is stored or sent."],
  ["Emails", "Joining the Founding Circle is optional and separate from seeing your result. The form is a demo and does not collect emails yet."],
  ["Educational, not clinical", "The Self-Belief Lab offers educational self-reflection. It is not a diagnosis, mental health treatment, or a guarantee of any result. The patterns are starting points for curiosity, not labels."],
  ["Looking after yourself", "You can stop any exercise at any time. If something feels overwhelming, ground yourself: feet on the floor, name five things you can see, and breathe out slowly. If you are in crisis, please contact local emergency services or a mental health professional."],
];

function Privacy() {
  return (
    <Shell>
      <p className="eyebrow">Privacy & safety</p>
      <h1 className="mt-5 font-display text-5xl leading-tight">Your reflections are yours.</h1>
      <div className="mt-10 space-y-8">
        {sections.map(([t, d]) => (
          <section key={t}>
            <h2 className="font-display text-2xl">{t}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{d}</p>
          </section>
        ))}
      </div>
    </Shell>
  );
}
