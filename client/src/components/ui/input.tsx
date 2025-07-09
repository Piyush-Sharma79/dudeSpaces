import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-[#92FF58]/15 bg-[#12121C]/70 backdrop-blur-md px-4 py-3 text-base font-medium text-white placeholder:text-white/40 focus:border-[#92FF58]/50 focus:outline-none focus:ring-4 focus:ring-[#92FF58]/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 font-space-grotesk",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
