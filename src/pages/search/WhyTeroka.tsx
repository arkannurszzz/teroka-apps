'use client';
import { motion } from 'framer-motion';
import { Store, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function WhyTeroka() {
  const reasons = [
    {
      icon: Store,
      title: 'Produk Asli dari UMKM Lokal',
      description: 'Dapatkan produk autentik langsung dari pengrajin dan pelaku UMKM di seluruh Indonesia.',
      delay: 0.1,
    },
    {
      icon: HeartHandshake,
      title: 'Dukung Ekonomi Daerah',
      description: 'Setiap pembelian Anda membantu pertumbuhan ekonomi lokal dan pemberdayaan masyarakat.',
      delay: 0.2,
    },
    {
      icon: ShieldCheck,
      title: 'Aman & Terpercaya',
      description: 'Transaksi terlindungi, ulasan asli, dan UMKM terverifikasi untuk pengalaman belanja terbaik.',
      delay: 0.3,
    },
  ];

  // Stagger animation for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Judul dengan animasi fade-in */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Kenapa Harus Teroka?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Temukan alasan mengapa jutaan orang memilih Teroka untuk mendukung UMKM Indonesia dengan percaya diri.
        </p>
      </motion.div>

      {/* Kartu Alasan dengan stagger animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
      >
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
              role="article"
              aria-labelledby={`reason-title-${index}`}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100/50 h-full flex flex-col items-center text-center hover:-translate-y-2">
                {/* Ikon 3D dengan efek hover lebih halus */}
                <motion.div
                  className="mb-6 p-4 md:p-5 bg-linear-to-br from-[#FFD700] to-[#FFA500] rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  style={{ willChange: 'transform' }}
                >
                  <Icon className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-md" />
                </motion.div>
                {/* Teks */}
                <h3
                  id={`reason-title-${index}`}
                  className="text-xl md:text-lg font-bold text-gray-800 mb-3 leading-tight"
                >
                  {reason.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-1">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}