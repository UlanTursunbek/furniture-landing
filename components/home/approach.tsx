"use client";

import { useDictionary } from "@/lib/i18n/use-dictionary";

export function Approach() {
  const { approach } = useDictionary();

  return (
    <section id="approach" aria-labelledby="approach-title" className="shell scroll-mt-8 pt-section">
      <h2 id="approach-title" className="eyebrow font-sans font-medium text-olive">
        {approach.title}
      </h2>
      <ol className="mt-8 grid border-t border-border sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
        {approach.items.map((item, index) => (
          <li key={index} className="border-b border-border py-8 sm:pt-10 sm:pb-10 lg:border-b-0 lg:pb-0">
            <span aria-hidden className="font-serif text-sm text-olive tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-title">{item.title}</h3>
            <p className="mt-3 max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
