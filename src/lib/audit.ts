// Edit questions, patterns and scoring here.
export type PatternId = "perfectionist" | "worth" | "approval" | "guard";

// Tie-break order: earlier wins when scores are equal.
export const PATTERN_ORDER: PatternId[] = ["perfectionist", "worth", "approval", "guard"];

export const PATTERNS: Record<
  PatternId,
  { name: string; tagline: string; explanation: string; question: string; action: string }
> = {
  perfectionist: {
    name: "The Perfectionist",
    tagline: "Ready when it's flawless.",
    explanation:
      "You may hold your work to a standard that keeps moving. High standards are a strength, yet they can quietly delay launches, raise the bar for 'good enough', and make rest feel unearned.",
    question: "What would 'good enough to share' look like this week?",
    action: "Pick one piece of work you've been polishing and release it at 80% within 48 hours.",
  },
  worth: {
    name: "The Worth Questioner",
    tagline: "Is this really worth that much?",
    explanation:
      "You may find it easier to value others' work than your own. This often shows up around pricing, negotiating and accepting praise — a habit of discounting before anyone has asked you to.",
    question: "If a trusted friend offered your exact service, what would you tell her to charge?",
    action: "Write your next quote at your intended rate and send it without an apology or discount.",
  },
  approval: {
    name: "The Approval Seeker",
    tagline: "What will they think?",
    explanation:
      "You may be highly tuned to others' reactions. That sensitivity makes you a thoughtful leader, and it can also make visibility, saying no, or sharing strong opinions feel risky.",
    question: "Whose opinion are you most trying to protect yourself from — and do they buy from you?",
    action: "Share one clear opinion publicly this week without asking anyone to review it first.",
  },
  guard: {
    name: "The Success Guard",
    tagline: "Not too much, not too fast.",
    explanation:
      "You may notice a pull to slow down just as things start going well. Part of you might link bigger success with more pressure, visibility or loss — so it keeps things 'safe'.",
    question: "What do you imagine would change — for better or worse — if this year went brilliantly?",
    action: "List three things success would give you, and one small step toward it you can take today.",
  },
};

export type Question = {
  topic: string;
  prompt: string;
  options: { label: string; pattern: PatternId }[];
};

export const QUESTIONS: Question[] = [
  {
    topic: "Pricing",
    prompt: "When it's time to name your price, what usually happens?",
    options: [
      { label: "I wait until my offer feels completely polished", pattern: "perfectionist" },
      { label: "I lower it before the client even reacts", pattern: "worth" },
      { label: "I worry they'll think less of me for asking", pattern: "approval" },
      { label: "I hesitate, as if more income brings more pressure", pattern: "guard" },
    ],
  },
  {
    topic: "Visibility",
    prompt: "You have an idea worth sharing publicly. What holds you back?",
    options: [
      { label: "It isn't refined enough yet", pattern: "perfectionist" },
      { label: "Who am I to say this?", pattern: "worth" },
      { label: "People might judge or disagree", pattern: "approval" },
      { label: "If it lands, more will be expected of me", pattern: "guard" },
    ],
  },
  {
    topic: "Achievement",
    prompt: "After reaching a milestone, you most often…",
    options: [
      { label: "Notice what could have been better", pattern: "perfectionist" },
      { label: "Put it down to luck or timing", pattern: "worth" },
      { label: "Wait to hear how others react", pattern: "approval" },
      { label: "Feel uneasy and quietly ease off", pattern: "guard" },
    ],
  },
  {
    topic: "Approval",
    prompt: "A client gives mixed feedback. Your first reaction is…",
    options: [
      { label: "Rework everything until it's flawless", pattern: "perfectionist" },
      { label: "Wonder if I'm really good at this", pattern: "worth" },
      { label: "Replay it, worrying they're disappointed", pattern: "approval" },
      { label: "Feel relieved to scale back expectations", pattern: "guard" },
    ],
  },
  {
    topic: "Fear of success",
    prompt: "Imagine your business doubled next year. What surfaces first?",
    options: [
      { label: "I'd need to get every system perfect first", pattern: "perfectionist" },
      { label: "I'm not sure I'd deserve it", pattern: "worth" },
      { label: "Others might see me differently", pattern: "approval" },
      { label: "It might cost me freedom or relationships", pattern: "guard" },
    ],
  },
];

/** Deterministic: highest count wins; ties resolved by PATTERN_ORDER. */
export function scoreAnswers(answers: PatternId[]): PatternId {
  const counts = Object.fromEntries(PATTERN_ORDER.map((p) => [p, 0])) as Record<PatternId, number>;
  answers.forEach((a) => (counts[a] += 1));
  return PATTERN_ORDER.reduce((best, p) => (counts[p] > counts[best] ? p : best), "perfectionist" as PatternId);
}

export function isPatternId(v: string): v is PatternId {
  return (PATTERN_ORDER as string[]).includes(v);
}
