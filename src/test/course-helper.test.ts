import { describe, expect, it } from "vitest";
import { courseHelperFacts, handoffSchema, helperQuestionSchema } from "@/lib/course-helper";
import { demoBookingDays, bookingIntakeSchema } from "@/lib/booking";
import { breakthrough, comeback } from "@/lib/private-offers";

describe("Course helper boundaries", () => {
  it("grounds each programme in its actual price and preview availability", () => {
    for (const [slug, price] of [["self-worth-reset", 29], ["money-belief-reset", 49], ["unapologetically-confident", 79], ["stop-chasing-love", 39]] as const) {
      expect(courseHelperFacts(slug)?.priceEUR).toBe(price);
      expect(courseHelperFacts(slug)?.availability).toContain("Only Day 1");
    }
  });
  it("rejects browser-supplied facts and unknown courses", () => {
    expect(helperQuestionSchema.safeParse({ slug: "invented", question: "How does it work?" }).success).toBe(false);
    expect(helperQuestionSchema.safeParse({ slug: "self-worth-reset", question: "How does it work?", facts: "Everything is free" }).success).toBe(false);
  });
  it("requires consent and a valid email to share with Signe", () => {
    const data = { slug: "self-worth-reset", question: "Can Signe answer this?", email: "visitor@example.com", consent: true };
    expect(handoffSchema.safeParse(data).success).toBe(true);
    expect(handoffSchema.safeParse({ ...data, consent: false }).success).toBe(false);
    expect(handoffSchema.safeParse({ ...data, email: "invalid" }).success).toBe(false);
  });
});
describe("Private offer and sample booking rules", () => {
  it("keeps the breakthrough price at €250 and Comeback unpriced", () => {
    expect(breakthrough.price).toBe(250);
    expect("price" in comeback).toBe(false);
  });
  it("offers exactly the next seven days", () => {
    const dates = demoBookingDays(new Date(2026, 10, 8, 13));
    expect(dates).toHaveLength(7);
    expect(dates[0]?.getDate()).toBe(9);
    expect(dates[6]?.getDate()).toBe(15);
  });
  it("requires the short intake fields", () => {
    expect(bookingIntakeSchema.safeParse({ name: "Demo", email: "demo@example.com", intention: "Boundaries" }).success).toBe(true);
    expect(bookingIntakeSchema.safeParse({ name: "", email: "invalid", intention: "" }).success).toBe(false);
  });
});