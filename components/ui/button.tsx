import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracotta disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-terracotta text-white shadow-[0_8px_20px_-6px_rgba(217,101,40,0.55)] hover:bg-terracotta-dark hover:shadow-[0_10px_24px_-6px_rgba(217,101,40,0.65)]",
        secondary:
          "bg-navy text-white shadow-[0_8px_20px_-6px_rgba(8,43,80,0.45)] hover:bg-navy-light",
        outline:
          "border border-border bg-white text-navy hover:border-navy/20 hover:bg-surface",
        ghost: "text-navy hover:bg-surface",
      },
      size: {
        default: "h-11 px-5 py-2 [&_svg]:size-4",
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-base [&_svg]:size-5",
        icon: "h-10 w-10 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
