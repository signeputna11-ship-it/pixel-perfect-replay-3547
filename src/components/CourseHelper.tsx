import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { helperQuestionSchema, handoffSchema } from "@/lib/course-helper";

export function CourseHelper({ slug, name }: { slug: string; name: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answeredQuestion, setAnsweredQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [handoff, setHandoff] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const controller = useRef<AbortController | undefined>(undefined);
  useEffect(() => () => controller.current?.abort(), []);
  async function ask() {
    const parsed = helperQuestionSchema.safeParse({ slug, question });
    if (!parsed.success) { setError("Please enter a question between 3 and 700 characters."); return; }
    const abort = new AbortController(); controller.current = abort;
    setBusy(true); setError(""); setAnswer(""); setHandoff(false); setSent(false); setAnsweredQuestion(parsed.data.question);
    try {
      const response = await fetch("/api/public/course-helper", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data), signal: abort.signal });
      if (!response.ok) { const body = await response.json(); throw new Error(body.message ?? "The helper is unavailable. Please contact Signe."); }
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No answer was received.");
      const decoder = new TextDecoder(); let buffer = "";
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n"); buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);
          if (event.type === "answer") { setAnswer(event.answer); setHandoff(event.handoff); }
          if (event.type === "error") throw new Error(event.message);
        }
      }
    } catch (err) { if (!abort.signal.aborted) setError(err instanceof Error ? err.message : "The helper is unavailable."); else setError("Stopped. No answer was completed."); }
    finally { setBusy(false); controller.current = undefined; }
  }
  async function sendToSigne() {
    const parsed = handoffSchema.safeParse({ slug, question: answeredQuestion || question, email, consent });
    if (!parsed.success) { setError("Enter your email and agree to share this question with Signe."); return; }
    setSending(true); setError("");
    try { const response = await fetch("/api/public/course-question", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) }); const data = await response.json(); if (!response.ok) throw new Error(data.message); setSent(true); setEmail(""); }
    catch (err) { setError(err instanceof Error ? err.message : "Your question could not be submitted."); }
    finally { setSending(false); }
  }
  return <section className="mt-14 border-y border-border py-8" aria-labelledby="helper-heading">
    <div className="flex items-center gap-3"><MessageCircle className="size-5" aria-hidden /><p className="text-xs text-muted-foreground">Lovable AI · Programme questions</p></div>
    <h2 id="helper-heading" className="mt-4 font-display text-3xl tracking-normal">Is this the right next step for you?</h2>
    <form className="mt-6" onSubmit={e => { e.preventDefault(); void ask(); }}>
      <label htmlFor="course-question" className="text-sm">Your question about {name}</label>
      <textarea id="course-question" className="field mt-2" rows={3} maxLength={700} required disabled={busy} value={question} onChange={e => setQuestion(e.target.value)} placeholder="How much time will I need each day?" />
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Your question is sent to Lovable AI. Please leave out sensitive personal or health information.</p>
      <div className="mt-4 flex gap-3"><Button type="submit" disabled={busy || !question.trim()}><Send aria-hidden />Ask about this programme</Button>{busy && <Button type="button" variant="outline" onClick={() => controller.current?.abort()}><Square aria-hidden />Stop</Button>}</div>
    </form>
    {busy && <p role="status" className="mt-5 text-sm text-muted-foreground">Checking the programme information…</p>}
    {answer && <div className="mt-6 border-l-2 border-blush pl-5" aria-live="polite"><p className="text-xs text-muted-foreground">Answer based on this programme's details and FAQ</p><p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{answer}</p></div>}
    {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
    {(handoff || (answer && !busy)) && <div className="mt-6">
      {sent ? <p role="status" className="text-sm">Your question has been stored privately for Signe to review. No email notification has been sent.</p> : <form className="space-y-4" onSubmit={e => { e.preventDefault(); void sendToSigne(); }}>
        <h3 className="font-display text-2xl">{handoff ? "This one is for Signe." : "Prefer to ask Signe personally?"}</h3>
        <label className="block text-sm">Your email<input type="email" required className="field mt-2" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="flex items-start gap-3 text-xs leading-relaxed"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" />I agree to share this question and my email with Signe for a personal reply.</label>
        <Button type="submit" variant="outline" disabled={sending}>{sending ? "Submitting…" : "Submit Question to Signe"}<ArrowUpRight aria-hidden /></Button>
      </form>}
    </div>}
  </section>;
}