import { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  icon?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export function Card({
  className,
  children,
  icon,
  header,
  footer,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl p-4 text-white transition hover:shadow-2xl",
        className
      )}
      {...props}
    >
      {(icon || header) && (
        <div className="flex items-center justify-between mb-4">
          {icon && <div className="text-2xl">{icon}</div>}
          {header && <div className="text-lg font-semibold">{header}</div>}
        </div>
      )}

      <div>{children}</div>

      {footer && <div className="mt-4 border-t border-white/10 pt-3">{footer}</div>}
    </div>
  );
}
