"use client";

import { useFormContext } from "react-hook-form";
import { CircleHelp, Drill, PackageCheck, Truck, type LucideIcon } from "lucide-react";

import { errorId, FieldError } from "@/components/estimate/field-error";
import { OptionCard } from "@/components/estimate/option-card";
import { serviceIds, type EstimateFormInput, type ServiceId } from "@/lib/estimate/schema";
import { useDictionary } from "@/lib/i18n/use-dictionary";

const icons: Record<ServiceId, LucideIcon> = {
  delivery: Truck,
  installation: Drill,
  both: PackageCheck,
  none: CircleHelp,
};

export function ServicesStep({ labelledBy }: { labelledBy: string }) {
  const { register } = useFormContext<EstimateFormInput>();
  const { services } = useDictionary().estimate;

  return (
    <fieldset aria-labelledby={labelledBy} aria-describedby={errorId("services")}>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {serviceIds.map((id) => (
          <OptionCard
            key={id}
            type="radio"
            value={id}
            icon={icons[id]}
            label={services.options[id].label}
            description={services.options[id].description}
            {...register("services")}
          />
        ))}
      </div>
      <FieldError name="services" />
    </fieldset>
  );
}
