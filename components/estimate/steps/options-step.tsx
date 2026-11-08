"use client";

import { Controller, useFormContext } from "react-hook-form";

import { OptionCard } from "@/components/estimate/option-card";
import { featureIds, type EstimateFormInput } from "@/lib/estimate/schema";
import { useDictionary } from "@/lib/i18n/use-dictionary";

export function OptionsStep({ labelledBy }: { labelledBy: string }) {
  const { control } = useFormContext<EstimateFormInput>();
  const { features } = useDictionary().estimate;

  return (
    <Controller
      control={control}
      name="features"
      render={({ field }) => {
        const selected = new Set(field.value);
        const toggle = (id: (typeof featureIds)[number], checked: boolean) => {
          if (checked) selected.add(id);
          else selected.delete(id);
          field.onChange(featureIds.filter((option) => selected.has(option)));
        };

        return (
          <fieldset aria-labelledby={labelledBy}>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {featureIds.map((id, index) => (
                <OptionCard
                  key={id}
                  type="checkbox"
                  name={field.name}
                  value={id}
                  ref={index === 0 ? field.ref : undefined}
                  checked={selected.has(id)}
                  onChange={(event) => toggle(id, event.target.checked)}
                  onBlur={field.onBlur}
                  label={features.options[id].label}
                  description={features.options[id].description}
                />
              ))}
            </div>
          </fieldset>
        );
      }}
    />
  );
}
