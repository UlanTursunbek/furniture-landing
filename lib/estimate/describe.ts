import type { Dictionary } from "@/lib/i18n/types";

import {
  dimensionKeys,
  featureIds,
  needsCountertop,
  normalizeDimension,
  type DimensionKey,
  type EstimateFormInput,
} from "./schema";

type EstimateCopy = Dictionary["estimate"];

interface DescribedRow<Key extends string> {
  key: Key;
  label: string;
  value: string;
}

export interface EstimateDescription {
  furniture: string;
  /** Null when no dimension was entered at all. */
  dimensions: DescribedRow<DimensionKey>[] | null;
  materials: DescribedRow<"body" | "fronts" | "countertop">[];
  features: string[];
  services: string;
}

/**
 * Turns form values into localized, human-readable rows. Shared by the summary
 * step and the WhatsApp message so both always say the same thing.
 */
export function describeEstimate(
  values: Partial<EstimateFormInput>,
  t: EstimateCopy,
): EstimateDescription {
  const missing = t.summary.notSpecified;
  const type = values.furnitureType;

  const dimensions = dimensionKeys.map((key) => {
    const raw = normalizeDimension(values.dimensions?.[key] ?? "");
    return {
      key,
      label: t.dimensions.labels[key],
      value: raw ? `${raw} ${t.dimensions.unit}` : missing,
    };
  });
  const hasDimensions = dimensionKeys.some((key) => (values.dimensions?.[key] ?? "").trim() !== "");

  const { body, fronts, countertop } = values.materials ?? {};
  const materials: EstimateDescription["materials"] = [
    {
      key: "body",
      label: t.materials.body.title,
      value: body ? t.materials.body.options[body].label : missing,
    },
    {
      key: "fronts",
      label: t.materials.fronts.title,
      value: fronts ? t.materials.fronts.options[fronts].label : missing,
    },
  ];
  if (needsCountertop(type)) {
    materials.push({
      key: "countertop",
      label: t.materials.countertop.title,
      value: countertop ? t.materials.countertop.options[countertop].label : missing,
    });
  }

  const selected = new Set(values.features ?? []);

  return {
    furniture: type ? t.furnitureTypes[type] : missing,
    dimensions: hasDimensions ? dimensions : null,
    materials,
    // Keep the canonical option order regardless of click order.
    features: featureIds.filter((id) => selected.has(id)).map((id) => t.features.options[id].label),
    services: values.services ? t.services.options[values.services].label : missing,
  };
}
