"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

const MOSQUE_ICON = (
  <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 4 C11 4 6 10 6 16 L30 16 C30 10 25 4 18 4Z" fill="#1a5c38" opacity="0.9" />
    <line x1="18" y1="1" x2="18" y2="4" stroke="#1a5c38" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="1" r="1" fill="#1a5c38" />
    <rect x="5" y="10" width="3" height="6" rx="1.5" fill="#1a5c38" opacity="0.75" />
    <circle cx="6.5" cy="9.5" r="1.5" fill="#1a5c38" opacity="0.75" />
    <rect x="28" y="10" width="3" height="6" rx="1.5" fill="#1a5c38" opacity="0.75" />
    <circle cx="29.5" cy="9.5" r="1.5" fill="#1a5c38" opacity="0.75" />
    <rect x="4" y="16" width="28" height="3" rx="1" fill="#1a5c38" opacity="0.6" />
    <path d="M15 19 L15 24 Q15 26 18 26 Q21 26 21 24 L21 19 Z" fill="#1a5c38" opacity="0.5" />
  </svg>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tSite = useTranslations("site");

  const cleanPath = pathname.replace(/^\/(ar|en)/, "") || "/";
  const isHome = cleanPath === "/";

  // Scroll to a section on the home page, or navigate home first then scroll
  const handleSectionLink = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home with hash — Next.js router pushes the route
      router.push(`/${locale}/#${sectionId}`);
    }
  };

  const navLinks = [
    { href: "/", label: t("home"), sectionId: null },
    { href: `/#donate`, label: t("donate"), sectionId: "donate" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pt-3 pb-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-white/60 shadow-lg rounded-2xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* ── Logo — LEFT (start) in both LTR and RTL ── */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-colors duration-200 group-hover:border-[#1a5c38]/50"
                style={{ backgroundColor: "rgba(26,92,56,0.07)", borderColor: "rgba(26,92,56,0.2)" }}
              >
                {MOSQUE_ICON}
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-bold text-sm" style={{ color: "#1a5c38" }}>
                  {tSite("name")}
                </span>
                <span className="text-gray-400 text-xs font-normal">
                  {tSite("location")}
                </span>
              </div>
            </Link>

            {/* ── CENTER = nav links ── */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  link.sectionId === null
                    ? cleanPath === "/"
                    : false;
                return link.sectionId ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSectionLink(e, link.sectionId!)}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 relative py-1 cursor-pointer",
                      "text-gray-600 hover:text-[#1a5c38]"
                    )}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 relative py-1",
                      isActive
                        ? "text-[#1a5c38] after:absolute after:bottom-0 after:start-0 after:end-0 after:h-0.5 after:bg-[#1a5c38] after:rounded-full"
                        : "text-gray-600 hover:text-[#1a5c38]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── RIGHT = Donate CTA + Language ── */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <a
                href="/#donate"
                onClick={(e) => handleSectionLink(e, "donate")}
                className="bg-[#1a5c38] hover:bg-[#14472b] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                {t("donateNow")}
              </a>
            </div>

            {/* ── Mobile: hamburger + language ── */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen(true)}
                className="text-gray-600 hover:text-[#1a5c38] p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={t("openMenu")}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
