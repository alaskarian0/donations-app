"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck, Award, Landmark, Globe } from "lucide-react";

const FEATURES = [
  { key: "transparency", Icon: ShieldCheck },
  { key: "quality", Icon: Award },
  { key: "heritage", Icon: Landmark },
  { key: "community", Icon: Globe },
] as const;

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a5c38] mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURES.map(({ key, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white border border-[#eeeeee] rounded-2xl p-6 text-center hover:shadow-[0_8px_40px_0_rgb(26_92_56_/_12%)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#e8f5ee] group-hover:bg-[#1a5c38] flex items-center justify-center transition-colors duration-300">
                <Icon className="w-7 h-7 text-[#1a5c38] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-gray-800 font-bold text-base mb-2">
                {t(`${key}.title`)}
              </h3>
              <p className="text-gray-500 text-sm leading-6">
                {t(`${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
