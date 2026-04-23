"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tSite = useTranslations("site");

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
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 h-full w-72 bg-shrine-blue-dark z-50 transform transition-transform duration-300 md:hidden",
          "ltr:left-0 rtl:right-0",
          open
            ? "translate-x-0"
            : "rtl:translate-x-full ltr:-translate-x-full"
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-gold font-bold text-lg">{tSite("name")}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-gold p-1" aria-label={t("closeMenu")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  pathname === link.href
                    ? "bg-gold/10 text-gold"
                    : "text-gray-300 hover:bg-gold/5 hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Link href="/donate" onClick={onClose}>
              <Button fullWidth size="lg">
                {t("donateNow")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
