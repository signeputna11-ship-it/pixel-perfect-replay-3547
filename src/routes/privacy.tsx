import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Safety — The Self-Belief Lab" },
      { name: "description", content: "What The Self-Belief Lab collects, and how to use these exercises safely." },
      { property: "og:title", content: "Privacy & Safety — The Self-Belief Lab" },
      { property: "og:description", content: "Private lesson reflections, browser progress and clear consent for questions shared with Signe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

const sections: [string, string][] = [
  ["Your reflections and progress", "Audit answers, lesson reflections and exercises stay in page memory and disappear when you leave. Only non-sensitive completion ticks and last-lesson progress are kept in your browser."],
  ["Course questions", "Questions entered into the course helper are sent to Lovable AI to answer using site information. Please do not include private journal writing or sensitive health details. They are not stored in this app unless you deliberately submit a question for Signe with your email and consent. Those submissions are stored privately in Lovable Cloud for Signe to review. Automated email notifications are not enabled."],
  ["Sample booking calendar", "The booking page is a demonstration, not a real calendar. Your intake details stay in memory, are cleared on completion, and are not sent or saved. No appointment is reserved."],
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
