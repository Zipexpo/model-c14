import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, prefix, subfix, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-muted-foreground">
            {prefix}
          </span>
        )}
        <input
          type={type}
          className={cn(
            `${
              prefix ? "pl-6" : "pl-3"
            } flex h-10 w-full rounded-md border border-input bg-background pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
        {subfix && (
          <span className="absolute right-10 text-muted-foreground">
            {subfix}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
