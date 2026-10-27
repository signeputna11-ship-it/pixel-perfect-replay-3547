import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="h-2 bg-forest" />
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-forest font-display text-lg leading-none text-primary-foreground">
            S<span className="-ml-0.5 mt-2 text-base">C</span>
          </span>
          <span className="hidden font-display text-2xl leading-none sm:inline">Signe <em>Coach</em></span>
        </Link>
        <nav className="flex items-center gap-4 text-sm sm:gap-6">
          <Link to="/audit" className="hover:underline underline-offset-4">Audit</Link>
          <Link to="/shop" className="hover:underline underline-offset-4">Programmes</Link>
          <Link to="/coaching" className="hidden hover:underline underline-offset-4 sm:inline">Coaching</Link>
        </nav>
      </header>
      <div className="mx-auto max-w-5xl px-6"><div className="h-px bg-forest" /></div>
      <main className="mx-auto max-w-2xl px-6 pb-16 pt-6">{children}</main>
      <footer className="mx-auto max-w-5xl border-t border-border px-6 py-8 text-center text-xs leading-relaxed text-muted-foreground">
        Educational self-reflection, not a diagnostic assessment or a substitute for mental health care.
      </footer>
    </div>
  );
}

export function FoundingCircle() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [tried, setTried] = useState(false);
  return (
    <section className="mt-16 rounded-2xl bg-primary p-8 text-primary-foreground">
      <span className="inline-block rounded-full bg-butter px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-forest">
        Demo · not yet collecting signups
      </span>
      <h2 className="mt-5 font-display text-4xl leading-tight">Join the Founding Circle</h2>
      <p className="mt-3 text-sm leading-relaxed opacity-80">
        A forthcoming seven-day guided experience to explore your pattern more deeply. Your result above is yours
        regardless — joining is entirely optional.
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setTried(true);
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-full border border-primary-foreground/30 bg-transparent px-5 py-3 text-sm placeholder:text-primary-foreground/50 focus:border-blush focus:outline-none"
        />
        <label className="flex items-start gap-3 text-xs leading-relaxed opacity-80">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[var(--gold)]" />
          Optional: I'd like to receive emails from Signe about the Founding Circle. I can unsubscribe anytime.
        </label>
        <button type="submit" disabled={!consent} className="btn-gold w-full disabled:opacity-40">
          Request a place
        </button>
        {tried && (
          <p role="status" className="text-xs text-blush">
            This is a prototype — nothing was submitted or saved, and no email will be sent.
          </p>
        )}
      </form>
    </section>
  );
}
