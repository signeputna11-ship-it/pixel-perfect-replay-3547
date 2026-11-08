import { z } from "zod";
import { getProduct } from "@/lib/products";
import { courseFAQ } from "@/lib/course-faq";

export const helperQuestionSchema = z.object({
  slug: z.string().refine((slug) => Boolean(getProduct(slug)), "Unknown programme"),
  question: z.string().trim().min(3).max(700),
}).strict();
export const handoffSchema = helperQuestionSchema.extend({ email: z.string().trim().email().max(254), consent: z.literal(true) });

export function courseHelperFacts(slug: string) {
  const p = getProduct(slug);
  if (!p) return undefined;
  return {
    name: p.name, priceEUR: p.price, plannedDays: p.days, dailyCommitment: p.minutes,
    format: "Self-guided, written, browser-based educational self-reflection",
    audience: p.audience, challenges: p.forYouIf, practice: p.outcomes,
    curriculum: p.curriculum,
    availability: "Only Day 1 is currently written and available free. Later days are planned and locked; checkout is not open. No purchase or paid access is available.",
    resources: "Day 1 includes written content, editable reflections, an interactive exercise, optional skip and pause controls, copy/text download, and completion tracking. Audio and downloadable workbooks are not available.",
    privacy: "Lesson writing stays in page memory. Only non-sensitive completion progress is stored in the browser. Course-helper questions are sent to Lovable AI. Questions are stored for Signe only after explicit submission with an email address and consent.",
    faq: courseFAQ(p.days),
  };
}