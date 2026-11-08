"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { categoryIds, categoryMedia } from "@/lib/content/categories";
import { useDictionary } from "@/lib/i18n/use-dictionary";
import { siteConfig } from "@/lib/site-config";

export function Categories() {
  const { categories } = useDictionary();

  return (
    <section
      id="categories"
      aria-labelledby="categories-title"
      className="shell scroll-mt-8 py-section"
    >
      <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <div className="lg:col-span-7">
          <p className="eyebrow text-olive">{categories.eyebrow}</p>
          <h2 id="categories-title" className="mt-5 text-headline">
            {categories.title}
          </h2>
        </div>
        <p className="max-w-[44ch] text-muted-foreground lg:col-span-4 lg:col-start-9">
          {categories.intro}
        </p>
      </div>

      <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-y-20">
        {categoryIds.map((id, index) => {
          const copy = categories.items[id];
          const media = categoryMedia[id];
          return (
            <li key={id}>
              <article>
                <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                  <Image
                    src={media.image}
                    alt={copy.alt}
                    placeholder="blur"
                    fill
                    sizes="(min-width: 1440px) 440px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: media.focus }}
                  />
                </div>
                <div className="mt-5 flex items-baseline gap-4 border-t border-border pt-4">
                  <span aria-hidden className="font-serif text-sm text-olive tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-title">{copy.title}</h3>
                    <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {copy.description}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="mt-section flex flex-col gap-8 border-t border-border pt-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-lead max-w-[48ch] text-foreground">{categories.pricingNote}</p>
        <a href={siteConfig.inquiryHref} className={buttonVariants({ size: "lg", className: "self-start lg:self-auto" })}>
          {categories.pricingCta}
          <ArrowRight
            aria-hidden
            className="transition-transform duration-300 ease-studio group-hover/button:translate-x-0.5"
          />
        </a>
      </div>
    </section>
  );
}
