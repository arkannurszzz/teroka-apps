'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const TerokaCard = () => {
  // Define the SVG pattern as a constant to avoid parsing issues
  const svgPattern = `data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23fff6ea" fill-opacity="0.2"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url(${svgPattern})`,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: Image */}
          <motion.div
            className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/images/landing/about-umkm.jpg"
              alt="Penjual UMKM lokal tersenyum bangga dengan gerobak makanan digital"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent"></div>
          </motion.div>
          {/* Right side: Text content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Dukung 8.000+ UMKM Lokal di Era Digital
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Tingkatkan penjualan hingga 3x dengan pengiriman efisien dan proses pesanan yang sederhana – dirancang khusus untuk UMKM di lingkungan lokal Anda.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
            <Link
              href="/register"
              className="inline-flex items-center bg-linear-to-r from-[#D9302C] to-[#f04c24] hover:from-[#f04c24] hover:to-[#D9302C] text-white font-semibold py-3 px-8 rounded-full text-base transition-all duration-300 shadow-lg hover:shadow-xl mb-8"
            >
              Daftarkan Usahamu Sekarang
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-start space-x-4 p-6 bg-white/90 rounded-xl shadow-lg backdrop-blur-sm">
                <div className="shrink-0">
                  <Clock className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#111827] mb-2">Hemat 20 Jam per Bulan</p>
                  <p className="text-base text-gray-600 leading-relaxed">Otomatisasi pesanan yang andal membebaskan waktu UMKM Anda – fokus pada kualitas produk dan pelayanan pelanggan.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerokaCard;