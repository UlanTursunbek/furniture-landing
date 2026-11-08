/**
 * Studio-specific settings. This project is a template reused by different
 * workshops: replace these values per studio. Translatable copy lives in
 * lib/i18n/dictionaries.
 */
export const siteConfig = {
  name: "Forma",
  // Placeholder contacts — replace with the workshop's real details.
  phone: {
    display: "+996 000 000 000",
    href: "tel:+996000000000",
  },
  whatsappUrl: "https://wa.me/996000000000",
  copyrightYear: 2026,
  /** Where inquiry CTAs point. Switch to the inquiry form once it exists. */
  inquiryHref: "#contacts",
} as const;
