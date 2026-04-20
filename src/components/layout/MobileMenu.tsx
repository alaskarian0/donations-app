"use client";

import { Link, usePathname } from "@/i18n/routing";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useTranslations, useLocale } from "next-intl";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const locale = useLocale();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/donate", label: t("donate") },
    { href: "/about", label: t("about") },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-700 md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 h-full w-80 bg-shrine-blue-dark z-50 transform transition-transform duration-700 ease-breath md:hidden border-gold/10 theme-shrine-dark shadow-2xl",
          locale === 'ar' ? "left-0 border-r" : "right-0 border-l",
          open 
            ? "translate-x-0" 
            : (locale === 'ar' ? "-translate-x-full" : "translate-x-full")
        )}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <span className="text-gold font-bold text-xl gold-shimmer tracking-widest">{SITE_NAME}</span>
            <button onClick={onClose} className="text-gold/60 hover:text-gold p-2 transition-colors" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "block px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500",
                  pathname === link.href
                    ? "bg-gold/10 text-gold shadow-gold-glow/5"
                    : "text-gray-400 hover:bg-gold/5 hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto mb-8">
            <Link href="/donate" onClick={onClose}>
              <Button fullWidth size="lg" className="shadow-gold-glow">
                {t("donate")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
