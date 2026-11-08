"use client";

import { useFormContext, useFormState, type FieldPath } from "react-hook-form";

import { cn } from "@/lib/utils";
import { translateEstimateError } from "@/lib/estimate/errors";
import type { EstimateFormInput } from "@/lib/estimate/schema";
import { useDictionary } from "@/lib/i18n/use-dictionary";

type EstimateField = FieldPath<EstimateFormInput>;

/** Stable DOM id for a field's error message (for aria-describedby). */
export function errorId(name: EstimateField): string {
  return `${name.replace(/\./g, "-")}-error`;
}

/** Translated error message for a field, re-rendered when the language changes. */
export function useFieldError(name: EstimateField): string | null {
  const { control, getFieldState } = useFormContext<EstimateFormInput>();
  const formState = useFormState({ control, name });
  const { error } = getFieldState(name, formState);
  const { estimate } = useDictionary();
  return translateEstimateError(error?.message, name, estimate.errors);
}

/** Always mounted so the live region announces errors as they appear. */
export function FieldError({ name, className }: { name: EstimateField; className?: string }) {
  const message = useFieldError(name);
  return (
    <p
      id={errorId(name)}
      aria-live="polite"
      className={cn(message ? "mt-3 text-sm text-destructive" : "sr-only", className)}
    >
      {message}
    </p>
  );
}
