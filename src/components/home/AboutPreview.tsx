"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocale } from "next-intl";
import Button from "@/components/ui/Button";


const BULLETS = [
  { ar: "إعادة بناء القبة الذهبية والمئذنتين", en: "Rebuilding the Golden Dome and twin minarets" },
  { ar: "توسعة الصحن الشريف وتطوير المداخل", en: "Expanding the sacred courtyard and entrances" },
  { ar: "تحديث كامل للبنية التحتية والشبكات", en: "Full infrastructure and network modernization" },
];

export default function AboutPreview() {
  const t = useTranslations("aboutPreview");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "fa";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="about" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Gold accent line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 bg-[#1a5c38] rounded-full" />
              <div className="w-4 h-1 bg-[#1a5c38]/40 rounded-full" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a5c38] mb-5 leading-snug">
              {t("title")}
            </h2>

            <p className="text-gray-500 leading-8 mb-4 text-sm sm:text-base">
              {t("p1")}
            </p>
            <p className="text-gray-500 leading-8 mb-7 text-sm sm:text-base">
              {t("p2")}
            </p>

            {/* Bullet list */}
            <ul className="space-y-3 mb-8">
              {BULLETS.map((b) => (
                <li key={b.en} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1a5c38] shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm leading-6">
                    {locale === "ar" ? b.ar : b.en}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/about">
              <Button variant="secondary" size="md" className="gap-2">
                {t("readMore")}
                <ArrowIcon className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
