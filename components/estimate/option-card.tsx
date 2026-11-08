import type { ComponentProps } from "react";
import { Check, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface OptionCardProps extends Omit<ComponentProps<"input">, "type" | "children"> {
  type: "radio" | "checkbox";
  label: string;
  description?: string;
  /** With an icon the card renders as a tile; without, as a row. */
  icon?: LucideIcon;
}

/**
 * A large selectable card wrapping a real (visually hidden) radio or checkbox,
 * so keyboard behaviour, form semantics and screen readers work natively.
 */
export function OptionCard({ type, label, description, icon: Icon, className, ...inputProps }: OptionCardProps) {
  const indicator = (
    <span
      aria-hidden
      className={cn(
        "grid size-5 shrink-0 place-items-center border border-foreground/30 transition-colors duration-300 ease-studio",
        "group-has-checked/option:border-foreground",
        type === "radio" ? "rounded-full" : "rounded-[3px] group-has-checked/option:bg-foreground",
      )}
    >
      {type === "radio" ? (
        <span className="size-2.5 scale-0 rounded-full bg-foreground transition-transform duration-300 ease-studio group-has-checked/option:scale-100" />
      ) : (
        <Check className="size-3.5 text-background opacity-0 group-has-checked/option:opacity-100" strokeWidth={2.5} />
      )}
    </span>
  );

  return (
    <label
      className={cn(
        "group/option relative flex cursor-pointer rounded-sm border border-border bg-transparent transition-[border-color,background-color] duration-300 ease-studio",
        "hover:border-foreground/40 has-checked:border-foreground has-checked:bg-card",
        "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
        Icon ? "min-h-36 flex-col justify-between gap-6 p-4 sm:p-5" : "items-start gap-4 p-4 sm:p-5",
        className,
      )}
    >
      <input type={type} className="sr-only" {...inputProps} />
      {Icon ? (
        <>
          <span className="flex items-start justify-between gap-3">
            <Icon aria-hidden strokeWidth={1.25} className="size-7 text-olive" />
            {indicator}
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="leading-snug font-medium">{label}</span>
            {description && (
              <span className="text-sm leading-relaxed text-muted-foreground">{description}</span>
            )}
          </span>
        </>
      ) : (
        <>
          <span className="pt-0.5">{indicator}</span>
          <span className="flex flex-col gap-1">
            <span className="leading-snug font-medium">{label}</span>
            {description && (
              <span className="text-sm leading-relaxed text-muted-foreground">{description}</span>
            )}
          </span>
        </>
      )}
    </label>
  );
}
