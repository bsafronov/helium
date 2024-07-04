import { cn } from "@/lib/utils";
import React from "react";

export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto max-w-screen-lg px-4 w-full", className)}
    {...props}
  />
));
Container.displayName = "Container";
