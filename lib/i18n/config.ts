export const locales = ["ru", "kg"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/** localStorage key holding the visitor's chosen locale. */
export const localeStorageKey = "site-locale";

/**
 * Set on <html> by the boot script while a non-default saved locale is being
 * restored, so the default-language markup is never painted. See globals.css.
 */
export const localePendingAttribute = "data-locale-pending";

/** BCP 47 tags for the `lang` attribute. Kyrgyz is "ky"; "KG" is only a UI label. */
export const htmlLang: Record<Locale, string> = {
  ru: "ru",
  kg: "ky",
};

/** Language names are endonyms, so they are identical in every dictionary. */
export const localeLabels: Record<Locale, { short: string; native: string }> = {
  ru: { short: "RU", native: "Русский" },
  kg: { short: "KG", native: "Кыргызча" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function readStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(localeStorageKey);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the choice
    // still applies for the current visit.
  }
}
