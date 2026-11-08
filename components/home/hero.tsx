"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useDictionary } from "@/lib/i18n/use-dictionary";
import { siteConfig } from "@/lib/site-config";
import heroCloset from "@/public/images/hero-closet.jpg";
import heroKitchen from "@/public/images/hero-kitchen.jpg";

export function Hero() {
  const { hero } = useDictionary();

  return (
    <section aria-labelledby="hero-title" className="shell pt-8 lg:pt-12">
      {/* Headline */}
      <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-8">
        <p className="eyebrow flex items-center gap-3 text-olive motion-safe:animate-rise lg:col-span-12">
          <span aria-hidden className="h-px w-8 shrink-0 bg-olive" />
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="text-display max-w-[17ch] hyphens-manual motion-safe:animate-rise motion-safe:[animation-delay:80ms] lg:col-span-11"
        >
          {hero.titleLead}{" "}
          <em className="font-light text-olive-deep italic">{hero.titleEmphasis}</em>
        </h1>
      </div>

      {/* Imagery + intro */}
      <div className="mt-10 grid gap-y-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:justify-between">
          <div className="space-y-8 motion-safe:animate-rise motion-safe:[animation-delay:160ms]">
            <p className="text-lead max-w-[42ch] text-muted-foreground">{hero.lead}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href={siteConfig.inquiryHref} className={buttonVariants({ size: "lg" })}>
                {hero.primaryCta}
                <ArrowRight
                  aria-hidden
                  className="transition-transform duration-300 ease-studio group-hover/button:translate-x-0.5"
                />
              </Link>
              <a href="#categories" className={buttonVariants({ variant: "link" })}>
                {hero.secondaryCta}
              </a>
            </div>
          </div>

          <figure className="hidden w-4/5 self-end motion-safe:animate-rise motion-safe:[animation-delay:320ms] lg:block">
            <div className="relative aspect-[4/3] overflow-hidden bg-linen">
              <Image
                src={heroCloset}
                alt={hero.secondaryImage.alt}
                placeholder="blur"
                fill
                sizes="(min-width: 1440px) 300px, 21vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex gap-3 text-xs text-muted-foreground">
              <span className="text-foreground tabular-nums">02</span>
              {hero.secondaryImage.caption}
            </figcaption>
          </figure>
        </div>

        <figure className="-mx-gutter sm:mx-0 lg:col-span-8 lg:row-start-1">
          <div className="relative aspect-[3/2] overflow-hidden bg-linen">
            <Image
              src={heroKitchen}
              alt={hero.mainImage.alt}
              placeholder="blur"
              fill
              preload
              sizes="(min-width: 1440px) 900px, (min-width: 1024px) 64vw, 100vw"
              className="object-cover motion-safe:animate-settle"
            />
          </div>
          <figcaption className="mt-3 flex gap-3 px-gutter text-xs text-muted-foreground sm:px-0">
            <span className="text-foreground tabular-nums">01</span>
            {hero.mainImage.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
