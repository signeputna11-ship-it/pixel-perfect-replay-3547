import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import portrait from "@/assets/DSC01766.jpg.asset.json";

export const Route = createFileRoute("/coaching")({
  head: () => ({
    meta: [
      { title: "Private RTT Coaching with Signe — Signe Coach" },
      { name: "description", content: "One-to-one Rapid Transformational Therapy sessions with Signe, certified RTT practitioner." },
      { property: "og:title", content: "Private RTT Coaching with Signe" },
      { property: "og:description", content: "Personal one-to-one work, booked through signecoach.com." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Coaching,
});

function Coaching() {
  return (
    <Shell>
      <section className="grid items-center gap-10 pt-6 sm:grid-cols-[1.2fr_1fr] fade-up">
        <div>
          <p className="eyebrow">Private coaching</p>
          <h1 className="mt-5 font-display text-5xl leading-tight">Work with Signe, <em>one to one.</em></h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Signe is a certified Rapid Transformational Therapy practitioner and digital strategist. Private sessions are
            for women who want personal, focused support beyond the self-guided programmes.
          </p>
          <a href="https://signecoach.com" target="_blank" rel="noreferrer" className="btn-primary mt-8">
            Visit signecoach.com →
          </a>
        </div>
        <img src={portrait.url} alt="Signe smiling with a cup of coffee" className="aspect-[4/5] w-full object-cover" />
      </section>
      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Coaching is not a substitute for medical or mental health care. If you're in crisis, please contact local emergency
        services or a mental health professional.
      </p>
    </Shell>
  );
}
