"use client";

import type { ReactNode } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { describeEstimate } from "@/lib/estimate/describe";
import { getPriceEstimate } from "@/lib/estimate/pricing";
import type { EstimateFormInput } from "@/lib/estimate/schema";
import type { EstimateStepId } from "@/lib/estimate/steps";
import { formatMessage } from "@/lib/i18n/format";
import { htmlLang } from "@/lib/i18n/config";
import { useLocaleStore } from "@/lib/i18n/locale-store";
import { useDictionary } from "@/lib/i18n/use-dictionary";

interface SummaryStepProps {
  onEdit: (stepId: EstimateStepId) => void;
}

export function SummaryStep({ onEdit }: SummaryStepProps) {
  const { control } = useFormContext<EstimateFormInput>();
  const values = useWatch({ control }) as Partial<EstimateFormInput>;
  const { estimate } = useDictionary();
  const locale = useLocaleStore((state) => state.locale);
  const { summary } = estimate;
  const d = describeEstimate(values, estimate);
  const price = getPriceEstimate(values as EstimateFormInput);

  const rows: { stepId: EstimateStepId; label: string; value: ReactNode }[] = [
    { stepId: "type", label: summary.groups.furniture, value: d.furniture },
    {
      stepId: "dimensions",
      label: summary.groups.dimensions,
      value: d.dimensions ? (
        <SubList rows={d.dimensions} />
      ) : (
        summary.dimensionsUnknown
      ),
    },
    { stepId: "materials", label: summary.groups.materials, value: <SubList rows={d.materials} /> },
    {
      stepId: "options",
      label: summary.groups.features,
      value: d.features.length > 0 ? d.features.join(", ") : summary.noFeatures,
    },
    { stepId: "services", label: summary.groups.services, value: d.services },
  ];

  return (
    <div>
      <dl className="border-t border-border">
        {rows.map((row) => (
          <div
            key={row.stepId}
            className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 border-b border-border py-5 sm:grid-cols-[11rem_1fr_auto]"
          >
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="col-span-2 row-start-2 sm:col-span-1 sm:row-start-auto">{row.value}</dd>
            <dd className="col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto">
              <button
                type="button"
                onClick={() => onEdit(row.stepId)}
                aria-label={formatMessage(summary.editLabel, { section: row.label })}
                className="cursor-pointer text-sm underline decoration-foreground/30 underline-offset-[5px] transition-colors duration-300 ease-studio hover:decoration-foreground"
              >
                {summary.edit}
              </button>
            </dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="estimate-price-title" className="mt-10 bg-linen p-6 sm:p-8">
        <h3 id="estimate-price-title" className="eyebrow font-sans font-medium text-olive">
          {summary.estimateTitle}
        </h3>
        <p className="mt-4 font-serif text-title">
          {price.kind === "range"
            ? `${formatPrice(price.min, price.currency, htmlLang[locale])} – ${formatPrice(price.max, price.currency, htmlLang[locale])}`
            : summary.estimateIndividual}
        </p>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
          {summary.estimateNote}
        </p>
      </section>
    </div>
  );
}

function SubList({ rows }: { rows: { key: string; label: string; value: string }[] }) {
  return (
    <ul className="space-y-1">
      {rows.map((row) => (
        <li key={row.key}>
          <span className="text-muted-foreground">{row.label}:</span> {row.value}
        </li>
      ))}
    </ul>
  );
}

function formatPrice(value: number, currency: string, lang: string): string {
  return new Intl.NumberFormat(lang, { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}
