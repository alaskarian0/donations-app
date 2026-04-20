"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeroPage = pathname === "/" || pathname === "/donate" || pathname === "/about";
  
  // Scroll animations for Header (Breath Easing)
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 100], isHeroPage ? ["5.5rem", "4.5rem"] : ["4.5rem", "4.5rem"]);
  
  // Transition from transparent (over dark hero) to white (over light content)
  // Only apply transparency on pages with a Hero section at the top
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    isHeroPage ? ["rgba(5, 11, 20, 0)", "rgba(255, 255, 255, 0.98)"] : ["rgba(255, 255, 255, 0.98)", "rgba(255, 255, 255, 0.98)"]
  );
  
  const textColor = useTransform(
    scrollY,
    [0, 100],
    isHeroPage ? ["rgba(255, 255, 255, 0.95)", "rgba(5, 11, 20, 0.8)"] : ["rgba(5, 11, 20, 0.8)", "rgba(5, 11, 20, 0.8)"]
  );

  const borderOpacity = useTransform(scrollY, [0, 100], isHeroPage ? [0, 0.1] : [0.1, 0.1]);
  const borderColor = useTransform(borderOpacity, (o) => `rgba(212, 175, 55, ${o})`);
  const blur = useTransform(scrollY, [0, 100], isHeroPage ? ["blur(0px)", "blur(20px)"] : ["blur(20px)", "blur(20px)"]);
  const brandingOpacity = useTransform(scrollY, [60, 120], isHeroPage ? [0, 1] : [1, 1]);

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
          <div className="flex items-center justify-between w-full h-full">
            {/* 1. Leading Side: Branding */}
            <div className="flex-1 flex justify-start">
              <motion.div
                animate={{ 
                  opacity: (scrolled || !isHeroPage) ? 1 : 0,
                  x: (scrolled || !isHeroPage) ? 0 : (locale === 'ar' ? 40 : -40),
                  display: (scrolled || !isHeroPage) ? "block" : "none"
                }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <Link href="/" className="flex items-center gap-4 group whitespace-nowrap">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                    <Image
                      src="/image.png"
                      alt={tc("site_name")}
                      fill
                      className="object-contain logo-gold-filter"
                    />
                  </div>
                  <span className="text-gold font-bold text-base sm:text-xl hidden sm:block uppercase gold-shimmer">
                    {tc("site_name")}
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* 2. Middle: Nav Links */}
            <div className="flex-1 hidden md:flex justify-center">
              <div className="flex items-center gap-12">
                {navLinks.map((link) => (
                  <motion.div key={link.href}>
                    <Link
                      href={link.href}
                      style={{ color: pathname === link.href ? "var(--color-gold)" : undefined }}
                      className={cn(
                        "text-[0.75rem] font-bold uppercase transition-all duration-700 hover:scale-105",
                        pathname === link.href ? "text-gold" : "hover:text-gold opacity-80"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3. Trailing Side: Actions */}
            <div className="flex-1 flex justify-end items-center gap-6">
              {/* Desktop Buttons */}
              <div className="hidden md:flex items-center gap-6">
                <motion.button
                  onClick={toggleLocale}
                  style={{ borderColor: useTransform(scrollY, [0, 80], ["rgba(212, 175, 55, 0.2)", "rgba(212, 175, 55, 0.1)"]) }}
                  className="hover:text-gold text-[0.7rem] font-bold uppercase transition-all px-4 py-1.5 border rounded-xl hover:border-gold/40"
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
                <button onClick={toggleLocale} className="text-[0.7rem] text-gold border border-gold/20 px-4 py-1 rounded-xl font-bold uppercase">
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
        </div>
      </motion.nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
