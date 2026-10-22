import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        success: "bg-success-bg text-success",
        warning: "bg-warning-bg text-warning",
        danger: "bg-danger-bg text-danger",
        neutral: "bg-surface text-anthracite",
        successSolid: "bg-success text-white shadow-[0_4px_10px_-3px_rgba(31,146,84,0.6)]",
        warningSolid: "bg-warning text-white shadow-[0_4px_10px_-3px_rgba(201,120,15,0.6)]",
        dangerSolid: "bg-danger text-white shadow-[0_4px_10px_-3px_rgba(193,58,46,0.6)]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
