"use client";

import { useState } from "react";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Nav");

  // Scroll animations for Header (Breath Easing)
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 80], ["6.5rem", "5rem"]);
  
  // Transition from transparent (over dark hero) to white (over light content)
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(5, 11, 20, 0)", "rgba(255, 255, 255, 0.98)"]
  );
  
  const textColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0.9)", "rgba(5, 11, 20, 0.8)"]
  );

  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);
  const borderColor = useTransform(borderOpacity, (o) => `rgba(212, 175, 55, ${o})`);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(20px)"]);
  const brandingOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  const toggleLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/donate", label: t("donate") },
    { href: "/about", label: t("about") },
  ];

  return (
    <>
      <motion.nav
        style={{
          height,
          backgroundColor,
          backdropFilter: blur,
          borderColor,
          color: textColor
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b flex items-center shadow-premium-sm transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            {/* Branding */}
            <Link href="/" className="flex items-center gap-4 group">
              <motion.div
                style={{ opacity: brandingOpacity, scale: useTransform(scrollY, [0, 80], [0.95, 1]) }}
                className="w-10 h-10 sm:w-12 sm:h-12 relative"
              >
                <Image
                  src="/image.png"
                  alt={SITE_NAME}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain logo-gold-filter"
                />
              </motion.div>
              <motion.span
                style={{ opacity: brandingOpacity }}
                className="text-gold font-bold text-base sm:text-xl hidden sm:block tracking-widest uppercase gold-shimmer"
              >
                {SITE_NAME}
              </motion.span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <motion.div key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: pathname === link.href ? "var(--color-gold)" : undefined }}
                    className={cn(
                      "text-[0.7rem] font-bold uppercase tracking-[0.25em] transition-all duration-700 hover:scale-105",
                      pathname === link.href
                        ? "text-gold"
                        : "hover:text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.button
                onClick={toggleLocale}
                style={{ borderColor: useTransform(scrollY, [0, 80], ["rgba(212, 175, 55, 0.2)", "rgba(212, 175, 55, 0.1)"]) }}
                className="hover:text-gold text-[0.65rem] font-black tracking-[0.3em] uppercase transition-all px-4 py-1.5 border rounded-full hover:border-gold/40"
              >
                {locale === "ar" ? "English" : "العربية"}
              </motion.button>

              <Link href="/donate">
                <Button size="sm" className="shadow-gold-glow px-8">
                  {t("donate")}
                </Button>
              </Link>
            </div>

            {/* Mobile Trigger */}
            <div className="flex items-center gap-6 md:hidden">
              <button onClick={toggleLocale} className="text-[0.65rem] text-gold border border-gold/20 px-4 py-1 rounded-full font-black tracking-widest">
                {locale === "ar" ? "EN" : "AR"}
              </button>
              <button onClick={() => setMobileOpen(true)} className="text-gold/80 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
