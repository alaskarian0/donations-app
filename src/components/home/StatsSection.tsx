"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { STATS } from "@/lib/constants";

import { useTranslations, useLocale } from "next-intl";

function AnimatedCounter({ target, inView, locale }: { target: number; inView: boolean; locale: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold tabular-nums">
      {count.toLocaleString(locale === "ar" ? "ar-IQ" : "en-US")}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const locale = useLocale();
  const t = useTranslations("Stats");
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-[var(--spacing-fib-8)] px-4 relative overflow-hidden bg-white">
       {/* Islamic Geometry Background Pulse - Subtle for light mode */}
      <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-[2.5rem] sm:text-[3rem] font-bold gold-shimmer mb-6 tracking-tight leading-none">
            {t("title")}
          </h2>
          <div className="h-px w-24 bg-gold/30 mx-auto mb-8" />
          <p className="text-gray-500 text-lg font-light tracking-wide italic">
             {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="text-center relative group"
            >
              <div className="text-4xl sm:text-5xl mb-8 group-hover:scale-110 transition-transform duration-700">{stat.icon}</div>
              <div className="relative mb-4">
                <AnimatedCounter target={stat.value} inView={inView} locale={locale} />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold/10 group-hover:w-12 group-hover:bg-gold/30 transition-all duration-700" />
              </div>
              <p className="text-gray-500 text-[0.75rem] sm:text-[0.85rem] mt-6 uppercase tracking-[0.25em] font-black group-hover:text-gold transition-colors duration-700">
                {t(stat.id)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
