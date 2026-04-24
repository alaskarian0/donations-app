"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PageHero() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section
      className="relative overflow-hidden -mt-[72px] sm:-mt-[80px] pt-[72px] sm:pt-[80px]"
      style={{ backgroundColor: "#f8fdf9" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(26,92,56,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(26,92,56,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
          style={{ borderColor: "rgba(26,92,56,0.2)", backgroundColor: "rgba(26,92,56,0.06)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#1a5c38" }} />
          <span className="text-xs font-semibold" style={{ color: "#1a5c38" }}>
            {isAr ? "العتبة العسكرية المقدسة — سامراء" : "Al-Askari Holy Shrine — Samarra"}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-bold leading-tight mb-5"
          style={{
            color: "#1a5c38",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.25,
            fontFamily: "var(--font-arabic), serif",
          }}
        >
          {isAr
            ? "ساهم في إعمار المرقد الشريف"
            : "Contribute to the Holy Shrine's Restoration"}
        </motion.h1>

        {/* Ayah */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-medium mb-2"
          style={{
            color: "#1a5c38",
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            fontFamily: "var(--font-arabic), serif",
            opacity: 0.8,
          }}
        >
          إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-xs mb-8"
          style={{ color: "#6b7280" }}
        >
          {isAr ? "سورة التوبة — الآية ١٨" : "Surah At-Tawbah — Verse 18"}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-500 max-w-xl mb-10 leading-7"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}
        >
          {isAr
            ? "كل تبرع يبني حجراً في هذا الصرح العظيم. اختر بابك وساهم في خدمة المرقد الشريف."
            : "Every donation lays a stone in this great edifice. Choose your gate and serve the Holy Shrine."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/donate"
            className="px-7 py-3.5 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1a5c38" }}
          >
            {isAr ? "ساهم الآن" : "Donate Now"}
          </Link>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3.5 rounded-full font-bold text-sm border transition-colors hover:bg-gray-50"
            style={{ borderColor: "rgba(26,92,56,0.25)", color: "#1a5c38" }}
          >
            {isAr ? "تعرف أكثر" : "Learn More"}
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex items-center gap-3"
        >
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,92,56,0.2)" }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(26,92,56,0.3)" }} />
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(26,92,56,0.2)" }} />
        </motion.div>
      </div>
    </section>
  );
}
