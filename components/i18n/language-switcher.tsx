"use client";

import { cn } from "@/lib/utils";
import { htmlLang, localeLabels, locales } from "@/lib/i18n/config";
import { useLocaleStore } from "@/lib/i18n/locale-store";
import { useDictionary } from "@/lib/i18n/use-dictionary";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);
  const t = useDictionary();

  return (
    <div role="group" aria-label={t.a11y.language} className={cn("flex items-center", className)}>
      {locales.map((option, index) => {
        const active = option === locale;
        return (
          <div key={option} className="flex items-center">
            {index > 0 && <span aria-hidden className="h-3 w-px bg-foreground/20" />}
            <button
              type="button"
              lang={htmlLang[option]}
              aria-label={localeLabels[option].native}
              aria-pressed={active}
              onClick={() => setLocale(option)}
              className={cn(
                "eyebrow relative flex h-11 cursor-pointer items-center px-2.5 transition-colors duration-300 ease-studio",
                "after:absolute after:inset-x-2.5 after:bottom-2.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-studio",
                active
                  ? "text-foreground after:scale-x-100"
                  : "text-muted-foreground after:scale-x-0 hover:text-foreground",
              )}
            >
              {localeLabels[option].short}
            </button>
          </div>
        );
      })}
    </div>
  );
}
