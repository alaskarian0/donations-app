"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  ltr?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ltr, id, ...props }, ref) => {
    const inputId = id || label?.replace(/\s/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200",
            "focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20",
            "placeholder:text-gray-400",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
            ltr && "direction-ltr text-left",
            className
          )}
          dir={ltr ? "ltr" : undefined}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
