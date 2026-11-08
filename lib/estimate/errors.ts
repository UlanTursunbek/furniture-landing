import type { FieldPath } from "react-hook-form";

import { formatMessage } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/types";

import { dimensionKeys, dimensionLimits, isEstimateErrorKey, type EstimateFormInput } from "./schema";

/** Translates a schema error key for a given field into the active language. */
export function translateEstimateError(
  message: string | undefined,
  field: FieldPath<EstimateFormInput>,
  errors: Dictionary["estimate"]["errors"],
): string | null {
  if (!message) return null;
  if (!isEstimateErrorKey(message)) return errors.generic;

  if (message === "dimensionRange") {
    const key = dimensionKeys.find((k) => field === `dimensions.${k}`);
    if (key) return formatMessage(errors.dimensionRange, dimensionLimits[key]);
  }
  return errors[message];
}
