import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

/** Studio text field: 48px, hairline border, 16px text (no iOS zoom). Focus ring comes from base styles. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-sm border border-input bg-card px-4 text-base text-foreground transition-[border-color] duration-300 ease-studio outline-none placeholder:text-muted-foreground/70 hover:border-foreground/40 focus-visible:border-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
