"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { errorId, FieldError } from "@/components/estimate/field-error";
import { OptionCard } from "@/components/estimate/option-card";
import {
  bodyMaterialIds,
  countertopIds,
  frontMaterialIds,
  needsCountertop,
  type EstimateFormInput,
} from "@/lib/estimate/schema";
import { useDictionary } from "@/lib/i18n/use-dictionary";

type MaterialField = "materials.body" | "materials.fronts" | "materials.countertop";

interface GroupProps<Id extends string> {
  name: MaterialField;
  title: string;
  ids: readonly Id[];
  options: Record<Id, { label: string; description: string }>;
}

function MaterialGroup<Id extends string>({ name, title, ids, options }: GroupProps<Id>) {
  const { register } = useFormContext<EstimateFormInput>();
  const titleId = `${name.replace(".", "-")}-title`;

  return (
    <fieldset aria-labelledby={titleId} aria-describedby={errorId(name)}>
      <h3 id={titleId} className="text-title">
        {title}
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {ids.map((id) => (
          <OptionCard
            key={id}
            type="radio"
            value={id}
            label={options[id].label}
            description={options[id].description}
            {...register(name)}
          />
        ))}
      </div>
      <FieldError name={name} />
    </fieldset>
  );
}

export function MaterialsStep() {
  const { control } = useFormContext<EstimateFormInput>();
  const furnitureType = useWatch({ control, name: "furnitureType" });
  const { materials } = useDictionary().estimate;

  return (
    <div className="space-y-12">
      <MaterialGroup
        name="materials.body"
        title={materials.body.title}
        ids={bodyMaterialIds}
        options={materials.body.options}
      />
      <MaterialGroup
        name="materials.fronts"
        title={materials.fronts.title}
        ids={frontMaterialIds}
        options={materials.fronts.options}
      />
      {needsCountertop(furnitureType) && (
        <MaterialGroup
          name="materials.countertop"
          title={materials.countertop.title}
          ids={countertopIds}
          options={materials.countertop.options}
        />
      )}
    </div>
  );
}
