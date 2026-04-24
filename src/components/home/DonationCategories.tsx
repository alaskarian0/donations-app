"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Star,
  Building2,
  Home,
  Heart,
  Users,
  LucideIcon,
} from "lucide-react";
import { DONATION_TYPES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Star,
  Building2,
  Home,
  Heart,
  Users,
};

export default function DonationCategories() {
  const t = useTranslations("categories");
  const tTypes = useTranslations("donationTypes");

  return (
    <section id="donate" className="py-16 sm:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a5c38] mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {DONATION_TYPES.map((type, index) => {
            const Icon = ICON_MAP[type.icon] ?? Star;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link href={`/donate?type=${type.id}`}>
                  <div className="group bg-white border border-[#eeeeee] rounded-2xl p-5 h-full flex flex-col items-center text-center hover:shadow-[0_8px_40px_0_rgb(26_92_56_/_12%)] hover:-translate-y-1 hover:border-[#1a5c38]/30 transition-all duration-300 cursor-pointer">
                    {/* Icon circle */}
                    <div className="w-14 h-14 rounded-xl bg-[#e8f5ee] group-hover:bg-[#1a5c38] flex items-center justify-center mb-4 transition-colors duration-300 shrink-0">
                      <Icon className="w-7 h-7 text-[#1a5c38] group-hover:text-white transition-colors duration-300" />
                    </div>
                    {/* Green top accent */}
                    <div className="w-8 h-0.5 bg-[#1a5c38] rounded-full mb-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2">
                      {tTypes(`${type.id}.name`)}
                    </h3>
                    <p className="text-gray-400 text-xs leading-5">
                      {tTypes(`${type.id}.description`)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
