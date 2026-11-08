"use client";

import { useDictionary } from "@/lib/i18n/use-dictionary";

export function EstimateIntro() {
  const { intro } = useDictionary().estimate;

  return (
    <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
      <div className="lg:col-span-7">
        <p className="eyebrow flex items-center gap-3 text-olive">
          <span aria-hidden className="h-px w-8 shrink-0 bg-olive" />
          {intro.eyebrow}
        </p>
        <h1 className="mt-5 text-headline">{intro.title}</h1>
      </div>
      <p className="max-w-[46ch] text-muted-foreground lg:col-span-4 lg:col-start-9">{intro.lead}</p>
    </div>
  );
}
