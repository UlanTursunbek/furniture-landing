"use client";

import { useFormContext } from "react-hook-form";
import {
  Archive,
  Bath,
  CookingPot,
  DoorClosed,
  LampDesk,
  LibraryBig,
  Shapes,
  Shirt,
  ToyBrick,
  TvMinimal,
  type LucideIcon,
} from "lucide-react";

import { errorId, FieldError } from "@/components/estimate/field-error";
import { OptionCard } from "@/components/estimate/option-card";
import { furnitureTypeIds, type EstimateFormInput, type FurnitureTypeId } from "@/lib/estimate/schema";
import { useDictionary } from "@/lib/i18n/use-dictionary";

const icons: Record<FurnitureTypeId, LucideIcon> = {
  kitchens: CookingPot,
  wardrobes: DoorClosed,
  walkInClosets: Shirt,
  dressers: Archive,
  tvUnits: TvMinimal,
  shelving: LibraryBig,
  desks: LampDesk,
  childrens: ToyBrick,
  bathroom: Bath,
  other: Shapes,
};

export function FurnitureTypeStep({ labelledBy }: { labelledBy: string }) {
  const { register } = useFormContext<EstimateFormInput>();
  const { estimate } = useDictionary();

  return (
    <fieldset aria-labelledby={labelledBy} aria-describedby={errorId("furnitureType")}>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {furnitureTypeIds.map((id) => (
          <OptionCard
            key={id}
            type="radio"
            value={id}
            icon={icons[id]}
            label={estimate.furnitureTypes[id]}
            {...register("furnitureType")}
          />
        ))}
      </div>
      <FieldError name="furnitureType" />
    </fieldset>
  );
}
