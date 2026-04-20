"use client";

import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import GoldenDivider from "@/components/ui/GoldenDivider";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Image from "next/image";

export default function AboutPreview() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Deep Parallax with Breath Easing
  const yImage = useTransform(scrollYProgress, [0, 1], ["-3.25rem", "3.25rem"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["1.5rem", "-1.5rem"]);

  return (
    <section ref={containerRef} className="py-[var(--spacing-fib-8)] px-4 relative overflow-hidden bg-white">
      {/* Dynamic Geometric Heartbeat Background - Subtle for Light Mode */}
      <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-fib-5)] lg:gap-[var(--spacing-fib-8)] items-center">
          
          {/* Sanctuary Image with Diffused Cloud Shadow */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative group">
              <motion.div 
                animate={{ scale: [1, 1.02, 1], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -inset-10 bg-gold/5 rounded-2xl blur-3xl group-hover:bg-gold/10 transition-all duration-700" 
              />
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gold/10">
                  <Image 
                    src="/about-shrine.png" 
                    alt="Al-Askari Holy Shrine" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transform scale-110 group-hover:scale-105 transition-all duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            </div>
          </motion.div>

          {/* Text Content - The Whisper Scale */}
          <motion.div
            style={{ y: yContent }}
            initial={{ opacity: 0, x: locale === "ar" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="order-1 lg:order-2 flex flex-col justify-center"
          >
            <h2 className="text-[2.5rem] sm:text-[3.25rem] font-bold gold-shimmer mb-10 tracking-tight leading-[1.1]">
              {locale === "ar" ? "عن المرقد الشريف" : "About the Holy Shrine"}
            </h2>
            <div className="mb-12 opacity-50">
              <GoldenDivider />
            </div>
            
            <div className="space-y-10 text-gray-600 text-lg sm:text-[1.125rem] leading-[1.8] font-light tracking-wide">
              <p>
                {locale === "ar" 
                  ? "يُعد مرقد الإمامين علي الهادي والحسن العسكري عليهما السلام في مدينة سامراء من أقدس المراقد الإسلامية في العالم. يتميز المرقد بقبته الذهبية الشهيرة التي تعد رمزاً للمدينة المقدسة."
                  : "The Holy Shrine of Imams Ali al-Hadi and al-Hasan al-Askari (peace be upon them) in Samarra is one of the holiest Islamic shrines in the world. It is famous for its golden dome, a symbol of the holy city."}
              </p>
              <p>
                {locale === "ar" 
                  ? "تسعى العتبة العسكرية المقدسة لتقديم أفضل الخدمات للزوار الكرام من إطعام وإيواء وخدمات تعليمية وثقافية متنوعة، بالإضافة إلى مشاريع الإعمار والتوسعة المستمرة."
                  : "The Al-Askari Holy Shrine seeks to provide the best services to honorable visitors, including catering, accommodation, and various educational and cultural services, in addition to ongoing reconstruction and expansion projects."}
              </p>
            </div>

            <div className="mt-14">
              <Link href="/about">
                <Button variant="secondary" size="lg" className="px-14 group tracking-widest font-light">
                   {t("about")}
                   <span className={cn("ml-3 transition-transform duration-700", locale === "ar" ? "rotate-180 -mr-3 ml-6 group-hover:-translate-x-3" : "group-hover:translate-x-3")}>
                    →
                   </span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
