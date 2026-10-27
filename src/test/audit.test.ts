import { describe, it, expect } from "vitest";
import { scoreAnswers, QUESTIONS } from "@/lib/audit";

describe("audit scoring", () => {
  it("has five questions", () => expect(QUESTIONS).toHaveLength(5));
  it("picks the majority pattern", () => {
    expect(scoreAnswers(["guard", "guard", "worth", "approval", "guard"])).toBe("guard");
  });
  it("breaks ties by fixed order", () => {
    expect(scoreAnswers(["approval", "approval", "worth", "worth", "guard"])).toBe("worth");
  });
});
