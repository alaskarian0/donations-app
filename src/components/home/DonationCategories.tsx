"use client";

import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import Card from "@/components/ui/Card";
import { DONATION_TYPES } from "@/lib/constants";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

import Image from "next/image";

export default function DonationCategories() {
  const t = useTranslations("Categories");
  const dt = useTranslations("DonationTypes");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, globalX: 0, globalY: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Magnetic pull toward cursor
    const x = (clientX - (left + width / 2)) * 0.08;
    const y = (clientY - (top + height / 2)) * 0.08;
    
    setMousePos({ x, y, globalX: clientX - left, globalY: clientY - top });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, globalX: 0, globalY: 0 });
    setHoveredIndex(null);
  };

  const getIconPath = (id: string) => {
    const iconMap: Record<string, string> = {
      general: 'general.png',
      reconstruction: 'reconstruction.png',
      mudhif: 'feeding.png',
      sacrifices: 'sadaqah.png',
      servants: 'waqf.png' 
    };
    return `/icons/${iconMap[id] || 'general.png'}`;
  };

  return (
    <section ref={containerRef} className="py-[var(--spacing-fib-8)] px-4 bg-white relative overflow-hidden">
      {/* Dynamic Background Geometry - Subtle for light mode */}
      <div className="absolute inset-0 geometry-heartbeat geometric-bg opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-[var(--spacing-fib-5)]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.5rem] sm:text-[3.5rem] font-bold gold-shimmer mb-6 tracking-tight"
          >
            {t("title")}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
            className="h-px w-32 bg-gold/50 mx-auto mb-10"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide italic"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Bento Sanctuary Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-4"
          style={{ gap: "var(--spacing-fib-2)" }}
        >
          {DONATION_TYPES.map((type, index) => {
            const isFeatured = index === 0 || index === 3;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                className={cn(
                  "relative group cursor-pointer transition-all duration-700 min-h-[20rem]",
                  isFeatured ? "md:col-span-2" : "md:col-span-1",
                  hoveredIndex !== null && !isHovered ? "opacity-60 scale-[0.99]" : "opacity-100 scale-100"
                )}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={`/donate?type=${type.id}`} className="block h-full">
                  <motion.div
                    animate={{ x: isHovered ? mousePos.x : 0, y: isHovered ? mousePos.y : 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="h-full"
                  >
                    <Card 
                      hoverable 
                      style={{ padding: "var(--spacing-fib-3)" }}
                      className="h-full bg-white/40 backdrop-blur-md border border-gold/10 flex flex-col justify-between overflow-hidden relative group-hover:border-gold/40 transition-all duration-700 shadow-xl hover:shadow-gold-glow/10 rounded-2xl"
                    >
                      {/* Interactive Illuminator */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 250px at ${mousePos.globalX}px ${mousePos.globalY}px, rgba(212, 175, 55, 0.15), transparent)`,
                        }}
                      />
                      
                      <div className="relative z-10">
                        {/* Premium 3D Icon Image */}
                        <div className="w-20 h-20 mb-8 group-hover:scale-110 transition-all duration-1000 flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <Image
                            src={getIconPath(type.id)}
                            alt={type.id}
                            width={80}
                            height={80}
                            className="object-contain drop-shadow-xl"
                          />
                        </div>
                        
                        <h3 className="text-[1.75rem] font-bold text-gray-900 group-hover:text-gold transition-colors duration-500 mb-6 tracking-tight">
                          {dt(`${type.id}`)}
                        </h3>
                        <p className="text-gray-500 text-sm leading-[1.8] mb-6 max-w-[95%] font-light tracking-wide">
                          {dt(`${type.id}_desc`)}
                        </p>
                      </div>

                      <div className="relative z-10 mt-auto pt-6 border-t border-gold/10">
                        <span className="text-gold font-bold text-xs flex items-center gap-3 uppercase tracking-widest group-hover:translate-x-2 transition-all duration-700">
                          {locale === "ar" ? "ساهم الآن" : "Contribute Now"}
                          <motion.span 
                             animate={{ x: isHovered ? (locale === "ar" ? -8 : 8) : 0 }}
                             className={cn(locale === "ar" ? "rotate-180" : "")}
                          >
                            →
                          </motion.span>
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
