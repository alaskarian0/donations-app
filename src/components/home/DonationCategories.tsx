"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Card from "@/components/ui/Card";
import { DONATION_TYPES } from "@/lib/constants";

export default function DonationCategories() {
  const t = useTranslations("categories");
  const tTypes = useTranslations("donationTypes");

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-shrine-blue-dark mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {DONATION_TYPES.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/donate?type=${type.id}`}>
                <Card hoverable goldBorder className="p-5 sm:p-6 h-full">
                  <div className="text-3xl sm:text-4xl mb-3">{type.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-shrine-blue-dark mb-2">
                    {tTypes(`${type.id}.name`)}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-6">
                    {tTypes(`${type.id}.description`)}
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
