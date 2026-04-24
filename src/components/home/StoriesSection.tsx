"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

const FEATURED = {
  image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Al-Askari_Shrine%2C_days_before_Arbaeen_-_Oct_2018_01.jpg",
  titleAr: "المساهمة في إعمار المرقد\nشرف لا يُعوَّض",
  titleEn: "Contributing to the Shrine's\nRestoration is an Irreplaceable Honor",
  bodyAr:
    "بين أهلنا وناسنا، نؤمن أن كل مؤمن يستحق أن يرى المرقد الشريف بأبهى حلة دون أن يكون المال عائقاً. وكل متبرع يستحق أن يعلم أن مساهمته تبني حجراً في هذا الصرح العظيم. العطاء حق، لأن المرقد ملك للجميع.",
  bodyEn:
    "Among our people and families, we believe every believer deserves to see the Holy Shrine in its finest form — without money being a barrier. Every donor deserves to know their contribution is laying a stone in this great edifice. Giving is a right, because the shrine belongs to everyone.",
};

const STORIES = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Samarra_-_Oct_2018_01.jpg",
    titleAr: "توسعة الصحن الشريف",
    titleEn: "Expansion of the Sacred Courtyard",
    excerptAr: "مشروع توسعة الصحن الشريف",
    excerptEn: "Sacred Courtyard Expansion Project",
    detailAr1:
      "تشمل هذه المرحلة توسعة الصحن الشريف بمساحة إضافية تبلغ ٢٠٠٠ متر مربع، لاستيعاب أعداد أكبر من الزوار والحجاج القادمين من مختلف أنحاء العالم.",
    detailAr2:
      "يتضمن المشروع تطوير ممرات الوصول وتحسين الخدمات المقدمة للزوار، مع الحفاظ على الطابع المعماري الأصيل للمرقد الشريف.",
    detailEn1:
      "This phase includes expanding the sacred courtyard by an additional 2,000 square meters to accommodate larger numbers of visitors and pilgrims arriving from around the world.",
    detailEn2:
      "The project includes developing access corridors and improving visitor services, while preserving the authentic architectural character of the Holy Shrine.",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/%D8%A7%D9%84%D8%B3%D8%A7%D8%B9%D8%A9_%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A%D8%A9_%D9%81%D9%8A_%D8%B3%D8%A7%D9%85%D8%B1%D8%A7%D8%A1.jpg",
    titleAr: "إعادة بناء القبة الذهبية",
    titleEn: "Golden Dome Reconstruction",
    excerptAr: "مشروع ترميم وإعادة بناء القبة",
    excerptEn: "Dome Restoration & Reconstruction Project",
    detailAr1:
      "يهدف مشروع إعادة بناء القبة الذهبية إلى استعادة رونقها وبريقها الأصيل، باستخدام أجود أنواع الذهب والمواد التراثية وفق المعايير الهندسية الحديثة.",
    detailAr2:
      "يضم الفريق المنفذ نخبة من المهندسين والحرفيين المتخصصين في التراث المعماري الإسلامي، لضمان الحفاظ على الهوية الروحية والتاريخية للمرقد.",
    detailEn1:
      "The golden dome reconstruction project aims to restore its authentic splendor and brilliance, using the finest gold and heritage materials according to modern engineering standards.",
    detailEn2:
      "The executing team includes elite engineers and craftsmen specializing in Islamic architectural heritage, ensuring the spiritual and historical identity of the shrine is preserved.",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/%D9%85%D8%B1%D9%82%D8%AF_%D8%A7%D9%84%D8%A7%D9%85%D8%A7%D9%85%D9%8A%D9%86_%D8%A7%D9%84%D8%B9%D8%B3%D9%83%D8%B1%D9%8A%D9%8A%D9%86_%D9%84%D9%8A%D9%84%D8%A7%D9%8B.jpg",
    titleAr: "تطوير البنية التحتية",
    titleEn: "Infrastructure Development",
    excerptAr: "مشروع تطوير الخدمات والبنية التحتية",
    excerptEn: "Services & Infrastructure Development Project",
    detailAr1:
      "يشمل المشروع تحديث منظومة الكهرباء والإضاءة وأنظمة التكييف في جميع أجزاء المرقد، إضافةً إلى تطوير شبكات المياه والصرف الصحي لخدمة الملايين من الزوار سنوياً.",
    detailAr2:
      "كما يتضمن إنشاء مراكز خدمات متكاملة ومواقف للسيارات وممرات للمشاة، لتوفير تجربة زيارة آمنة ومريحة تليق بمكانة المرقد الشريف.",
    detailEn1:
      "The project includes modernizing the electricity, lighting, and air conditioning systems across all parts of the shrine, along with upgrading water and sewage networks to serve millions of visitors annually.",
    detailEn2:
      "It also involves building integrated service centers, parking facilities, and pedestrian walkways to provide a safe and comfortable visit experience befitting the stature of the Holy Shrine.",
  },
];

type Story = typeof STORIES[number];

function StoryCard({ story, index, isAr }: { story: Story; index: number; isAr: boolean }) {
  const [hovered, setHovered] = useState(false);

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
      {/* Image */}
      <div className="shrink-0" style={{ height: "200px" }}>
        <img
          src={story.image}
          alt={isAr ? story.titleAr : story.titleEn}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Always-visible title */}
      <div className="px-4 pt-3 pb-2">
        <h3 className="font-bold text-base leading-snug" style={{ color: "#1a5c38" }}>
          {isAr ? story.titleAr : story.titleEn}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {isAr ? story.excerptAr : story.excerptEn}
        </p>
      </div>

      {/* Description — animated on hover */}
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
                {isAr ? story.detailAr1 : story.detailEn1}
              </p>
              <p className="text-gray-500 text-xs leading-5">
                {isAr ? story.detailAr2 : story.detailEn2}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StoriesSection() {
  const locale = useLocale();
  const isAr = locale === "ar" || locale === "fa";

  return (
    <section className="py-16 sm:py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* ── Featured row: image left + text right ── */}
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
              {isAr ? FEATURED.titleAr : FEATURED.titleEn}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-8">
              {isAr ? FEATURED.bodyAr : FEATURED.bodyEn}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md order-2">
            <img
              src={FEATURED.image}
              alt="featured"
              className="w-full h-72 sm:h-96 object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* ── Story cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {STORIES.map((story, i) => (
            <StoryCard key={i} story={story} index={i} isAr={isAr} />
          ))}
        </div>

      </div>
    </section>
  );
}
