import * as React from "react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        "size-4 rounded border border-gray-300 accent-purple-600",
        className,
      )}
      {...props}
    />
  );
}

export { Checkbox };
