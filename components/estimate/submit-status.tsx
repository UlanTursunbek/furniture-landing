"use client";

import { useState } from "react";
import { Check, Copy, RotateCcw, TriangleAlert } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { buildEstimateMessage } from "@/lib/estimate/message";
import type { EstimateFormValues } from "@/lib/estimate/schema";
import { useDictionary } from "@/lib/i18n/use-dictionary";

export type SubmitStatus =
  | { kind: "idle" }
  | { kind: "sent"; url: string }
  // Values, not text: the preview re-renders in the active language.
  | { kind: "unconfigured"; values: EstimateFormValues };

interface SubmitStatusPanelProps {
  status: SubmitStatus;
  onStartOver: () => void;
}

export function SubmitStatusPanel({ status, onStartOver }: SubmitStatusPanelProps) {
  const t = useDictionary();
  const copy = t.estimate;
  const [copied, setCopied] = useState(false);

  if (status.kind === "idle") return null;

  if (status.kind === "sent") {
    return (
      <div role="status" className="mt-10 border-t border-olive pt-6">
        <p className="flex items-center gap-2 font-medium">
          <Check aria-hidden className="size-4 text-olive" />
          {copy.status.sentTitle}
        </p>
        <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
          {copy.status.sentBody}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={status.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "link" })}
          >
            {copy.status.openManually}
            <span className="sr-only"> ({t.a11y.opensInNewTab})</span>
          </a>
          <Button variant="ghost" size="sm" onClick={onStartOver} className="-ml-4">
            <RotateCcw aria-hidden />
            {copy.actions.startOver}
          </Button>
        </div>
      </div>
    );
  }

  const message = buildEstimateMessage(status.values, t);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div role="alert" className="mt-10 border-t border-destructive/60 pt-6">
      <p className="flex items-center gap-2 font-medium">
        <TriangleAlert aria-hidden className="size-4 text-destructive" />
        {copy.status.unconfiguredTitle}
      </p>
      <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
        {copy.status.unconfiguredBody}
      </p>
      {process.env.NODE_ENV === "development" && (
        // Developer-only hint; stripped from production builds.
        <p className="mt-3 font-mono text-xs text-destructive">
          Dev: set `whatsappNumber` in lib/site-config.ts to enable WhatsApp submission.
        </p>
      )}
      <label htmlFor="estimate-message-preview" className="mt-6 block text-sm font-medium">
        {copy.status.messagePreview}
      </label>
      <textarea
        id="estimate-message-preview"
        readOnly
        value={message}
        rows={10}
        className="mt-2 w-full resize-y rounded-sm border border-input bg-card px-4 py-3 font-sans text-sm leading-relaxed"
      />
      <Button variant="outline" size="sm" onClick={handleCopy} className="mt-4">
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
        <span aria-live="polite">{copied ? copy.actions.copied : copy.actions.copy}</span>
      </Button>
    </div>
  );
}
