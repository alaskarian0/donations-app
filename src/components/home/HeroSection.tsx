"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-0">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full rounded-b-3xl overflow-hidden" style={{ height: "100dvh" }}>
          {/* Background image — Al-Askari Holy Shrine, Samarra */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/da/%D9%85%D8%B1%D9%82%D8%AF_%D8%A7%D9%84%D8%A7%D9%85%D8%A7%D9%85%D9%8A%D9%86_%D8%A7%D9%84%D8%B9%D8%B3%D9%83%D8%B1%D9%8A%D9%8A%D9%86_%D9%84%D9%8A%D9%84%D8%A7%D9%8B.jpg"
            alt="العتبة العسكرية المقدسة - سامراء"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

          {/* Bottom Quranic ayah overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <p
                className="text-white font-bold leading-tight drop-shadow-2xl"
                style={{
                  fontSize: "clamp(1.6rem, 5vw, 4rem)",
                  fontFamily: "var(--font-arabic), serif",
                  textShadow: "0 2px 24px rgba(0,0,0,0.9)",
                  lineHeight: 1.5,
                }}
              >
                إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ
              </p>
              <p
                className="text-white/70 mt-2"
                style={{
                  fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                  fontFamily: "var(--font-arabic), serif",
                  textShadow: "0 1px 8px rgba(0,0,0,0.8)",
                }}
              >
                سورة التوبة — الآية ١٨
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
