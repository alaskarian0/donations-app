"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 overflow-hidden group hover:scale-[1.02] hover:-translate-y-0.5",
          {
            "bg-gradient-to-br from-gold-light via-gold to-gold-dark text-shrine-blue-dark shadow-[0_4px_20px_0_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_0_rgba(212,175,55,0.45)]":
              variant === "primary",
            "bg-shrine-blue-dark text-white hover:bg-shrine-blue border border-white/10 hover:border-white/20":
              variant === "secondary",
            "border-2 border-gold/50 text-gold hover:bg-gold/8 hover:border-gold":
              variant === "outline",
            "text-shrine-blue-dark hover:bg-shrine-blue-dark/8": variant === "ghost",
          },
          {
            "h-9 px-5 text-sm": size === "sm",
            "h-12 px-8 text-base": size === "md",
            "h-14 px-12 text-base": size === "lg",
          },
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {variant === "primary" && (
          <div className="absolute inset-0 metallic-shimmer opacity-30 pointer-events-none" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
