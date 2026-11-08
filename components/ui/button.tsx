import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Studio buttons: near-square corners, quiet weight, color-only hovers.
 * `buttonVariants` is also applied to <Link> elements for navigational CTAs.
 */
const baseButtonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent font-sans text-sm font-medium tracking-[0.01em] whitespace-nowrap transition-[color,background-color,border-color] duration-300 ease-studio outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-olive-deep",
        outline:
          "border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/[0.03] aria-expanded:border-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-sand aria-expanded:bg-sand",
        ghost:
          "text-foreground hover:bg-muted aria-expanded:bg-muted",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/15",
        link:
          "rounded-none text-foreground underline decoration-foreground/30 decoration-1 underline-offset-[6px] hover:decoration-foreground",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[0.8125rem]",
        lg: "h-14 px-8 text-[0.9375rem]",
        xs: "h-8 gap-1.5 px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-12",
        "icon-xs": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    compoundVariants: [
      { variant: "link", className: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** Merged so conflicting base/variant classes resolve correctly when used on links. */
function buttonVariants(
  props?: Parameters<typeof baseButtonVariants>[0]
): string {
  return cn(baseButtonVariants(props))
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof baseButtonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
