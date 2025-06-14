import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all px-5 py-2.5 shadow-md backdrop-blur-md ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
        outline: "bg-transparent border border-white/30 text-white hover:bg-white/10",
        ghost: "bg-transparent text-white hover:bg-white/10",
        destructive: "bg-red-500/80 text-white hover:bg-red-600 border border-red-500/60",
      },
      size: {
        default: "text-sm",
        lg: "text-base py-3 px-6",
        sm: "text-xs py-1.5 px-3",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "lg" | "sm" | "icon";
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
