import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { bookingIntakeSchema, demoBookingDays, DEMO_TIMES } from "@/lib/booking";

export const Route = createFileRoute("/booking")({ head: () => ({ meta: [
  { title: "Discovery Call — Signe Coach" }, { name: "description", content: "Explore a free 20-minute discovery call with Signe. Sample booking calendar; no real reservation is made." },
  { property: "og:title", content: "Discovery Call — Signe Coach" }, { property: "og:description", content: "A calm first conversation about private RTT and coaching." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
] }), component: Booking });

function Booking() {
  const [days, setDays] = useState<Date[]>([]);
  const [selected, setSelected] = useState<Date>();
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intention, setIntention] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => { const next = demoBookingDays(new Date()); setDays(next); setSelected(next[0]); }, []);
  const dateLabel = selected?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  return <Shell mainClassName="max-w-4xl">
    <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4" aria-hidden />Back to Signe Coach</Link>
    <p className="mt-8 text-xs text-muted-foreground">Sample calendar · No live booking</p>
    <h1 className="mt-4 font-display text-5xl leading-tight tracking-normal">A conversation, <em>not a commitment.</em></h1>
    <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">A free 20-minute discovery call to talk about what you're looking for and whether private work with Signe feels like the right fit.</p>
    {confirmed ? <section aria-live="polite" className="mt-10 border-y border-border py-10">
      <Check className="size-8" aria-hidden /><h2 className="mt-5 font-display text-3xl">Your demo selection is complete.</h2>
      <p className="mt-4">{dateLabel} at {time} · Lisbon time</p>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">No request was sent, no appointment was reserved, and your intake details were not saved. For a real enquiry, contact Signe through her website.</p>
      <div className="mt-7 flex flex-wrap gap-3"><Button asChild><a href="https://signecoach.com" target="_blank" rel="noreferrer">Contact Signe</a></Button><Button variant="outline" onClick={() => { setConfirmed(false); setTime(""); }}>Choose another time</Button></div>
    </section> : <div className="mt-10 grid gap-10 border-t border-border pt-8 md:grid-cols-2">
      <section><h2 className="font-display text-2xl">Choose a day</h2>
        {selected && days[0] && days[6] && <Calendar mode="single" required selected={selected} defaultMonth={selected} onSelect={d => { setSelected(d); setTime(""); }} disabled={[{ before: days[0] }, { after: days[6] }]} startMonth={days[0]} endMonth={days[6]} className="mt-4" />}
        <p className="mt-5 text-sm">{dateLabel}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">{DEMO_TIMES.map(t => <Button key={t} variant={time === t ? "default" : "outline"} aria-pressed={time === t} className="min-h-12" onClick={() => setTime(t)}>{t}</Button>)}</div>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Clock className="size-4" aria-hidden />20 minutes · Europe/Lisbon · Sample times</p>
      </section>
      <form className="space-y-5" onSubmit={e => { e.preventDefault(); const valid = bookingIntakeSchema.safeParse({ name, email, intention }); if (!selected || !time || !valid.success) { setError("Choose a time and complete your name, email and intention."); return; } setError(""); setName(""); setEmail(""); setIntention(""); setConfirmed(true); }}>
        <h2 className="font-display text-2xl">A little about you</h2>
        <label className="block text-sm">Your name<input className="field mt-2" required maxLength={100} autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></label>
        <label className="block text-sm">Email address<input className="field mt-2" type="email" required maxLength={254} autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="block text-sm">What would you like support with?<textarea className="field mt-2" rows={3} required maxLength={500} value={intention} onChange={e => setIntention(e.target.value)} /></label>
        <p className="text-xs leading-relaxed text-muted-foreground">This is a demo. Use example details rather than private information; nothing is sent or saved.</p>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="h-auto min-h-14 w-full whitespace-normal rounded-full py-4">Preview My Discovery Call Request</Button>
      </form>
    </div>}
  </Shell>;
}