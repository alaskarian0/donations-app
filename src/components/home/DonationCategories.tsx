"use client";

import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import Card from "@/components/ui/Card";
import { DONATION_TYPES } from "@/lib/constants";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

// Ultra-Thin Golden Outlined Icons for Spiritual Minimalism
const CategoryIcons = {
  sadaqah: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1">
      <motion.path 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-12.7c.9 0 1.8.2 2.6.5M12 12l8-8m-8 8L4 4m8 8v9" 
      />
    </svg>
  ),
  waqf: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1">
      <motion.path 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.222 11.636 12.222 10.464 11.343c-1.172-.879-1.172-2.303 0-3.182 1.172-.879 3.07-.879 4.242 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  ),
  reconstruction: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1">
      <motion.path 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        d="M2.25 21h19.5m-18-10.5l6-6 6 6m-12 10.5v-1.5a3.375 3.375 0 013.375-3.375h4.875a3.375 3.375 0 013.375 3.375v1.5m-14.25 0h14.25M16.5 9.75l-4.5 4.5m0-4.5l4.5 4.5M12 10.5v2.25" 
      />
    </svg>
  ),
  feeding: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1">
      <motion.path 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10a3 3 0 016 0v4a3 3 0 11-6 0v-4z" 
      />
    </svg>
  ),
  orphan: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1">
      <motion.path 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
      />
    </svg>
  ),
  general: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1">
      <motion.path 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8.25v7.5m3.75-3.75H8.25" 
      />
    </svg>
  ),
};

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

  return (
    <section ref={containerRef} className="py-[var(--spacing-fib-8)] px-4 bg-background relative overflow-hidden">
      {/* Dynamic Background Geometry */}
      <div className="absolute inset-0 geometry-heartbeat geometric-bg pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-[var(--spacing-fib-5)]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.5rem] sm:text-[3rem] font-bold gold-shimmer mb-6 tracking-tight"
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
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide italic"
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
                      className="h-full glass-sanctuary border-gold/5 flex flex-col justify-between overflow-hidden relative group-hover:border-gold/30 transition-all duration-700 shadow-cloud hover:shadow-gold-glow/20"
                    >
                      {/* Interactive Illuminator */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 250px at ${mousePos.globalX}px ${mousePos.globalY}px, rgba(212, 175, 55, 0.08), transparent)`,
                        }}
                      />
                      
                      <div className="relative z-10">
                        {/* Thin Outlined Icon with Pulsing Effect */}
                        <div className="w-16 h-16 mb-8 text-gold group-hover:scale-105 transition-all duration-1000 flex items-center justify-center p-3 aspect-square bg-gold/5 rounded-3xl opacity-80 group-hover:opacity-100">
                          {CategoryIcons[type.id as keyof typeof CategoryIcons] || type.icon}
                        </div>
                        
                        <h3 className="text-[1.75rem] font-bold text-gold mb-6 tracking-tight">
                          {dt(`${type.id}`)}
                        </h3>
                        <p className="text-gray-400 text-sm leading-[1.8] mb-6 max-w-[95%] font-light tracking-wide">
                          {dt(`${type.id}_desc`)}
                        </p>
                      </div>

                      <div className="relative z-10 mt-auto pt-6 border-t border-gold/5">
                        <span className="text-gold/60 font-bold text-xs flex items-center gap-3 uppercase tracking-widest group-hover:text-gold transition-all duration-700">
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
