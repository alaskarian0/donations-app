"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/7/77/Al-Askari_Shrine%2C_days_before_Arbaeen_-_Oct_2018_01.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/df/Samarra_-_Oct_2018_01.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/ee/%D8%A7%D9%84%D8%B3%D8%A7%D8%B9%D8%A9_%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A%D8%A9_%D9%81%D9%8A_%D8%B3%D8%A7%D9%85%D8%B1%D8%A7%D8%A1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/da/%D9%85%D8%B1%D9%82%D8%AF_%D8%A7%D9%84%D8%A7%D9%85%D8%A7%D9%85%D9%8A%D9%86_%D8%A7%D9%84%D8%B9%D8%B3%D9%83%D8%B1%D9%8A%D9%8A%D9%86_%D9%84%D9%8A%D9%84%D8%A7%D9%8B.jpg",
];

const STORY_KEYS = ["story1", "story2", "story3"] as const;

function StoryCard({ storyKey, image, index }: { storyKey: string; image: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const t = useTranslations("stories");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border border-gray-100 cursor-pointer flex flex-col overflow-hidden shadow-sm"
      style={{
        backgroundColor: hovered ? "#e8f5ee" : "#ffffff",
        transition: "background-color 0.4s ease",
      }}
    >
      <div className="shrink-0" style={{ height: "200px" }}>
        <img
          src={image}
          alt={t(`${storyKey}Title` as any)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="px-4 pt-3 pb-2">
        <h3 className="font-bold text-base leading-snug" style={{ color: "#1a5c38" }}>
          {t(`${storyKey}Title` as any)}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {t(`${storyKey}Excerpt` as any)}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {hovered && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
            className="px-4"
          >
            <div className="pb-5 pt-2 border-t border-[#1a5c38]/10">
              <p className="text-gray-600 text-xs leading-5 mb-2">
                {t(`${storyKey}Detail1` as any)}
              </p>
              <p className="text-gray-500 text-xs leading-5">
                {t(`${storyKey}Detail2` as any)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StoriesSection() {
  const t = useTranslations("stories");

  return (
    <section className="py-16 sm:py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* ── Featured row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="order-1 flex flex-col justify-center">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-5"
              style={{ color: "#1a5c38", whiteSpace: "pre-line" }}
            >
              {t("featuredTitle")}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-8">
              {t("featuredBody")}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md order-2">
            <img
              src={IMAGES[0]}
              alt="featured"
              className="w-full h-72 sm:h-96 object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* ── Story cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {STORY_KEYS.map((key, i) => (
            <StoryCard key={key} storyKey={key} image={IMAGES[i + 1]} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
