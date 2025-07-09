import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#92FF58]/90 to-[#4DCD4D]/85 text-[#060610] hover:from-[#92FF58] hover:to-[#4DCD4D] hover:shadow-lg hover:shadow-[#4DCD4D]/25 hover:-translate-y-1 font-medium text-shadow-sm shadow-md",
        secondary:
          "bg-[#19191F]/85 text-[#92FF58] border border-[#92FF58]/20 backdrop-blur-md hover:bg-[#1E1E2D]/95 hover:border-[#92FF58]/40 hover:shadow-lg hover:shadow-[#92FF58]/20 hover:-translate-y-1",
        outline:
          "border border-[#92FF58]/30 bg-transparent text-[#92FF58] hover:bg-[#92FF58]/10 hover:border-[#92FF58]/60",
        ghost: "hover:bg-[#92FF58]/10 hover:text-[#92FF58] text-white/80",
        link: "text-[#92FF58] underline-offset-4 hover:underline",
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
