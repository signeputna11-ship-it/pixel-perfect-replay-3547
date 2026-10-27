import selfWorth from "@/assets/shop-self-worth.jpg";
import money from "@/assets/shop-money.jpg";
import confidence from "@/assets/shop-confidence.jpg";
import relationships from "@/assets/shop-relationships.jpg";

type EditorialCover = {
  theme: string;
  collection: string;
  headline: string;
  emphasis: string;
  image: string;
  alt: string;
  caption: string;
  description: string;
};

export const SHOP_EDITORIAL: Record<string, EditorialCover> = {
  "self-worth-reset": {
    theme: "worth", collection: "The self-worth collection",
    headline: "You were", emphasis: "always enough.", image: selfWorth,
    alt: "Editorial illustration of a woman reflecting in her journal by a sunlit window",
    caption: "A softer place to begin",
    description: "Practise self-validation, soften the need for approval and hold boundaries with more ease.",
  },
  "money-belief-reset": {
    theme: "money", collection: "The money collection",
    headline: "What is your", emphasis: "work worth?", image: money,
    alt: "Editorial illustration of a sunlit workspace with a notebook, laptop and yellow flower",
    caption: "Value your work. Find your words.",
    description: "Explore your money beliefs and practise clearer conversations about pricing, payment and value.",
  },
  "unapologetically-confident": {
    theme: "confidence", collection: "The confidence collection",
    headline: "It's your turn", emphasis: "to be seen.", image: confidence,
    alt: "Editorial illustration of a poised woman in a tailored blazer against a powder-blue wall",
    caption: "Take up your own space",
    description: "Build self-trust, speak up with clarity and take practical steps towards being more visible.",
  },
  "stop-chasing-love": {
    theme: "love", collection: "The relationship collection",
    headline: "Choose", emphasis: "yourself, too.", image: relationships,
    alt: "Editorial illustration of an open personal journal with pink roses in morning light",
    caption: "Closeness without losing yourself",
    description: "Recognise overgiving, name your needs and practise choosing relationships with mutual care.",
  },
};