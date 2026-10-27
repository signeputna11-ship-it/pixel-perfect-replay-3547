import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { PRODUCTS } from "@/lib/products";
import { ShopCover } from "@/components/ShopCover";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import "@/components/shop.css";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "The Programme Collection — Signe Coach | The Self-Belief Lab" },
      { name: "description", content: "Four guided experiences for the woman you're becoming. Explore self-worth, money beliefs, confidence and relationships, from €29, with free Day 1 previews." },
      { property: "og:title", content: "Four ways to go deeper — Signe Coach" },
      { property: "og:description", content: "A collection of guided experiences for the woman you're becoming. Discover your programme and try a free first lesson." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <Shell mainClassName="max-w-5xl">
      <div className="shop-editorial">
        <section aria-labelledby="collection-title">
          <div className="shop-intro">
            <p className="text-xs uppercase text-muted-foreground">The Self-Belief Lab · The programme collection</p>
            <h1 id="collection-title" className="mt-4 font-display">Four ways to <em>go deeper.</em></h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">A collection of guided experiences for the woman you're becoming.</p>
          </div>
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 sm:gap-y-12">
            {PRODUCTS.map((product, index) => <ShopCover key={product.slug} product={product} index={index} />)}
          </div>
        </section>
        <section className="shop-audit flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center" aria-labelledby="audit-title">
          <div>
            <p className="text-xs uppercase text-muted-foreground">A little clarity before you begin</p>
            <h2 id="audit-title" className="mt-3 max-w-md font-display text-3xl leading-tight">Start with the free Self-Belief Audit</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Notice your pattern. Find a thoughtful place to start.</p>
          </div>
          <Button asChild size="lg" className="shrink-0 rounded-full shadow-none">
            <Link to="/audit">Take the free audit <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </section>
        </div>
    </Shell>
  );
}
