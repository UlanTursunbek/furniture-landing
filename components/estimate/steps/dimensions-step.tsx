"use client";

import { useFormContext } from "react-hook-form";
import { Ruler } from "lucide-react";

import { errorId, FieldError, useFieldError } from "@/components/estimate/field-error";
import { Input } from "@/components/ui/input";
import {
  dimensionKeys,
  dimensionLimits,
  type DimensionKey,
  type EstimateFormInput,
} from "@/lib/estimate/schema";
import { formatMessage } from "@/lib/i18n/format";
import { useDictionary } from "@/lib/i18n/use-dictionary";

function DimensionField({ dimension }: { dimension: DimensionKey }) {
  const { register } = useFormContext<EstimateFormInput>();
  const { estimate } = useDictionary();
  const name = `dimensions.${dimension}` as const;
  const error = useFieldError(name);
  const inputId = `dimension-${dimension}`;
  const hintId = `${inputId}-hint`;

  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-medium">
        {estimate.dimensions.labels[dimension]}
        <span className="sr-only">, {estimate.dimensions.unit}</span>
      </label>
      <div className="relative mt-2">
        <Input
          id={inputId}
          inputMode="numeric"
          autoComplete="off"
          placeholder={estimate.dimensions.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${hintId} ${errorId(name)}`}
          className="pr-12 tabular-nums"
          {...register(name)}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-muted-foreground"
        >
          {estimate.dimensions.unit}
        </span>
      </div>
      <p id={hintId} className="mt-2 text-xs text-muted-foreground tabular-nums">
        {formatMessage(estimate.dimensions.range, dimensionLimits[dimension])}
      </p>
      <FieldError name={name} className="mt-1" />
    </div>
  );
}

export function DimensionsStep() {
  const { estimate } = useDictionary();

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-3">
        {dimensionKeys.map((dimension) => (
          <DimensionField key={dimension} dimension={dimension} />
        ))}
      </div>
      <p className="mt-10 flex max-w-[56ch] gap-3 border-l border-olive pl-4 text-sm leading-relaxed text-muted-foreground">
        <Ruler aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-olive" />
        {estimate.dimensions.note}
      </p>
    </div>
  );
}
