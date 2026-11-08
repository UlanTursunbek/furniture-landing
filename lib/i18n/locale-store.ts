import { create } from "zustand";

import { defaultLocale, readStoredLocale, writeStoredLocale, type Locale } from "./config";

interface LocaleState {
  locale: Locale;
  /** False until the saved locale has been read on the client. */
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  /** Reads the saved locale. Must run after mount so SSR and first render match. */
  hydrate: () => void;
  /** Applies a locale changed in another tab without writing it back. */
  syncFromStorage: () => void;
}

export const useLocaleStore = create<LocaleState>()((set) => ({
  locale: defaultLocale,
  hydrated: false,
  setLocale: (locale) => {
    set({ locale });
    writeStoredLocale(locale);
  },
  hydrate: () => set({ locale: readStoredLocale() ?? defaultLocale, hydrated: true }),
  syncFromStorage: () => set({ locale: readStoredLocale() ?? defaultLocale }),
}));
