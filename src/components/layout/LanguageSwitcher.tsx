"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect, useTransition } from "react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "ar", label: "العربية", flag: "🇮🇶" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
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
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
      window.location.reload();
    });
  };

  const current = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
          "border border-gold/30 text-gold hover:bg-gold/10",
          isPending && "opacity-50 cursor-wait"
        )}
        title={t("switch")}
      >
        <span className="text-base">{current.flag}</span>
        <span>{current.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={cn("w-3 h-3 transition-transform", open && "rotate-180")}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 bg-shrine-blue-dark border border-gold/20 rounded-xl shadow-xl overflow-hidden z-50 min-w-[140px] ltr:right-0 rtl:left-0">
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer",
                loc.code === locale
                  ? "bg-gold/10 text-gold"
                  : "text-gray-300 hover:bg-gold/5 hover:text-gold"
              )}
            >
              <span>{loc.flag}</span>
              <span>{loc.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
