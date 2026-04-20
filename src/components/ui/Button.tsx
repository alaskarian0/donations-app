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
          "relative inline-flex items-center justify-center gap-3 rounded-xl font-bold transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 overflow-hidden group hover:scale-[1.02] hover:-translate-y-0.5",
          {
            "bg-gradient-to-br from-gold-light via-gold to-gold-dark text-shrine-blue-dark shadow-gold-glow hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]":
              variant === "primary",
            "bg-shrine-blue text-white hover:bg-shrine-blue-dark shadow-cloud":
              variant === "secondary",
            "border-2 border-gold/40 text-gold hover:bg-gold/5 hover:border-gold":
              variant === "outline",
            "text-gold hover:bg-gold/10": variant === "ghost",
          },
          {
            "h-[2.5rem] px-5 text-sm": size === "sm",
            "h-[3.5rem] px-10 text-base": size === "md",
            "h-[4rem] px-14 text-lg": size === "lg",
          },
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {/* Subtle Shimmer for Primary */}
        {variant === "primary" && (
          <div className="absolute inset-0 metallic-shimmer opacity-30 pointer-events-none" />
        )}
        
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
