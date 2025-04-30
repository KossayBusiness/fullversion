
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:from-teal-500 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all",
        soft: "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
        natural: "bg-natural-600 text-white hover:bg-natural-700 shadow-sm hover:shadow-md transition-all",
        purple: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all",
        tab: "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-indigo-200",
        condition: "bg-white text-slate-700 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 justify-start px-4",
        conditionActive: "bg-indigo-50 text-indigo-700 border border-indigo-200 justify-start px-4 shadow-sm",
        pill: "rounded-full bg-white border border-slate-200 text-slate-700 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50",
        pillActive: "rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 shadow-sm",
        glossy: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-sm transition-all",
        naturalGradient: "bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700 text-white shadow-sm hover:shadow-md transition-all",
        imageCard: "p-0 h-auto rounded-xl overflow-hidden hover:shadow-lg transition-all border border-slate-200",
        cta: "bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 font-medium hover:from-amber-500 hover:to-amber-600 hover:text-amber-950 shadow-md hover:shadow-lg transition-all",
        problem: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all",
        solution: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all",
        quiz: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all",
        urgency: "bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium hover:from-rose-600 hover:to-pink-700 shadow-md hover:shadow-lg transition-all relative overflow-hidden",
        scientific: "bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium hover:from-blue-600 hover:to-teal-500 shadow-md hover:shadow-lg transition-all",
        magicCta: "relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        pill: "h-9 rounded-full px-4",
        xl: "h-12 rounded-md px-10 text-base",
        jumbo: "h-14 rounded-md px-12 text-lg font-medium",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
