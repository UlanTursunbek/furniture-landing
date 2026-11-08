"use client";

import { cn } from "@/lib/utils";
import { estimateSteps } from "@/lib/estimate/steps";
import { useDictionary } from "@/lib/i18n/use-dictionary";

interface WizardProgressProps {
  current: number;
  /** Furthest step reached; steps up to it can be revisited. */
  furthest: number;
  onSelect: (index: number) => void;
}

export function WizardProgress({ current, furthest, onSelect }: WizardProgressProps) {
  const { estimate } = useDictionary();

  return (
    <>
      {/* Mobile: segmented bar. The step heading carries the text. */}
      <div aria-hidden className="flex gap-1.5 lg:hidden">
        {estimateSteps.map((step, index) => (
          <span
            key={step.id}
            className={cn(
              "h-0.5 flex-1 transition-colors duration-500 ease-studio",
              index <= current ? "bg-olive" : "bg-border",
            )}
          />
        ))}
      </div>

      {/* Desktop: step list. */}
      <nav aria-label={estimate.progress.label} className="hidden lg:block">
        <ol className="border-l border-border">
          {estimateSteps.map((step, index) => {
            const isCurrent = index === current;
            const reachable = index <= furthest && !isCurrent;
            const content = (
              <>
                <span
                  className={cn(
                    "w-6 shrink-0 font-serif text-sm tabular-nums",
                    isCurrent ? "text-olive" : "text-muted-foreground",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{estimate.steps[step.id].nav}</span>
                {index < current && <span className="sr-only">({estimate.progress.completed})</span>}
              </>
            );
            const itemClass = cn(
              "-ml-px flex w-full items-baseline gap-3 border-l py-2.5 pl-5 text-left text-sm transition-colors duration-300 ease-studio",
              isCurrent
                ? "border-olive font-medium text-foreground"
                : "border-transparent",
              reachable && "cursor-pointer text-muted-foreground hover:text-foreground",
              !isCurrent && !reachable && "text-muted-foreground/60",
            );

            return (
              <li key={step.id} aria-current={isCurrent ? "step" : undefined}>
                {reachable ? (
                  <button type="button" onClick={() => onSelect(index)} className={itemClass}>
                    {content}
                  </button>
                ) : (
                  <span className={itemClass}>{content}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
