import type { EstimateFormInput } from "./schema";

/**
 * Result of the preliminary price calculation.
 *
 * Only `individual` is produced today: the studio has not provided pricing
 * rules, and the site must never show invented numbers. When real rules exist,
 * implement them in `getPriceEstimate` and return a `range` — the summary step
 * already renders both variants.
 */
export type PriceEstimate =
  | { kind: "individual" }
  | { kind: "range"; min: number; max: number; currency: string };

export function getPriceEstimate(values: EstimateFormInput): PriceEstimate {
  void values; // Inputs for a future calculator.
  return { kind: "individual" };
}
