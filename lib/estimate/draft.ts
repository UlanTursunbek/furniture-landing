import { z } from "zod";

import {
  bodyMaterialIds,
  countertopIds,
  featureIds,
  frontMaterialIds,
  furnitureTypeIds,
  serviceIds,
} from "./schema";

/**
 * The in-progress estimate is kept in sessionStorage so an accidental reload
 * or navigation away does not wipe the form. It is scoped to the browser tab
 * and never leaves the device.
 */
const draftKey = "estimate-draft";

const emptyDimensions = { width: "", height: "", depth: "" };
const emptyContact = { name: "", phone: "", comment: "" };

// Lenient: anything malformed falls back to an empty value instead of failing.
const draftSchema = z.object({
  step: z.number().int().min(0).catch(0),
  furthestStep: z.number().int().min(0).catch(0),
  values: z.object({
    furnitureType: z.enum(furnitureTypeIds).optional().catch(undefined),
    dimensions: z
      .object({
        width: z.string().catch(""),
        height: z.string().catch(""),
        depth: z.string().catch(""),
      })
      .catch(emptyDimensions),
    materials: z
      .object({
        body: z.enum(bodyMaterialIds).optional().catch(undefined),
        fronts: z.enum(frontMaterialIds).optional().catch(undefined),
        countertop: z.enum(countertopIds).optional().catch(undefined),
      })
      .catch({}),
    features: z.array(z.enum(featureIds)).catch([]),
    services: z.enum(serviceIds).optional().catch(undefined),
    contact: z
      .object({
        name: z.string().catch(""),
        phone: z.string().catch(""),
        comment: z.string().catch(""),
      })
      .catch(emptyContact),
  }),
});

export type EstimateDraft = z.output<typeof draftSchema>;

export function loadDraft(): EstimateDraft | null {
  try {
    const raw = window.sessionStorage.getItem(draftKey);
    if (!raw) return null;
    const result = draftSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: { step: number; furthestStep: number; values: unknown }): void {
  try {
    window.sessionStorage.setItem(draftKey, JSON.stringify(draft));
  } catch {
    // Storage unavailable: the form still works, it just won't survive a reload.
  }
}

export function clearDraft(): void {
  try {
    window.sessionStorage.removeItem(draftKey);
  } catch {
    // Nothing to clear.
  }
}
