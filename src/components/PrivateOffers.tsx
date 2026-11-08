import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { breakthrough, comeback, placeholderTestimonials } from "@/lib/private-offers";

export function PrivateOffers() {
  return <>
    <section className="mt-20 border-y border-border py-12 md:py-16">
      <p className="eyebrow">Private work with Signe</p>
      <div className="mt-5 grid gap-10 md:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="text-sm">{breakthrough.name}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-normal md:text-5xl">{breakthrough.headline}</h2>
          <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{breakthrough.description}</p>
          <ul className="mt-6 space-y-3">{breakthrough.benefits.map(b => <li key={b} className="flex gap-3 text-sm leading-relaxed"><Check className="mt-1 size-4 shrink-0" aria-hidden />{b}</li>)}</ul>
        </div>
        <div className="border-l-2 border-blush pl-6">
          <p className="font-display text-4xl">€{breakthrough.price}</p>
          <p className="mt-2 text-sm text-muted-foreground">{breakthrough.duration}</p>
          <ul className="my-6 space-y-3 text-sm">{breakthrough.includes.map(b => <li key={b}>{b}</li>)}</ul>
          <Button asChild className="discovery-cta h-auto min-h-14 w-full whitespace-normal rounded-full px-6 py-4"><Link to="/booking">Request Your Private Session <ArrowUpRight aria-hidden /></Link></Button>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Not sure yet? Start with a free 20-minute discovery call. Signe will confirm availability and fit personally.</p>
        </div>
      </div>
    </section>
    <section className="mt-16 bg-blush px-6 py-10 md:p-12">
      <p className="text-xs">{comeback.duration}</p>
      <h2 className="mt-4 font-display text-3xl tracking-normal">{comeback.name}</h2>
      <p className="mt-3 max-w-xl font-display text-4xl leading-tight tracking-normal md:text-5xl">{comeback.headline}</p>
      <p className="mt-6 max-w-2xl leading-relaxed">{comeback.description}</p>
      <ul className="mt-7 grid gap-4 text-sm sm:grid-cols-2">{comeback.includes.map(b => <li key={b} className="flex gap-3"><Check className="size-4 shrink-0" aria-hidden />{b}</li>)}</ul>
      <Button asChild className="mt-8 h-auto min-h-14 whitespace-normal rounded-full px-7 py-4"><Link to="/booking">Request an Application Call <ArrowUpRight aria-hidden /></Link></Button>
      <p className="mt-4 text-xs">A personal conversation first. Your support plan and availability are discussed with Signe.</p>
    </section>
    <section className="mt-16 py-6">
      <p className="eyebrow">Illustrative stories · Not client reviews</p>
      <h2 className="mt-4 font-display text-4xl tracking-normal">Small moments. Meaningful steps.</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">{placeholderTestimonials.map(t => <figure key={t.theme} className="border-t border-border pt-5"><figcaption className="text-xs text-muted-foreground">Placeholder · {t.theme}</figcaption><blockquote className="mt-4 font-display text-2xl leading-relaxed tracking-normal">“{t.quote}”</blockquote><p className="mt-4 text-xs text-muted-foreground">Illustrative example, not a reported client result.</p></figure>)}</div>
    </section>
    <p className="mt-8 text-xs leading-relaxed text-muted-foreground">RTT and coaching are not a substitute for medical or psychiatric treatment. These offers do not promise a particular result.</p>
  </>;
}