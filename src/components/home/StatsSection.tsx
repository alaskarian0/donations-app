"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Hammer,
  Maximize2,
  Users,
  CalendarDays,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Hammer,
  Maximize2,
  Users,
  CalendarDays,
};

const STATS_DATA = [
  { key: "projects", value: 47, icon: "Hammer" },
  { key: "sqmeters", value: 15200, icon: "Maximize2" },
  { key: "donors", value: 12500, icon: "Users" },
  { key: "years", value: 25, icon: "CalendarDays" },
];

function AnimatedCounter({
  target,
  inView,
  locale,
}: {
  target: number;
  inView: boolean;
  locale: string;
}) {
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
    <span
      className="text-3xl sm:text-4xl lg:text-5xl font-bold tabular-nums"
      style={{ color: "#ffffff" }}
    >
      {count.toLocaleString(locale === "ar" ? "ar-IQ" : locale === "fa" ? "fa-IR" : "en-US")}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("stats");
  const locale = useLocale();

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 geometric-bg"
      style={{ backgroundColor: "#1a5c38" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: "#ffffff" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-sm sm:text-base"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS_DATA.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon] ?? Hammer;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="text-center group"
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-colors duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <Icon
                    className="w-7 h-7 transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  />
                </div>
                <AnimatedCounter
                  target={stat.value}
                  inView={inView}
                  locale={locale}
                />
                <p
                  className="text-sm sm:text-base mt-2"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {t(stat.key)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
