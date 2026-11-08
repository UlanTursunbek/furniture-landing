import * as React from "react"
import { cn } from "cn"

/** Studio textarea, matching <Input>. Grows with content. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-sm border border-input bg-card px-4 py-3 text-base leading-relaxed text-foreground transition-[border-color] duration-300 ease-studio outline-none placeholder:text-muted-foreground/70 hover:border-foreground/40 focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
