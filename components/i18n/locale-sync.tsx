"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { htmlLang, localePendingAttribute, localeStorageKey } from "@/lib/i18n/config";
import { useLocaleStore } from "@/lib/i18n/locale-store";
import { useDictionary } from "@/lib/i18n/use-dictionary";
import { siteConfig } from "@/lib/site-config";

/**
 * Restores the saved locale after hydration and mirrors the active locale onto
 * the document (<html lang>, <title>). Renders nothing.
 */
export function LocaleSync() {
  const locale = useLocaleStore((state) => state.locale);
  const hydrated = useLocaleStore((state) => state.hydrated);
  const hydrate = useLocaleStore((state) => state.hydrate);
  const syncFromStorage = useLocaleStore((state) => state.syncFromStorage);
  const dictionary = useDictionary();

  useEffect(() => {
    hydrate();

    const onStorage = (event: StorageEvent) => {
      if (event.key === localeStorageKey) syncFromStorage();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [hydrate, syncFromStorage]);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.lang = htmlLang[locale];
    // The restored locale is now committed to the DOM, so it is safe to reveal.
    root.removeAttribute(localePendingAttribute);
  }, [hydrated, locale]);

  // Next.js streams and hydrates its metadata <title> independently, which can
  // restore the server (default-locale) title after this effect runs. Keep the
  // localized title applied whenever <head> changes.
  const pathname = usePathname();
  const title = pathname === siteConfig.inquiryHref ? dictionary.meta.estimateTitle : dictionary.meta.title;
  useEffect(() => {
    if (!hydrated) return;
    const apply = () => {
      if (document.title !== title) document.title = title;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [hydrated, title]);

  return null;
}
