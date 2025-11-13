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

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Judul */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Kenapa Harus Teroka?
        </h2>
      </div>

      {/* Kartu Alasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: reason.delay }}
              className="group"
            >
              <div className="bg-[#FFD700]/10 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#FFD700]/30 h-full flex flex-col items-center text-center">
                
                {/* Ikon 3D */}
                <div className="mb-6 p-5 bg-[#FFD700] rounded-3xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="w-16 h-16 text-white" />
                </div>

                {/* Teks */}
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}