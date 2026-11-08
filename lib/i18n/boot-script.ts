import {
  defaultLocale,
  htmlLang,
  localePendingAttribute,
  localeStorageKey,
  locales,
} from "./config";

/** Safety net: never keep the page hidden if hydration fails or is slow. */
const revealTimeoutMs = 1500;

/**
 * Inline, render-blocking script for <head>. If the visitor saved a
 * non-default locale, it sets <html lang> and hides the body until
 * <LocaleSync> has rendered that locale, so the default language never flashes.
 */
export const localeBootScript = `(function(){try{var l=localStorage.getItem(${JSON.stringify(
  localeStorageKey,
)});var s=${JSON.stringify(locales)};if(l&&l!==${JSON.stringify(
  defaultLocale,
)}&&s.indexOf(l)>-1){var d=document.documentElement;d.lang=${JSON.stringify(
  htmlLang,
)}[l];d.setAttribute(${JSON.stringify(
  localePendingAttribute,
)},"");setTimeout(function(){d.removeAttribute(${JSON.stringify(
  localePendingAttribute,
)})},${revealTimeoutMs})}}catch(e){}})();`;
