import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { LessonView } from "@/components/Lesson";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/shop/$slug_/sample")({
  loader: ({ params }) => {
    if (!getProduct(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const title = p ? `Free lesson: ${p.sample.title} — ${p.name}` : "Free lesson — The Self-Belief Lab";
    return {
      meta: [
        { title },
        { name: "description", content: p ? `Try Day ${p.sample.day} of ${p.name} free.` : "A free sample lesson." },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.sample.affirmation ?? "A free sample lesson." },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: Sample,
});

function Sample() {
  const p = getProduct(Route.useLoaderData().slug)!;
  return (
    <Shell>
      <Link to="/shop/$slug" params={{ slug: p.slug }} className="text-sm text-muted-foreground hover:underline">
        ← {p.name}
      </Link>
      <div className="mt-6"><LessonView product={p} /></div>
    </Shell>
  );
}
