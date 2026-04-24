"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MOSQUE_ICON = (
  <svg viewBox="0 0 36 36" className="w-5 h-5" fill="none">
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

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tSite = useTranslations("site");

  const cleanPath = pathname.replace(/^\/(ar|en)/, "") || "/";
  const isHome = cleanPath === "/";

  const handleSectionLink = (sectionId: string) => {
    onClose();
    if (isHome) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 300); // wait for drawer close animation
    } else {
      router.push(`/${locale}/#${sectionId}`);
    }
  };

  const navLinks = [
    { label: t("home"), sectionId: null, href: "/" },
    { label: t("donate"), sectionId: "donate", href: null },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer — slides in from the end (right in LTR, left in RTL) */}
      <div
        className={cn(
          "fixed top-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 md:hidden shadow-2xl",
          "ltr:left-0 rtl:right-0",
          open ? "translate-x-0" : "rtl:translate-x-full ltr:-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center border-2"
                style={{ backgroundColor: "rgba(26,92,56,0.08)", borderColor: "rgba(26,92,56,0.2)" }}
              >
                {MOSQUE_ICON}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-sm" style={{ color: "#1a5c38" }}>
                  {tSite("name")}
                </span>
                <span className="text-gray-400 text-xs">{tSite("location")}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#1a5c38] p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label={t("closeMenu")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 px-4 py-5 space-y-1">
            {navLinks.map((link) => {
              const isActive = link.sectionId === null && cleanPath === "/";
              if (link.sectionId) {
                return (
                  <button
                    key={link.label}
                    onClick={() => handleSectionLink(link.sectionId!)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:text-[#1a5c38] hover:bg-gray-50 transition-colors text-start"
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href!}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "font-semibold"
                      : "text-gray-700 hover:text-[#1a5c38] hover:bg-gray-50"
                  )}
                  style={isActive ? { backgroundColor: "rgba(26,92,56,0.08)", color: "#1a5c38" } : {}}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#1a5c38] shrink-0" />}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="px-5 pb-8">
            <button
              onClick={() => handleSectionLink("donate")}
              className="w-full text-white text-sm font-semibold py-3.5 rounded-full transition-colors duration-200"
              style={{ backgroundColor: "#1a5c38" }}
            >
              {t("donateNow")}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
