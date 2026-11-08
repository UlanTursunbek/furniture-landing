/**
 * Studio-specific settings. This project is a template reused by different
 * workshops: replace these values per studio. Translatable copy lives in
 * lib/i18n/dictionaries.
 */
interface SiteConfig {
  name: string;
  /**
   * WhatsApp number that receives estimate inquiries — the single place to
   * configure it. International format, digits only (no "+", spaces or
   * dashes), for example "996XXXXXXXXX".
   *
   * Leave empty until the studio provides its real number: the estimate form
   * then shows a fallback instead of opening a broken WhatsApp link, and the
   * footer hides the WhatsApp contact.
   */
  whatsappNumber: string;
  /** Studio phone shown in the footer, e.g. "+996 XXX XXX XXX". Hidden when empty. */
  phone: string;
  copyrightYear: number;
  /** Where every inquiry CTA leads. */
  inquiryHref: string;
}

export const siteConfig: SiteConfig = {
  name: "Forma",
  whatsappNumber: "",
  phone: "",
  copyrightYear: 2026,
  inquiryHref: "/estimate",
};
