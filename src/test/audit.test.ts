import { describe, it, expect } from "vitest";
import { scoreAnswers, QUESTIONS, RECOMMENDATIONS, PATTERN_ORDER } from "@/lib/audit";
import { PRODUCTS, getProduct } from "@/lib/products";

describe("audit scoring", () => {
  it("has ten questions", () => expect(QUESTIONS).toHaveLength(10));
  it("picks the majority pattern", () => {
    expect(scoreAnswers(["guard", "guard", "worth", "approval", "guard"])).toBe("guard");
  });
  it("breaks ties by fixed order", () => {
    expect(scoreAnswers(["approval", "approval", "worth", "worth", "guard"])).toBe("worth");
  });
  it("recommends only real products", () => {
    PATTERN_ORDER.forEach((p) => RECOMMENDATIONS[p].forEach((s) => expect(getProduct(s)).toBeDefined()));
  });
});

describe("products", () => {
  it("has the four priced products", () => {
    expect(Object.fromEntries(PRODUCTS.map((p) => [p.slug, p.price]))).toEqual({
      "self-worth-reset": 29,
      "money-belief-reset": 49,
      "unapologetically-confident": 79,
      "stop-chasing-love": 39,
    });
  });
  it("course lengths match the brief", () => {
    expect(getProduct("unapologetically-confident")!.days).toBe(14);
    expect(getProduct("self-worth-reset")!.days).toBe(7);
  });
});

describe("courses", () => {
  it("each curriculum has one entry per day", () => {
    PRODUCTS.forEach((p) => expect(p.curriculum).toHaveLength(p.days));
  });
  it("free sample is Day 1 with three reflection questions", () => {
    PRODUCTS.forEach((p) => {
      expect(p.sample.day).toBe(1);
      expect(p.sample.reflections).toHaveLength(3);
    });
  });
  it("uses all six exercise types across the courses", () => {
    expect(new Set(PRODUCTS.flatMap((p) => p.curriculum.map((d) => d.exercise))).size).toBe(6);
  });
});
