import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import portrait from "@/assets/DSC01766.jpg.asset.json";
import laughing from "@/assets/DSC01921.jpg.asset.json";
import sunlit from "@/assets/DSC02285.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Signe Coach — Stop editing yourself. Start backing yourself." },
      { name: "description", content: "Private RTT and coaching for women exploring their voice, boundaries and self-trust, alongside The Self-Belief Lab's self-guided programmes." },
      { property: "og:title", content: "The Self-Belief Lab by Signe Coach" },
      { property: "og:description", content: "Stop editing yourself. Start backing yourself. Private RTT and coaching for women." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Shell mainClassName="max-w-5xl">
      <section className="home-hero grid items-center gap-10 pb-4 pt-8 md:grid-cols-[1.35fr_1fr] md:gap-14 md:pb-8 md:pt-14 fade-up">
        <div>
          <p className="text-xs text-muted-foreground">Private RTT & Coaching for Women</p>
          <h1 className="mt-6 font-display text-[3.5rem] leading-[1.03] tracking-normal sm:text-7xl lg:text-[5.5rem]">
            Stop editing yourself.<br /><em>Start backing yourself.</em>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-[1.8] text-muted-foreground">
            For the moments when you know what you want to say, but find yourself rewriting the message, shrinking your needs, or wondering whether it is ‘too much.’ This is private space to come back to your voice, your boundaries, and your inner trust.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <Button asChild className="discovery-cta h-auto min-h-16 w-full whitespace-normal rounded-full px-7 py-5 text-base sm:w-auto">
              <a href="https://signecoach.com" target="_blank" rel="noreferrer">
                Book Your Discovery Call <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="link" className="h-auto whitespace-normal px-0 py-2 text-sm">
              <Link to="/audit">Discover your self-belief pattern <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>
          <p className="mt-6 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">Certified RTT Practitioner <span aria-hidden="true"> · </span> Private 1:1 Support <span aria-hidden="true"> · </span> Online Sessions</p>
        </div>
        <div className="relative mx-auto w-full max-w-md md:mx-0">
          <div className="absolute -right-2 -top-3 h-full w-full bg-blush md:-right-3 md:-top-4" aria-hidden />
          <img src={portrait.url} alt="Signe smiling with a cup of coffee" fetchPriority="high" className="relative aspect-[4/5] w-full object-cover" />
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          ["01", "Answer ten questions", "On pricing, visibility, boundaries, praise, rest and more.", "bg-blush"],
          ["02", "See your pattern", "A gentle, non-diagnostic reflection with one practical step.", "bg-powder"],
          ["03", "Reflect", "A short guided exercise to reframe one automatic thought.", "bg-butter"],
        ].map(([n, t, d, bg]) => (
          <div key={n} className={`${bg} p-6`}>
            <p className="font-display text-2xl">{n}</p>
            <h3 className="mt-6 font-display text-2xl">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 grid gap-0 sm:grid-cols-2">
        <div className="bg-forest p-10 text-primary-foreground">
          <p className="font-display text-4xl leading-tight">A softer place.<br />An honest voice.</p>
          <p className="mt-6 font-display text-xl italic leading-snug opacity-90">
            Recognition without shame. Insight without diagnosis. Choice without pressure.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <img src={laughing.url} alt="Signe laughing outdoors" className="h-full min-h-64 w-full object-cover" />
          <img src={sunlit.url} alt="Signe in the sunshine" className="h-full min-h-64 w-full object-cover" />
        </div>
      </section>
    </Shell>
  );
}
