'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Variants untuk headline
const headlineVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function RotatingHeadline() {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const headlines = [
    'Teroka Hadir  ',
    'Bersama Teroka ',
    'Pilihan Teroka '
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  const words = headlines[currentHeadline].split(' ');

  return (
    <div className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
      <AnimatePresence mode="wait">
        <motion.div
          key={`headline-${currentHeadline}`}
          variants={headlineVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="inline-block"
        >
          <span className="staggered-text inline-block">
            {words.map((word, i: number) => (
              <span key={`${currentHeadline}-${i}`} className="word inline-block">
                {word}{' '}
              </span>
            ))}
          </span>
        </motion.div>
      </AnimatePresence>
      <br />
      <span className="block">Maju UMKM Indonesia</span>

    </div>
  );
}