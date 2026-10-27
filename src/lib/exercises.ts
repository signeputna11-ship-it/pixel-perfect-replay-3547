// The six reusable exercise types. Edit labels and hints here.
export type ExerciseKind = "belief-map" | "evidence" | "boundary" | "money-talk" | "visibility" | "values";

export type ExerciseDef = {
  name: string;
  intro: string;
  steps: { label: string; hint: string; demo: string }[];
};

export const EXERCISES: Record<ExerciseKind, ExerciseDef> = {
  "belief-map": {
    name: "Belief mapping",
    intro: "Slow one moment down, so you can see the link between a thought and what you did next.",
    steps: [
      { label: "Situation", hint: "What happened, in plain facts?", demo: "A client didn't reply to my proposal for three days." },
      { label: "Automatic thought", hint: "The first thing your mind said.", demo: "They think it's too expensive and I'm not good enough." },
      { label: "Emotion", hint: "What did you feel, and how strongly?", demo: "Anxious, about 7 out of 10." },
      { label: "Behaviour", hint: "What did you do, or avoid doing?", demo: "I drafted an email offering a discount." },
      { label: "Alternative response", hint: "What could you try next time?", demo: "Wait until the agreed follow-up date and ask a simple question." },
    ],
  },
  evidence: {
    name: "Evidence check",
    intro: "Treat one belief like a hypothesis, not a fact, and look at what's really there.",
    steps: [
      { label: "Belief", hint: "Write it as you'd say it to yourself.", demo: "People like me don't earn well." },
      { label: "Evidence supporting it", hint: "What makes it feel true?", demo: "My family always struggled; my first business barely broke even." },
      { label: "Evidence challenging it", hint: "What doesn't fit the belief?", demo: "I doubled my income last year; two clients renewed at a higher rate." },
      { label: "A more balanced belief", hint: "Something you can actually believe.", demo: "Money has been hard before, and I'm learning to earn well now." },
    ],
  },
  boundary: {
    name: "Boundary practice",
    intro: "Draft a boundary before you need it, so it's easier to say kindly and clearly.",
    steps: [
      { label: "Situation", hint: "Where does this keep happening?", demo: "Clients message me on WhatsApp late in the evening." },
      { label: "What I need", hint: "Name the need, not the complaint.", demo: "Evenings that are truly off, so I can rest." },
      { label: "My respectful boundary statement", hint: "Short, warm, and clear.", demo: "I reply to messages between 9 and 5 on weekdays. I'll get back to you tomorrow morning." },
    ],
  },
  "money-talk": {
    name: "Money conversation",
    intro: "Rehearse a price conversation on paper, so the real one feels familiar.",
    steps: [
      { label: "My current price", hint: "The number, with no softening.", demo: "€2,400 for a six-week programme." },
      { label: "My rationale", hint: "What it includes and the value for them.", demo: "Six sessions, a custom plan, and support between calls." },
      { label: "Client objection", hint: "The one you dread most.", demo: "That's more than I was expecting to spend." },
      { label: "Confident response", hint: "Calm, curious, no apology.", demo: "That makes sense. What were you hoping to invest, and what matters most to you in the result?" },
    ],
  },
  visibility: {
    name: "Visibility challenge",
    intro: "Run a small, real experiment and compare your prediction with what actually happened.",
    steps: [
      { label: "Action", hint: "One visible step you'll take.", demo: "Post a LinkedIn update about a project I'm proud of." },
      { label: "Predicted concern", hint: "What are you afraid will happen?", demo: "Silence, or people thinking I'm showing off." },
      { label: "What actually happened", hint: "Fill this in afterwards — skip it for now if needed.", demo: "Twelve reactions and one message from a former colleague." },
      { label: "Learning", hint: "What will you take into the next step?", demo: "My prediction was harsher than reality." },
    ],
  },
  values: {
    name: "Relationship values",
    intro: "Get clear on what you need and expect, so you can notice when a relationship honours it.",
    steps: [
      { label: "My needs", hint: "What helps you feel safe and valued?", demo: "Consistency and being asked about my day." },
      { label: "My standards", hint: "What you expect from a partner or friend.", demo: "They follow through on plans and speak kindly when we disagree." },
      { label: "My boundaries", hint: "What you won't accept any more.", demo: "I won't keep chasing someone who goes silent for days." },
      { label: "My next step", hint: "One small, concrete action.", demo: "Tell my partner I'd like us to plan one evening a week together." },
    ],
  },
};
