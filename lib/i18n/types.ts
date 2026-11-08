import type { CategoryId } from "@/lib/content/categories";
import type {
  BodyMaterialId,
  CountertopId,
  DimensionKey,
  EstimateErrorKey,
  FeatureId,
  FrontMaterialId,
  FurnitureTypeId,
  ServiceId,
} from "@/lib/estimate/schema";
import type { EstimateStepId } from "@/lib/estimate/steps";

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

interface OptionCopy {
  label: string;
  description: string;
}

interface OptionGroupCopy<Id extends string> {
  title: string;
  options: Record<Id, OptionCopy>;
}

interface EstimateCopy {
  intro: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  progress: {
    /** Accessible name of the step list. */
    label: string;
    /** "{current}" and "{total}" are replaced. */
    stepOf: string;
    /** Screen-reader suffix for steps already passed. */
    completed: string;
  };
  steps: Record<EstimateStepId, { nav: string; title: string; description: string }>;
  /** Singular names, e.g. "Kitchen" (categories use plural names). */
  furnitureTypes: Record<FurnitureTypeId, string>;
  dimensions: {
    labels: Record<DimensionKey, string>;
    unit: string;
    placeholder: string;
    /** "{min}" and "{max}" are replaced. */
    range: string;
    note: string;
  };
  materials: {
    body: OptionGroupCopy<BodyMaterialId>;
    fronts: OptionGroupCopy<FrontMaterialId>;
    countertop: OptionGroupCopy<CountertopId>;
  };
  features: { options: Record<FeatureId, OptionCopy> };
  services: { options: Record<ServiceId, OptionCopy> };
  summary: {
    groups: {
      furniture: string;
      dimensions: string;
      materials: string;
      features: string;
      services: string;
    };
    edit: string;
    /** "{section}" is replaced. */
    editLabel: string;
    notSpecified: string;
    dimensionsUnknown: string;
    noFeatures: string;
    estimateTitle: string;
    estimateIndividual: string;
    estimateNote: string;
  };
  contact: {
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    comment: string;
    commentPlaceholder: string;
    optional: string;
  };
  actions: {
    back: string;
    next: string;
    submit: string;
    submitNote: string;
    startOver: string;
    copy: string;
    copied: string;
  };
  status: {
    sentTitle: string;
    sentBody: string;
    openManually: string;
    unconfiguredTitle: string;
    unconfiguredBody: string;
    messagePreview: string;
  };
  /** "{min}" and "{max}" are replaced in `dimensionRange`. */
  errors: Record<EstimateErrorKey, string>;
  whatsapp: {
    greeting: string;
    /** "{brand}" is replaced. */
    source: string;
  };
}

export interface Dictionary {
  meta: {
    title: string;
    estimateTitle: string;
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
  estimate: EstimateCopy;
}
