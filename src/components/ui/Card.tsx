import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  hoverable?: boolean;
  goldBorder?: boolean;
}

export default function Card({
  className,
  selected,
  hoverable = false,
  goldBorder = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-md transition-all duration-200",
        hoverable && "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
        selected && "ring-2 ring-gold shadow-lg shadow-gold/10",
        goldBorder && "border-t-4 border-gold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
