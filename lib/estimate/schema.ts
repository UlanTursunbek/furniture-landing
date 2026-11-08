import type { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { categoryIds } from "@/lib/content/categories";

/* -------------------------------------------------------------------------- */
/*  Option ids. Labels live in the i18n dictionaries under `estimate`.        */
/* -------------------------------------------------------------------------- */

export const furnitureTypeIds = [...categoryIds, "other"] as const;
export type FurnitureTypeId = (typeof furnitureTypeIds)[number];

export const bodyMaterialIds = ["ldsp", "notSure"] as const;
export type BodyMaterialId = (typeof bodyMaterialIds)[number];

export const frontMaterialIds = ["ldsp", "mdf", "notSure"] as const;
export type FrontMaterialId = (typeof frontMaterialIds)[number];

export const countertopIds = ["none", "laminated", "notSure"] as const;
export type CountertopId = (typeof countertopIds)[number];

export const featureIds = [
  "drawers",
  "softClose",
  "premiumHardware",
  "openShelves",
  "lighting",
  "specialStorage",
] as const;
export type FeatureId = (typeof featureIds)[number];

export const serviceIds = ["delivery", "installation", "both", "none"] as const;
export type ServiceId = (typeof serviceIds)[number];

/** Furniture types where a countertop choice is relevant. */
const countertopFurnitureTypes: readonly FurnitureTypeId[] = ["kitchens", "bathroom"];

export function needsCountertop(type: FurnitureTypeId | null | undefined): boolean {
  return type != null && countertopFurnitureTypes.includes(type);
}

/** Accepted ranges in millimetres. Generous on purpose: this is a first estimate. */
export const dimensionLimits = {
  width: { min: 100, max: 12000 },
  height: { min: 100, max: 4000 },
  depth: { min: 100, max: 1500 },
} as const;
export type DimensionKey = keyof typeof dimensionLimits;
export const dimensionKeys = ["width", "height", "depth"] as const satisfies readonly DimensionKey[];

/* -------------------------------------------------------------------------- */
/*  Validation. Messages are error *keys*, translated at render time so they  */
/*  follow the active language without re-creating the schema.                */
/* -------------------------------------------------------------------------- */

export const estimateErrorKeys = [
  "selectOne",
  "dimensionFormat",
  "dimensionRange",
  "nameRequired",
  "nameTooLong",
  "phoneRequired",
  "phoneInvalid",
  "commentTooLong",
  "generic",
] as const;
export type EstimateErrorKey = (typeof estimateErrorKeys)[number];

export function isEstimateErrorKey(value: unknown): value is EstimateErrorKey {
  return typeof value === "string" && (estimateErrorKeys as readonly string[]).includes(value);
}

/** Strips spaces so "2 400" is accepted as 2400. */
export function normalizeDimension(value: string): string {
  return value.replace(/\s+/g, "");
}

function dimensionField({ min, max }: { min: number; max: number }) {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d+$/.test(normalizeDimension(value)), {
      error: "dimensionFormat",
    })
    .refine(
      (value) => {
        const digits = normalizeDimension(value);
        if (!/^\d+$/.test(digits)) return true; // empty or reported as a format error
        const number = Number(digits);
        return number >= min && number <= max;
      },
      { error: "dimensionRange" },
    );
}

function isValidPhone(value: string): boolean {
  if (!/^[+\d\s()-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 9 && digits <= 15;
}

const furnitureTypeSchema = z.enum(furnitureTypeIds, { error: "selectOne" });

// Note: avoid `abort: true` on checks — an aborting issue would suppress the
// cross-field countertop refinement below.
export const estimateSchema = z
  .object({
    furnitureType: furnitureTypeSchema,
    dimensions: z.object({
      width: dimensionField(dimensionLimits.width),
      height: dimensionField(dimensionLimits.height),
      depth: dimensionField(dimensionLimits.depth),
    }),
    materials: z.object({
      body: z.enum(bodyMaterialIds, { error: "selectOne" }),
      fronts: z.enum(frontMaterialIds, { error: "selectOne" }),
      countertop: z.enum(countertopIds).nullish(),
    }),
    features: z.array(z.enum(featureIds)),
    services: z.enum(serviceIds, { error: "selectOne" }),
    contact: z.object({
      name: z.string().trim().min(1, { error: "nameRequired" }).max(80, { error: "nameTooLong" }),
      phone: z
        .string()
        .trim()
        .min(1, { error: "phoneRequired" })
        .refine(isValidPhone, { error: "phoneInvalid" }),
      comment: z.string().trim().max(1000, { error: "commentTooLong" }),
    }),
  })
  .refine(
    (values) => !needsCountertop(values.furnitureType) || values.materials?.countertop != null,
    {
      error: "selectOne",
      path: ["materials", "countertop"],
      // Run even while later steps are still empty, as long as the type is known.
      when: (payload) => {
        const value = payload.value as { furnitureType?: unknown } | undefined;
        return furnitureTypeSchema.safeParse(value?.furnitureType).success;
      },
    },
  );

export type EstimateFormInput = z.input<typeof estimateSchema>;
export type EstimateFormValues = z.output<typeof estimateSchema>;

export const estimateDefaultValues: DefaultValues<EstimateFormInput> = {
  dimensions: { width: "", height: "", depth: "" },
  materials: {},
  features: [],
  contact: { name: "", phone: "", comment: "" },
};
