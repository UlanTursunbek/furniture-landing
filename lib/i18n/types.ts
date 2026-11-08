import type { CategoryId } from "@/lib/content/categories";

/**
 * The contract every locale must fulfil. Adding a key here makes the build
 * fail until each dictionary provides it.
 */

interface ImageCopy {
  alt: string;
  caption: string;
}

interface CategoryCopy {
  title: string;
  description: string;
  alt: string;
}

interface ApproachItem {
  title: string;
  body: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    home: string;
    mainNav: string;
    language: string;
    opensInNewTab: string;
  };
  brand: {
    descriptor: string;
  };
  nav: {
    categories: string;
    approach: string;
    contacts: string;
    inquiry: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    mainImage: ImageCopy;
    secondaryImage: ImageCopy;
  };
  approach: {
    title: string;
    items: readonly [ApproachItem, ApproachItem, ApproachItem, ApproachItem];
  };
  categories: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Record<CategoryId, CategoryCopy>;
    pricingNote: string;
    pricingCta: string;
  };
  footer: {
    tagline: string;
    contactsTitle: string;
    phone: string;
    whatsapp: string;
    whatsappAction: string;
    address: string;
    city: string;
    hours: string;
    hoursValue: string;
    rights: string;
  };
}
