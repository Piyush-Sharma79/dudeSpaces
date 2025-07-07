import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-green-400/90 to-lime-400/80 text-black hover:from-green-400 hover:to-lime-400 hover:shadow-lg hover:shadow-green-400/25 hover:-translate-y-1 border border-green-400/30",
        secondary:
          "bg-black/40 text-white border-2 border-green-400/20 backdrop-blur-md hover:bg-black/60 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-400/20 hover:-translate-y-1",
        outline:
          "border-2 border-green-400/30 bg-transparent text-green-400 hover:bg-green-400/10 hover:border-green-400/60",
        ghost: "hover:bg-green-400/10 hover:text-green-400",
        link: "text-green-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-600" />
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
