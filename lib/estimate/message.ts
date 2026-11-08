import { formatMessage } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/types";
import { siteConfig } from "@/lib/site-config";

import { describeEstimate } from "./describe";
import type { EstimateFormInput } from "./schema";

/**
 * Builds the plain-text WhatsApp message in the active language.
 * WhatsApp renders *text* as bold; everything else is plain text.
 */
export function buildEstimateMessage(values: EstimateFormInput, t: Dictionary): string {
  const e = t.estimate;
  const d = describeEstimate(values, e);
  const field = (label: string, value: string) => `*${label}:* ${value}`;
  const item = (label: string, value: string) => `— ${label}: ${value}`;

  const comment = values.contact.comment.trim();

  const lines = [
    e.whatsapp.greeting,
    formatMessage(e.whatsapp.source, { brand: siteConfig.name }),
    "",
    field(e.contact.name, values.contact.name.trim()),
    field(e.contact.phone, values.contact.phone.trim()),
    "",
    field(e.summary.groups.furniture, d.furniture),
    d.dimensions
      ? [`*${e.summary.groups.dimensions}:*`, ...d.dimensions.map((row) => item(row.label, row.value))].join("\n")
      : field(e.summary.groups.dimensions, e.summary.dimensionsUnknown),
    [`*${e.summary.groups.materials}:*`, ...d.materials.map((row) => item(row.label, row.value))].join("\n"),
    field(e.summary.groups.features, d.features.length > 0 ? d.features.join(", ") : e.summary.noFeatures),
    field(e.summary.groups.services, d.services),
    field(e.contact.comment, comment || e.summary.notSpecified),
  ];

  return lines.join("\n");
}
