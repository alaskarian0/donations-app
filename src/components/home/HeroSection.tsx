"use client";

import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/constants";
import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth Parallax transitions with Breath easing
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pb-[var(--spacing-fib-8)] theme-shrine-dark"
    >
      {/* Soft Ambient Background with Heartbeat Geometry */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-ambient"
      >
        <div className="holy-particles" />
        <div className="absolute inset-0 geometry-heartbeat geometric-bg" />
      </motion.div>

      <motion.div
        style={{ y: yBg, opacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12)_0%,_transparent_70%)]"
      />

      {/* Content Layer (The Whisper Philosophy) */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Floating Logo Sanctuary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="inline-block relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 bg-gold/10 rounded-full blur-3xl"
            />
            <div className="w-[7rem] h-[7rem] sm:w-[8.5rem] sm:h-[8.5rem] mx-auto relative rounded-full flex items-center justify-center p-7 border border-gold/10 backdrop-blur-md">
              <Image
                src="/image.png"
                alt={SITE_NAME}
                width={120}
                height={120}
                priority
                unoptimized
                className="w-full h-full object-contain logo-gold-filter drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-[3.5rem] sm:text-[4.5rem] font-bold mb-10 gold-shimmer tracking-tight leading-[1.1] drop-shadow-sm"
        >
          {SITE_NAME}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-gold-light/80 text-xl sm:text-[1.75rem] mb-8 font-light tracking-wide leading-tight max-w-2xl mx-auto italic"
        >
          {t("subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="text-gray-400 text-lg sm:text-[1.125rem] mb-16 font-extralight max-w-3xl mx-auto leading-[1.8] tracking-widest uppercase"
        >
          {t("desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-10 justify-center"
        >
          <Link href="/donate">
            <Button size="lg" className="px-16 shadow-gold-glow">
              {t("cta_donate")}
              <motion.span
                animate={{ x: locale === "ar" ? -8 : 8 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                className="inline-block opacity-60"
              >
                {locale === "ar" ? "←" : "→"}
              </motion.span>
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="px-16 backdrop-blur-md border-gold/20 text-gold-light hover:bg-gold/5 font-light tracking-wide">
              {t("cta_about")}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Fibonacci Extended Bottom Fade (Digital Cloud) */}
      <div className="absolute bottom-0 left-0 right-0 hero-bottom-fade pointer-events-none" />
    </section>
  );
}
