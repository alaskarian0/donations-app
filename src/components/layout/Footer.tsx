"use client";

import { Link } from "@/i18n/routing";
import { SITE_NAME } from "@/lib/constants";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";

// Golden SVG Icons for Footer (Standardized 24x24px inside circles)
const ContactIcons = {
  address: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gold" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gold" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.986 0-5.7-1.099-7.843-2.918m15.686 0A8.996 8.996 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gold" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
};

export default function Footer() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [serenity, setSerenity] = useState(false);

  useEffect(() => {
    if (serenity) {
      document.body.classList.add("serenity-mode");
    } else {
      document.body.classList.remove("serenity-mode");
    }
  }, [serenity]);

  return (
    <footer className="bg-shrine-blue-dark text-white pt-[var(--spacing-fib-8)] pb-16 border-t border-gold/5 relative overflow-hidden theme-shrine-dark">
      {/* Background Heartbeat for the footer base */}
      <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.015] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--spacing-fib-2)] mb-[var(--spacing-fib-5)]">

          {/* Section 1: Logo & Mission (Sanctuary Bento) */}
          <div className="p-[var(--spacing-fib-3)] rounded-[3rem] glass-sanctuary flex flex-col justify-between overflow-hidden relative shadow-cloud min-h-[24rem]">
            <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 text-start">
              <div className="flex items-center gap-6 mb-10">
                <Image
                  src="/image.png"
                  alt={SITE_NAME}
                  width={64}
                  height={64}
                  className="object-contain logo-gold-filter drop-shadow-md"
                />
                <span className="text-[1.5rem] font-bold gold-shimmer tracking-widest uppercase">{SITE_NAME}</span>
              </div>
              <p className="text-gray-400 text-base leading-[1.8] mb-12 font-light tracking-wide italic">
                {locale === "ar"
                  ? "الموقع الرسمي للتبرعات للعتبة العسكرية المقدسة. نهدف إلى تسهيل عملية المساهمة في إعمار وخدمة المرقد الشريف لجميع المحبين في كل أنحاء العالم."
                  : "The official donation portal for the Al-Askari Holy Shrine. We aim to facilitate contributing to the reconstruction and service of the Holy Shrine for all lovers worldwide."}
              </p>
            </div>

            <div className="flex gap-6 relative z-10">
              {/* Telegram */}
              <a href="https://t.me/alaskarian_net" target="_blank" className="w-11 h-11 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 transition-all duration-700 cursor-pointer group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold/80 group-hover:text-gold transition-colors">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2s-.21-.05-.3-.03c-.11.02-1.92 1.21-5.41 3.57-.51.35-.97.52-1.38.52-.46 0-1.33-.25-1.98-.46-.8-.26-1.45-.4-1.39-.85.03-.24.3-.48.79-.74 3.08-1.34 5.15-2.23 6.19-2.66 2.95-1.23 3.56-1.44 3.97-1.44.09 0 .28.02.41.09.11.06.19.14.23.23.05.11.06.23.04.35z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/964" target="_blank" className="w-11 h-11 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 transition-all duration-700 cursor-pointer group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold/80 group-hover:text-gold transition-colors">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.814 9.814 0 0012.04 2zM6.07 17.51l-.27-.43c-.81-1.29-1.24-2.77-1.24-4.3 0-4.51 3.67-8.18 8.18-8.18 2.18 0 4.23.85 5.78 2.4s2.4 3.6 2.4 5.78c0 4.51-3.67 8.18-8.18 8.18-1.59 0-3.14-.46-4.48-1.33l-.43-.28-3.33.88.89-3.42z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com/alaskarian" target="_blank" className="w-11 h-11 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 transition-all duration-700 cursor-pointer group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold/80 group-hover:text-gold transition-colors">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Section 2: Navigation (Sanctuary Bento) */}
          <div className="p-[var(--spacing-fib-3)] rounded-[3rem] glass-sanctuary flex flex-col overflow-hidden relative shadow-cloud min-h-[24rem]">
            <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.03] pointer-events-none" />

            <h3 className="text-gold font-bold mb-12 text-[1.125rem] tracking-[0.2em] uppercase gold-shimmer relative z-10">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>

            <ul className="space-y-8 relative z-10">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold transition-all duration-700 text-sm font-black tracking-widest uppercase block border-b border-gold/5 pb-4">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-300 hover:text-gold transition-all duration-700 text-sm font-black tracking-widest uppercase block border-b border-gold/5 pb-4">
                  {t("donate")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold transition-all duration-700 text-sm font-black tracking-widest uppercase block">
                  {t("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact & Serenity (Sanctuary Bento) */}
          <div className="p-[var(--spacing-fib-3)] rounded-[3rem] glass-sanctuary relative overflow-hidden shadow-cloud flex flex-col justify-between group min-h-[24rem]">
            <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 text-start">
              <h3 className="text-gold font-bold mb-10 text-[1.125rem] tracking-[0.2em] uppercase gold-shimmer">
                {locale === "ar" ? "تواصل معنا" : "Contact Us"}
              </h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="shrink-0 mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-700">{ContactIcons.address}</div>
                  <span className="text-gray-300 text-sm leading-[1.8] font-light tracking-wide italic">
                    {locale === "ar" ? "العراق، سامراء، العتبة العسكرية المقدسة" : "Iraq, Samarra, Al-Askari Holy Shrine"}
                  </span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-700">{ContactIcons.web}</div>
                  <a href="https://alaskarian.net" target="_blank" className="text-gray-300 hover:text-gold transition-all duration-700 text-sm font-black tracking-widest uppercase">
                    alaskarian.net
                  </a>
                </li>
              </ul>
            </div>

            {/* Serenity Mode Sensory Switch */}
            <div className="mt-10 pt-8 border-t border-gold/10 relative z-10 flex justify-start">
              <button
                onClick={() => setSerenity(!serenity)}
                className={cn(
                  "flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-1000 border group/btn",
                  serenity
                    ? "bg-gold text-shrine-blue-dark border-gold shadow-gold-glow"
                    : "bg-transparent text-gold/60 border-gold/20 hover:border-gold hover:text-gold"
                )}
              >
                <div className={cn("w-3 h-3 rounded-full transition-all duration-1000", serenity ? "bg-shrine-blue-dark scale-125" : "bg-gold-dark scale-100 group-hover/btn:scale-110")} />
                <span className="text-[0.65rem] font-black uppercase tracking-[0.3em] leading-none">
                  {serenity
                    ? (locale === "ar" ? "وضع السكينة: مفعل" : "Serenity Mode: ON")
                    : (locale === "ar" ? "تفعيل وضع السكينة" : "Enter Serenity Mode")}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Ethereal Floating Divider */}
        <div
          className="h-px w-full mb-12 opacity-20"
          style={{
            background: "linear-gradient(to right, transparent, var(--color-gold), transparent)"
          }}
        />

        {/* Copyright & Sanctuary Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 text-xs text-center md:text-right font-extralight tracking-widest uppercase">
            {locale === "ar"
              ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} العتبة العسكرية المقدسة`
              : `All rights reserved © ${new Date().getFullYear()} Al-Askari Holy Shrine`}
          </p>
          <div className="flex gap-12">
            <span className="text-gray-600 text-[0.65rem] hover:text-gold cursor-pointer transition-all duration-700 uppercase tracking-[0.34em] font-black italic">
              {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </span>
            <span className="text-gray-600 text-[0.65rem] hover:text-gold cursor-pointer transition-all duration-700 uppercase tracking-[0.34em] font-black italic">
              {locale === "ar" ? "شروط الخدمة" : "Terms of Service"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
