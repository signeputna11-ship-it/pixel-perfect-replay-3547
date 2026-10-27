// Edit courses, curricula and lessons here. Presentation lives in components.
import type { ExerciseKind } from "@/lib/exercises";

export type Lesson = {
  day: number;
  title: string;
  intro: string[];
  example: string;
  reflections: string[];
  exercise: ExerciseKind;
  affirmation: string;
  action: string;
};

export type CurriculumDay = { title: string; summary: string; exercise: ExerciseKind };

export type Product = {
  slug: string;
  name: string;
  price: number;
  days: number;
  format: string;
  minutes: string;
  tagline: string;
  headline: string;
  description: string;
  audience: string;
  forYouIf: string[];
  outcomes: string[];
  curriculum: CurriculumDay[];
  note?: string;
  color: "bg-blush" | "bg-powder" | "bg-butter";
  sample: Lesson;
};

export const PRODUCTS: Product[] = [
  {
    slug: "self-worth-reset",
    name: "The Self-Worth Reset",
    price: 29,
    days: 7,
    format: "Seven-day course",
    minutes: "15–20 minutes a day",
    tagline: "Stop waiting for permission to value yourself.",
    headline: "Your worth isn't something you have to earn.",
    description:
      "Seven short lessons on self-validation, approval-seeking, overgiving and boundaries — practical enough to fit around a full working day.",
    audience: "Women who are capable and respected at work, yet still measure their worth by output, praise or how useful they are to others.",
    forYouIf: [
      "You replay conversations wondering whether you said the wrong thing",
      "Compliments slide off, while criticism stays for days",
      "Rest feels like something you have to earn first",
      "Saying no feels like a risk to the relationship",
    ],
    outcomes: [
      "Notice the moment you start outsourcing your sense of worth",
      "Separate what you do from who you are",
      "Hold one boundary kindly, with less guilt",
      "Practise validating your own effort without needing an audience",
    ],
    curriculum: [
      { title: "How You Learned to Measure Your Worth", summary: "Map the rules you use to decide whether you're 'enough'.", exercise: "belief-map" },
      { title: "Recognising Approval-Seeking", summary: "Spot the small daily habits of waiting for a green light.", exercise: "belief-map" },
      { title: "Your Worth Beyond Achievement", summary: "Test the belief that you're only as good as your last result.", exercise: "evidence" },
      { title: "The Beliefs Behind Overgiving", summary: "Look at what you expect will happen if you give a little less.", exercise: "evidence" },
      { title: "Setting Boundaries Without Excessive Guilt", summary: "Draft one boundary and the words to hold it.", exercise: "boundary" },
      { title: "Practising Self-Validation", summary: "Build a short, honest self-acknowledgement habit.", exercise: "belief-map" },
      { title: "Your Self-Worth Commitment", summary: "Choose the beliefs and boundaries you'll carry forward.", exercise: "boundary" },
    ],
    color: "bg-blush",
    sample: {
      day: 1,
      title: "How You Learned to Measure Your Worth",
      intro: [
        "Most of us carry an unwritten scorecard. It tells us when we're allowed to feel good about ourselves: after the project is finished, after the client says thank you, after everyone else is looked after. Very few of us chose that scorecard. We picked it up, often early, by noticing what got attention and what felt safe.",
        "Perhaps you were praised for good grades, for being 'no trouble', or for helping. None of that is bad. Effort and kindness are real strengths. The difficulty comes when they quietly become the only conditions under which you're allowed to feel worthy. Then a quiet week, a mixed review or a missed target doesn't just feel disappointing. It feels like evidence about who you are.",
        "In RTT-informed work, we pay attention to the meaning we attach to experiences, because meaning drives feeling and behaviour. You don't need to dig for a single cause or relive the past to do this. Today is simply about noticing the rules you're working from now, in your adult life, with curiosity rather than judgement.",
        "Once a rule is visible, you can ask a useful question: is this still serving me? Some rules will stay. Others will be ready to soften. You'll practise that in the exercise below by mapping one recent moment from situation to response.",
      ],
      example:
        "Lena, a brand consultant, sends a proposal and then checks her inbox every ten minutes. By the afternoon she has decided the silence means the work is weak, and starts drafting a cheaper version. The client replies the next morning: they were travelling, and they're happy to go ahead.",
      reflections: [
        "Finish this sentence honestly: 'I feel good about myself when…'",
        "Whose approval did you most want growing up, and how did you try to earn it?",
        "Where in your work this week did you wait for someone else's reaction before you felt okay?",
      ],
      exercise: "belief-map",
      affirmation: "My work can be valuable before anyone confirms it.",
      action: "After you send something important today, close your inbox for one hour.",
    },
  },
  {
    slug: "money-belief-reset",
    name: "The Money Belief Reset",
    price: 49,
    days: 7,
    format: "Seven-day course",
    minutes: "20–25 minutes a day",
    tagline: "Price, receive and negotiate from steadiness.",
    headline: "Bring greater confidence to the way you earn, price and receive.",
    description:
      "Seven lessons on money messages, financial self-doubt, pricing, receiving payment and negotiating your value — with exercises built around real professional moments.",
    audience: "Self-employed women, consultants and professionals who know their rates are out of step with their expertise.",
    forYouIf: [
      "You discount before the client has asked",
      "Sending an invoice makes your stomach drop",
      "You know your rates are low but raising them feels impossible",
      "Talking about money feels more personal than it should",
    ],
    outcomes: [
      "Name the money messages you're still working from",
      "Rehearse a price conversation until it feels familiar",
      "Set clear boundaries around payment terms and scope",
      "Make your next financial decision deliberately",
    ],
    curriculum: [
      { title: "Your Earliest Money Messages", summary: "Notice what you learned about money, and check it against today.", exercise: "evidence" },
      { title: "What Money Means to You Today", summary: "Separate money as a tool from money as a judgement.", exercise: "belief-map" },
      { title: "Recognising Financial Self-Doubt", summary: "Catch the thoughts that appear right before you lower a price.", exercise: "belief-map" },
      { title: "Communicating Your Value", summary: "Describe the result you deliver in plain, confident language.", exercise: "money-talk" },
      { title: "Rehearsing Confident Price Conversations", summary: "Practise the objection you dread, on paper first.", exercise: "money-talk" },
      { title: "Boundaries Around Money", summary: "Payment terms, scope creep and late invoices.", exercise: "boundary" },
      { title: "Your Next Financial Decision", summary: "Choose one money step and test your prediction about it.", exercise: "evidence" },
    ],
    note: "This course works with beliefs and behaviour. It doesn't promise any financial result.",
    color: "bg-butter",
    sample: {
      day: 1,
      title: "Your Earliest Money Messages",
      intro: [
        "Long before you ever sent an invoice, you were learning about money. You heard how adults talked about it, or didn't. You noticed what happened when there was enough, and when there wasn't. You may have heard phrases like 'money doesn't grow on trees', 'rich people are greedy' or 'don't be pushy'.",
        "These messages weren't instructions, but many of us absorbed them as rules. They can show up decades later as a hesitation before naming a price, guilt when a client pays promptly, or a habit of over-delivering to justify what you charge.",
        "The aim today isn't to blame anyone. Your family's beliefs about money usually made sense in their circumstances. The aim is to notice which messages you're still carrying and whether they fit the woman and business you have now.",
        "A useful way to do that is an evidence check. Instead of arguing with a belief or forcing a positive one, you treat it as a hypothesis and look at what supports it and what doesn't. A more balanced belief tends to be one you can actually believe, which is what makes it useful.",
      ],
      example:
        "Amira grew up hearing that asking for money was rude. Now a web designer, she quotes €1,800 for work she believes is worth €2,800, and tells herself it's 'strategic'. When she looks closely, the real reason is the old discomfort of asking.",
      reflections: [
        "What was said about money in your home, and what was left unsaid?",
        "Which of those messages do you still hear when you set a price?",
        "If a friend charged what you'd like to charge, what would you think of her?",
      ],
      exercise: "evidence",
      affirmation: "I can name a fair price and let the other person decide.",
      action: "Write down your intended rate and say it aloud three times before your next sales conversation.",
    },
  },
  {
    slug: "unapologetically-confident",
    name: "Unapologetically Confident",
    price: 79,
    days: 14,
    format: "Fourteen-day programme",
    minutes: "20–30 minutes a day",
    tagline: "Be seen, speak clearly, lead with conviction.",
    headline: "Your expertise deserves to be seen and heard.",
    description:
      "Fourteen days on self-doubt, perfectionism, visibility, speaking up, decision-making and leading with your values — for professionals and entrepreneurs.",
    audience: "Experienced women who hold back ideas, wait to be 'ready', or shrink when the spotlight lands on them.",
    forYouIf: [
      "You hold back ideas in meetings until someone else says them",
      "Feedback can knock you off course for days",
      "You over-prepare to avoid being caught out",
      "You'd like to be visible without performing",
    ],
    outcomes: [
      "Understand your own pattern of self-doubt and perfectionism",
      "Speak up with a simple, repeatable structure",
      "Respond to disagreement and mistakes without collapsing",
      "Build a realistic 30-day confidence plan",
    ],
    curriculum: [
      { title: "Your Confidence Baseline", summary: "Where you feel steady, where you shrink, and one small test.", exercise: "visibility" },
      { title: "Understanding Self-Doubt", summary: "Map how doubt shows up before, during and after visible moments.", exercise: "belief-map" },
      { title: "Recognising Perfectionism", summary: "Test the belief that 'good enough' is risky.", exercise: "evidence" },
      { title: "Visibility and Fear of Judgement", summary: "Predict, act, compare: a small visibility experiment.", exercise: "visibility" },
      { title: "Confident Body Language", summary: "Posture, pace and pauses, practised before a real moment.", exercise: "visibility" },
      { title: "Speaking Up in Meetings", summary: "Prepare your first sentence so starting becomes easier.", exercise: "visibility" },
      { title: "Professional Self-Trust", summary: "Gather evidence that your judgement is reliable.", exercise: "evidence" },
      { title: "Asking for What You Want", summary: "A clear request for a raise, a role or resources.", exercise: "boundary" },
      { title: "Handling Disagreement", summary: "Stay steady when someone pushes back.", exercise: "belief-map" },
      { title: "Making Decisions Without Endless Reassurance", summary: "Decide with enough information, not total certainty.", exercise: "evidence" },
      { title: "Leading With Your Values", summary: "Use your values as a compass in hard calls.", exercise: "boundary" },
      { title: "Responding to Mistakes", summary: "Own it, repair it, and keep your self-respect.", exercise: "belief-map" },
      { title: "Your Visibility Challenge", summary: "One bigger visible step, with a before-and-after reflection.", exercise: "visibility" },
      { title: "Your 30-Day Confidence Plan", summary: "Choose the practices you'll keep.", exercise: "visibility" },
    ],
    color: "bg-powder",
    sample: {
      day: 1,
      title: "Your Confidence Baseline",
      intro: [
        "Confidence is often described as a feeling you either have or don't. In practice, it behaves more like a skill: it grows with repeated, manageable experiences of acting before you feel fully ready, and noticing that you coped.",
        "Most capable women aren't low in confidence everywhere. You may be calm leading your team and tense the moment you post online, or assured with clients and hesitant with senior leadership. Knowing where your confidence already holds is as useful as knowing where it wobbles.",
        "Fear of judgement is a normal human response. It doesn't mean something is wrong with you. But when it decides for you, it can keep your best work out of sight. This programme uses small, real-world experiments to gently widen the range of situations where you feel steady.",
        "Today you'll set your baseline and run your first small experiment. You'll predict what you're worried will happen, take one visible step, and later compare the prediction with reality. Over fourteen days, that gap between prediction and reality becomes some of your most convincing evidence.",
      ],
      example:
        "Sofia, a finance director, has a concern about a project timeline. She waits for the perfect pause, rehearses her wording, and then hears a colleague raise the same point to nods around the table.",
      reflections: [
        "Where do you already feel confident, and what makes those situations different?",
        "Where did you hold back this week, and what were you protecting yourself from?",
        "What would you do more of if you were a little less concerned about being judged?",
      ],
      exercise: "visibility",
      affirmation: "My perspective is a contribution, not an interruption.",
      action: "Share one idea in a meeting or message today within the first ten minutes.",
    },
  },
  {
    slug: "stop-chasing-love",
    name: "Stop Chasing Love",
    price: 39,
    days: 7,
    format: "Seven-day guided experience",
    minutes: "15–20 minutes a day",
    tagline: "Choose relationships that feel reciprocal.",
    headline: "Choose relationships where your needs matter too.",
    description:
      "Seven days exploring relationship patterns, overgiving, uncertainty, boundaries and reciprocity. No labels — just patterns worth noticing.",
    audience: "Women who give generously in love and friendship, and often end up feeling unseen or anxious about where they stand.",
    forYouIf: [
      "You often give more than you receive",
      "When someone pulls back, you try harder",
      "You lose track of your own needs in relationships",
      "You stay longer than you'd advise a friend to",
    ],
    outcomes: [
      "Recognise the moments you start chasing",
      "Name your needs, standards and boundaries",
      "Respond to uncertainty without abandoning yourself",
      "Notice what reciprocity actually feels like",
    ],
    curriculum: [
      { title: "Recognising Your Relationship Pattern", summary: "Notice what you do when closeness feels uncertain.", exercise: "values" },
      { title: "Your Needs and Expectations", summary: "Name what you need, without apology.", exercise: "values" },
      { title: "The Cost of Overgiving", summary: "Map what giving too much costs you, and why you keep doing it.", exercise: "belief-map" },
      { title: "Responding to Uncertainty", summary: "Pause the urge to chase and check what's true.", exercise: "evidence" },
      { title: "Practising Boundaries", summary: "Draft one boundary that protects your self-respect.", exercise: "boundary" },
      { title: "Recognising Reciprocity", summary: "What mutual effort looks like in your relationships.", exercise: "evidence" },
      { title: "Your Relationship Standards", summary: "Choose the standards you'll hold from here.", exercise: "values" },
    ],
    note: "This is not a clinical assessment, and it doesn't assign attachment styles.",
    color: "bg-blush",
    sample: {
      day: 1,
      title: "Recognising Your Relationship Pattern",
      intro: [
        "Chasing can be quiet. It might look like over-texting, planning everything, apologising for things you didn't do, or making yourself endlessly available. Underneath it there's usually a very human wish: to feel close, chosen and secure.",
        "Many women learn that love is something you keep by being easy, helpful or low-maintenance. That can make it hard to notice your own needs, and harder still to ask for them. When someone pulls away, the instinct is to give more, rather than to pause and ask whether the relationship is giving back.",
        "This course doesn't label you or your partner. Relationship patterns are shaped by many things, and they can change. The focus is on what you can notice and choose today, in your adult relationships.",
        "We'll start with your values: what you need, what you expect, what you won't accept any more, and one small next step. Writing them down gives you something steady to come back to when a relationship feels uncertain.",
      ],
      example:
        "When Mia's partner goes quiet for a weekend, she plans a special evening, sends three messages and apologises for 'being too much'. By Monday she feels drained and no closer to knowing what he wants.",
      reflections: [
        "When someone pulls back, what do you usually do first?",
        "What do you tend to give in relationships that you rarely receive?",
        "What would you tell a close friend who described your pattern to you?",
      ],
      exercise: "values",
      affirmation: "I can want closeness and still keep my own centre.",
      action: "Next time you feel the urge to chase, wait twenty minutes and check in with your body first.",
    },
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
