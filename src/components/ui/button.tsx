import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[hsl(43_75%_52%)] to-[hsl(43_76%_36%)] text-[hsl(0_0%_10%)] shadow-lg hover:shadow-[0_0_20px_hsl(43_75%_52%_/_0.4)] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90",
        outline:
          "border border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
        secondary:
          "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // PBD Custom Variants - Golden Hour
        hero: "bg-gradient-to-r from-[hsl(45_80%_65%)] via-[hsl(43_75%_52%)] to-[hsl(43_76%_36%)] text-[hsl(0_0%_10%)] shadow-lg hover:shadow-[0_0_24px_hsl(43_75%_52%_/_0.5)] hover:scale-[1.02] active:scale-[0.98] font-bold tracking-wide",
        golden: "bg-gradient-to-r from-[hsl(43_75%_52%)] to-[hsl(43_76%_36%)] text-[hsl(0_0%_10%)] shadow-lg hover:shadow-[0_0_20px_hsl(43_75%_52%_/_0.4)] hover:scale-[1.02] active:scale-[0.98] font-bold",
        glass: "backdrop-blur-md bg-muted/30 border border-primary/30 text-foreground hover:bg-muted/50 hover:border-primary/50",
        muted: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
