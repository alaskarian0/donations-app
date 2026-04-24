"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";

const SOCIAL = [
  {
    label: "Facebook",
    href: "#",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a2 2 0 012 2v7a2 2 0 01-2 2h-11a2 2 0 01-2-2v-7a2 2 0 012-2z",
    strokeOnly: true,
  },
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
    viewBox: "0 0 24 24",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
];

const PAYMENT_PARTNERS = [
  { name: "Mastercard", abbr: "MC" },
  { name: "AsiaPay", abbr: "AP" },
  { name: "QiCard", abbr: "QI" },
  { name: "TASDID", abbr: "TS" },
  { name: "Trade Bank of Iraq", abbr: "TBI" },
  { name: "Zain Cash", abbr: "ZC" },
  { name: "Digital Zain", abbr: "DZ" },
  { name: "VISA", abbr: "VISA" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("site");
  const tNav = useTranslations("nav");

  const quickLinks = [
    { href: "/about", label: t("aboutFund") },
    { href: "/", label: tNav("home") },
    { href: "/donate", label: tNav("initiatives") },
    { href: "/donate", label: tNav("donate") },
  ];

  return (
    <footer>
      {/* Payment Partners Row */}
      <div className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-[#1a5c38] font-bold text-2xl mb-8">
            بالتعاون مع
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {/* Mastercard */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-red-500 opacity-80" />
              <div className="w-8 h-8 rounded-full bg-orange-400 opacity-80 -ml-4" />
            </div>
            {/* AsiaPay */}
            <span className="font-bold text-gray-700 text-lg tracking-tight">AsiaPay</span>
            {/* QiCard */}
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-800 text-sm">QiCard</span>
              <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">Q</span>
              </div>
              <span className="text-gray-600 text-xs">كي كارد</span>
            </div>
            {/* TASDID */}
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-green-700 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <span className="font-bold text-gray-700">TASDID</span>
              <span className="text-gray-500 text-sm">تسديد</span>
            </div>
            {/* Trade Bank */}
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <span className="text-gray-600 text-xs">البنك التجاري العراقي</span>
            </div>
            {/* Zain Cash */}
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">z</span>
              </div>
              <span className="font-bold text-gray-700 italic">zain</span>
              <span className="text-green-600 text-xs font-semibold">CASH</span>
            </div>
            {/* Digital Zain */}
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-gray-800 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">D</span>
              </div>
              <span className="font-bold text-gray-800">ديجتال زون</span>
            </div>
            {/* VISA */}
            <span className="font-black text-[#1a1f71] text-2xl tracking-wider italic">VISA</span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#e8f5ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Col 1 — Logo + Description */}
            <div className="md:col-span-1">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full border-2 border-[#1a5c38]/30 bg-[#1a5c38]/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
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
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[#1a5c38] font-bold text-base leading-snug">{tSite("name")}</span>
                  <span className="text-gray-500 text-xs">{tSite("location")}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-7 mb-6">
                {t("about")}
              </p>

              {/* Social icons */}
              <p className="text-gray-500 text-sm font-semibold mb-3">تابعنا على مواقعنا</p>
              <div className="flex items-center gap-2">
                {SOCIAL.map(({ label, href, path, strokeOnly, viewBox }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-[#1a5c38]/30 bg-white flex items-center justify-center text-[#1a5c38] hover:bg-[#1a5c38] hover:text-white hover:border-[#1a5c38] transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox={viewBox ?? "0 0 24 24"}
                      className="w-4 h-4"
                      fill={strokeOnly ? "none" : "currentColor"}
                      stroke={strokeOnly ? "currentColor" : "none"}
                      strokeWidth={strokeOnly ? 2 : 0}
                      strokeLinecap={strokeOnly ? "round" : undefined}
                      strokeLinejoin={strokeOnly ? "round" : undefined}
                    >
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Important Links */}
            <div>
              <h4 className="text-[#1a5c38] font-bold text-base mb-6">الروابط المهمة</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#1a5c38] transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-[#1a5c38] text-base leading-none">›</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Quick Contact */}
            <div>
              <h4 className="text-[#1a5c38] font-bold text-base mb-6">الاتصال السريع</h4>
              <ul className="space-y-4">
                <li>
                  <p className="text-xs text-gray-500 font-medium mb-1">{tSite("location")}</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#1a5c38] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{tSite("location")}</span>
                  </div>
                </li>
                <li>
                  <p className="text-xs text-gray-500 font-medium mb-1">البريد الإلكتروني</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#1a5c38] shrink-0" />
                    <a href="mailto:info@alaskarian.net" className="text-sm text-gray-600 hover:text-[#1a5c38] transition-colors">
                      info@alaskarian.net
                    </a>
                  </div>
                </li>
                <li>
                  <p className="text-xs text-gray-500 font-medium mb-1">للاتصال بنا</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#1a5c38] shrink-0" />
                    <a href="tel:7374" className="text-sm text-gray-600 hover:text-[#1a5c38] transition-colors">
                      7374
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-[#1a5c38]/10 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p>{t("copyright")}</p>
            <p>{tSite("name")} &mdash; {tSite("location")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
