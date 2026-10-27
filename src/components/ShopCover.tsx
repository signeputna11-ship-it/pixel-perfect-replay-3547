import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { SHOP_EDITORIAL } from "@/lib/shop-editorial";

export function ShopCover({ product, index }: { product: Product; index: number }) {
  const cover = SHOP_EDITORIAL[product.slug];
  if (!cover) return null;

  return (
    <Link to="/shop/$slug" params={{ slug: product.slug }} className={`editorial-product editorial-${cover.theme} group`} aria-label={`Explore ${product.name}, ${product.days} days, €${product.price}`}>
      <div className="editorial-cover">
        <div className="cover-masthead"><span>Signe Coach / The Self-Belief Lab</span><span>0{index + 1}</span></div>
        <p className="cover-collection">{cover.collection}</p>
        <p className="cover-headline">{cover.headline}<br /><em>{cover.emphasis}</em></p>
        <div className="cover-photo">
          <img src={cover.image} alt={cover.alt} width={960} height={1200} loading={index < 2 ? "eager" : "lazy"} />
        </div>
        <div className="cover-footnote"><span>{cover.caption}</span><span aria-hidden="true">SC</span></div>
      </div>
      <div className="editorial-details">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{product.days} days · Self-guided</span><span>Free Day 1 preview</span>
        </div>
        <h2 className="mt-3 font-display text-3xl leading-tight">{product.name}</h2>
        <p className="product-description mt-3 text-sm leading-relaxed text-muted-foreground">{cover.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="font-display text-3xl">€{product.price}</span>
          <span className="explore-label flex items-center gap-2 text-sm font-medium">Explore the Programme <ArrowUpRight size={18} aria-hidden="true" /></span>
        </div>
      </div>
    </Link>
  );
}