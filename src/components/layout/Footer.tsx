"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import GoldenDivider from "@/components/ui/GoldenDivider";

export default function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("site");
  const tNav = useTranslations("nav");

  const navLinks = [
    { href: "/", label: tNav("home") },
    { href: "/donate", label: tNav("donate") },
    { href: "/about", label: tNav("about") },
  ];

  return (
    <footer className="bg-shrine-blue-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-shrine-blue-dark font-bold text-lg">
                ع
              </div>
              <h3 className="text-gold font-bold text-lg">{tSite("name")}</h3>
            </div>
            <p className="text-sm leading-7 text-gray-400">
              {t("about")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-bold text-base mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-bold text-base mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>{tSite("location")}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🌐</span>
                <span>alaskarian.net</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>info@alaskarian.net</span>
              </li>
            </ul>
          </div>
        </div>

        <GoldenDivider />

        <div className="text-center text-sm text-gray-500">
          <p>{t("copyright")} &copy; {new Date().getFullYear()} {tSite("name")}</p>
        </div>
      </div>
    </footer>
  );
}
