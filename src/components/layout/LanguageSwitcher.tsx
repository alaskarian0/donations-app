"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect, useTransition } from "react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "ar", label: "العربية", short: "ع" },
  { code: "fa", label: "فارسی", short: "ف" },
  { code: "en", label: "English", short: "EN" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) { setOpen(false); return; }
    setOpen(false);
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
      window.location.reload();
    });
  };

  const current = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger: globe icon + 2-letter code */}
      <button
        onClick={() => setOpen(!open)}
        disabled={isPending}
        aria-label="Switch language"
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border",
          "border-gray-200 text-gray-600 hover:border-[#1a5c38] hover:text-[#1a5c38] hover:bg-[#1a5c38]/5",
          isPending && "opacity-50 cursor-wait"
        )}
      >
        {/* Globe icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="tracking-wide">{current.short}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50 min-w-[130px]"
          style={{ insetInlineEnd: 0 }}
        >
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer",
                loc.code === locale
                  ? "bg-[#1a5c38]/8 text-[#1a5c38] font-semibold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#1a5c38]"
              )}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  backgroundColor: loc.code === locale ? "#1a5c38" : "#f3f4f6",
                  color: loc.code === locale ? "#ffffff" : "#374151",
                }}
              >
                {loc.short}
              </span>
              <span>{loc.label}</span>
              {loc.code === locale && (
                <svg className="w-3.5 h-3.5 ms-auto text-[#1a5c38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
