import type { FieldPath } from "react-hook-form";

import type { EstimateFormInput } from "./schema";

interface EstimateStep {
  id: string;
  /** Fields validated before leaving this step. */
  fields: readonly FieldPath<EstimateFormInput>[];
}

/** Wizard order. Step copy lives in the dictionaries under `estimate.steps`. */
export const estimateSteps = [
  { id: "type", fields: ["furnitureType"] },
  { id: "dimensions", fields: ["dimensions.width", "dimensions.height", "dimensions.depth"] },
  { id: "materials", fields: ["materials.body", "materials.fronts", "materials.countertop"] },
  { id: "options", fields: ["features"] },
  { id: "services", fields: ["services"] },
  { id: "summary", fields: [] },
  { id: "contact", fields: ["contact.name", "contact.phone", "contact.comment"] },
] as const satisfies readonly EstimateStep[];

export type EstimateStepId = (typeof estimateSteps)[number]["id"];

export const lastStepIndex = estimateSteps.length - 1;
