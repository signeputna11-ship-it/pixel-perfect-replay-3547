// Edit courses, curricula and lessons here.
export type Exercise =
  | { kind: "reframe"; prompt: string; thoughtPlaceholder: string; balancedPlaceholder: string }
  | { kind: "scale"; prompt: string; low: string; high: string }
  | { kind: "list"; prompt: string; count: number; placeholder: string };

export type Lesson = {
  day: number;
  title: string;
  intro: string[];
  example: string;
  reflection: string;
  exercise: Exercise;
  affirmation: string;
  action: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  days: number;
  format: string;
  tagline: string;
  description: string;
  forYouIf: string[];
  outcomes: string[];
  curriculum: string[];
  note?: string;
  color: "bg-blush" | "bg-powder" | "bg-butter" | "bg-forest";
  sample: Lesson;
};

export const PRODUCTS: Product[] = [
  {
    slug: "self-worth-reset",
    name: "The Self-Worth Reset",
    price: 29,
    days: 7,
    format: "Seven-day course",
    tagline: "Stop waiting for permission to value yourself.",
    description:
      "Seven short daily lessons on self-validation, boundaries, approval-seeking and self-compassion — practical enough to fit around a full working day.",
    forYouIf: [
      "You replay conversations wondering if you said the wrong thing",
      "Compliments slide off, criticism sticks",
      "Saying no feels like a risk to the relationship",
    ],
    outcomes: [
      "Notice the moment you start outsourcing your worth",
      "Practise validating your own effort without needing an audience",
      "Hold one boundary kindly and clearly",
    ],
    curriculum: [
      "Where worth gets outsourced",
      "The inner reviewer",
      "Self-validation in practice",
      "Boundaries without apology",
      "Approval-seeking at work",
      "Self-compassion that still has standards",
      "Your worth, in your words",
    ],
    color: "bg-blush",
    sample: {
      day: 1,
      title: "Where worth gets outsourced",
      intro: [
        "Most of us learned early that approval felt safe. Praise for good grades, being 'easy', being helpful. It made sense then — and it can quietly become the way we measure our worth as adults.",
        "Today isn't about finding where it came from. It's simply about noticing when you hand your sense of worth to someone else's reaction.",
      ],
      example:
        "Lena, a brand consultant, sends a proposal and then checks her inbox every ten minutes. Before the client replies, she has already decided the silence means the work is weak.",
      reflection: "In the past week, whose reaction did you wait for before you felt okay about your work?",
      exercise: {
        kind: "reframe",
        prompt: "Write one automatic thought you had while waiting, then a more balanced version.",
        thoughtPlaceholder: "e.g. They haven't replied, so they must hate it.",
        balancedPlaceholder: "e.g. Silence usually means busy. I know this proposal is thoughtful.",
      },
      affirmation: "My work can be valuable before anyone confirms it.",
      action: "Next time you send something important, close your inbox for one hour afterwards.",
    },
  },
  {
    slug: "money-belief-reset",
    name: "The Money Belief Reset",
    price: 49,
    days: 7,
    format: "Seven-day course",
    tagline: "Price, receive and negotiate from steadiness.",
    description:
      "Seven lessons on money beliefs, visibility, pricing, receiving payments and negotiating value — with pricing exercises built around real professional moments.",
    forYouIf: [
      "You discount before the client has asked",
      "Sending an invoice makes your stomach drop",
      "You know your rates are low but raising them feels impossible",
    ],
    outcomes: [
      "Name the money beliefs you're working from",
      "Rehearse stating your price without softening",
      "Prepare for a negotiation with a clear walk-away point",
    ],
    curriculum: [
      "Your money story, in the present tense",
      "The discount reflex",
      "Pricing from value, not fear",
      "Receiving without apology",
      "Visibility and being paid",
      "Negotiating your value",
      "Your financial self-concept",
    ],
    note: "This course works with beliefs and behaviour. It doesn't promise any financial result.",
    color: "bg-butter",
    sample: {
      day: 3,
      title: "Pricing from value, not fear",
      intro: [
        "When fear sets the price, we tend to guess what the client will accept and then shave a little more off, just in case.",
        "Pricing from value starts with what the work does for them, and then asks what number you could say calmly and stand behind.",
      ],
      example:
        "Amira quotes €1,800 for a website she believes is worth €2,800. She tells herself it's 'strategic', but really she's afraid the client will say no.",
      reflection: "Think of your last quote. What number did you first think of — and what did you actually send?",
      exercise: {
        kind: "scale",
        prompt: "Say your intended rate out loud. How steady did you feel saying it?",
        low: "Shaky",
        high: "Steady",
      },
      affirmation: "I can name a fair price and let the other person decide.",
      action: "Write your rate on a sticky note and say it aloud three times before your next sales call.",
    },
  },
  {
    slug: "unapologetically-confident",
    name: "Unapologetically Confident",
    price: 79,
    days: 14,
    format: "Fourteen-day interactive programme",
    tagline: "Be seen, speak clearly, lead with conviction.",
    description:
      "A fourteen-day programme for professionals and entrepreneurs covering visibility, assertive communication, leadership, decision-making, handling criticism and communicating your value.",
    forYouIf: [
      "You hold back ideas in meetings until someone else says them",
      "Feedback can knock you off course for days",
      "You'd like to be visible without performing",
    ],
    outcomes: [
      "Speak up with a simple, repeatable structure",
      "Respond to criticism without collapsing or defending",
      "Describe your value in two clear sentences",
    ],
    curriculum: [
      "What confidence actually is",
      "Visibility you can sustain",
      "The first sentence",
      "Assertive, not aggressive",
      "Saying no at work",
      "Decisions without total certainty",
      "Leading when you feel unsure",
      "Handling criticism",
      "Separating feedback from worth",
      "Your value statement",
      "Taking up space in the room",
      "Being disliked, and being fine",
      "Confidence under pressure",
      "Your next visible step",
    ],
    color: "bg-powder",
    sample: {
      day: 3,
      title: "The first sentence",
      intro: [
        "Often the hardest part of speaking up isn't the idea — it's the first sentence. We wait for the perfect opening and the moment passes.",
        "Today you'll prepare a few openers you can reach for, so starting becomes easier than staying quiet.",
      ],
      example:
        "In a leadership meeting, Sofia has a concern about the timeline. She waits for a pause, rehearses her wording, and then hears a colleague raise the same point.",
      reflection: "Where this week did you have something to say and keep it to yourself?",
      exercise: {
        kind: "list",
        prompt: "Write three openers you could use to enter a conversation.",
        count: 3,
        placeholder: "e.g. I'd like to add a different angle…",
      },
      affirmation: "My perspective is a contribution, not an interruption.",
      action: "Use one of your openers in your next meeting, within the first ten minutes.",
    },
  },
  {
    slug: "stop-chasing-love",
    name: "Stop Chasing Love",
    price: 39,
    days: 7,
    format: "Seven-day guided experience",
    tagline: "Choose relationships that feel reciprocal.",
    description:
      "Seven days exploring relationship patterns, external validation, boundaries, reciprocity, personal values and self-respect. No labels — just patterns worth noticing.",
    forYouIf: [
      "You often give more than you receive",
      "Someone's distance makes you try harder",
      "You lose track of your own needs in relationships",
    ],
    outcomes: [
      "Notice the moments you start chasing",
      "Clarify the values you want a relationship to honour",
      "Practise one boundary that protects your self-respect",
    ],
    curriculum: [
      "Noticing the chase",
      "Validation from the outside in",
      "What reciprocity feels like",
      "Your relationship values",
      "Boundaries as self-respect",
      "Staying with yourself",
      "Choosing, not chasing",
    ],
    note: "This is not a clinical assessment, and it doesn't assign attachment styles.",
    color: "bg-blush",
    sample: {
      day: 1,
      title: "Noticing the chase",
      intro: [
        "Chasing can look like over-texting, over-giving, or shrinking your needs so someone stays close. It usually comes from a wish for connection, which is a very human thing to want.",
        "Today's lesson is about noticing it, not judging it.",
      ],
      example:
        "When Mia's partner goes quiet, she plans a special evening and apologises for things she didn't do — then feels drained and unseen.",
      reflection: "When someone pulls back, what do you usually do first?",
      exercise: {
        kind: "list",
        prompt: "Name three things you'd like to receive in a relationship, not just give.",
        count: 3,
        placeholder: "e.g. Being asked how my day really was",
      },
      affirmation: "I can want closeness and still keep my own centre.",
      action: "The next time you feel the urge to chase, wait twenty minutes and check in with your body first.",
    },
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
