"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <nav className="sticky top-0 z-50 bg-shrine-blue-dark/95 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-shrine-blue-dark font-bold text-lg sm:text-xl">
                ع
              </div>
              <span className="text-gold font-bold text-sm sm:text-lg hidden sm:block">
                {tSite("name")}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    pathname === link.href
                      ? "text-gold"
                      : "text-gray-300 hover:text-gold"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <LanguageSwitcher />
              <Link href="/donate">
                <Button size="sm">{t("donateNow")}</Button>
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-3 md:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen(true)}
                className="text-gold p-2"
                aria-label={t("openMenu")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
