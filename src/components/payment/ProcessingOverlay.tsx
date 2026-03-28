"use client";

import { motion } from "framer-motion";

export default function ProcessingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-shrine-blue-dark/90 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gold/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-gold-light animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gold text-xl font-bold mb-2"
        >
          جاري المعالجة...
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-sm"
        >
          يرجى عدم إغلاق الصفحة
        </motion.p>
      </div>
    </motion.div>
  );
}
