"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const STATS_DATA = [
  { key: "donors", value: 12500, icon: "👥" },
  { key: "meals", value: 45000, icon: "🍽️" },
  { key: "orphans", value: 850, icon: "🤲" },
  { key: "projects", value: 23, icon: "🏗️" },
];

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
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("stats");
  const locale = useLocale();

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-shrine-blue-dark geometric-bg">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-2">
            {t("title")}
          </h2>
          <p className="text-gray-400">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS_DATA.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl mb-3">{stat.icon}</div>
              <AnimatedCounter target={stat.value} inView={inView} locale={locale} />
              <p className="text-gray-400 text-sm sm:text-base mt-2">{t(stat.key)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
