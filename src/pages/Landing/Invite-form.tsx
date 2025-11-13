'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, CheckIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function InviteForm() {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Subtle background pattern or wave */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#f04c24]/5 to-transparent"></div>
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#111827] leading-relaxed pb-2">
            Cukup Tiga Langkah Sederhana
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            untuk menemukan, mengenal, dan mendukung UMKM di sekitarmu.
          </p>
        </motion.div>
        {/* Steps Grid */}
        <div className="relative mb-20">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Step 1 */}
            <motion.div
              className="flex flex-col items-center text-center group transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#D9302C] to-[#f04c24] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <MagnifyingGlassIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Cari</h3>
              <p className="text-gray-600 text-base max-w-md leading-relaxed">
                Temukan berbagai UMKM dari makanan, pakaian, hingga jasa di sekitarmu.
              </p>
            </motion.div>
            {/* Step 2 */}
            <motion.div
              className="flex flex-col items-center text-center group transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#D9302C] to-[#f04c24] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <CheckIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Pilih</h3>
              <p className="text-gray-600 text-base max-w-md leading-relaxed">
                Kenali UMKM melalui profil, cerita, dan ulasan mereka.
              </p>
            </motion.div>
            {/* Step 3 */}
            <motion.div
              className="flex flex-col items-center text-center group transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#D9302C] to-[#f04c24] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <ShoppingBagIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Kunjungi</h3>
              <p className="text-gray-600 text-base max-w-md leading-relaxed">
                Dukung UMKM favorit, kapan saja dan di mana saja.
              </p>
            </motion.div>
          </div>
          {/* Connecting Lines - Modern subtle lines */}
          <div className="absolute top-1/2 left-1/3 lg:left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-[#D9302C]/20 to-[#f04c24]/20 transform -translate-x-1/2 hidden lg:block"></div>
          <div className="absolute top-1/2 left-2/3 lg:left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-[#D9302C]/20 to-[#f04c24]/20 transform -translate-x-1/2 hidden lg:block"></div>
        </div>
        {/* CTA Box - Modern responsive layout */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-[#f04c24]/10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Text Content */}
            <div className="p-8 md:p-12 lg:p-16 lg:col-span-3">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Apakah Kamu Pemilik Usaha?
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Saatnya usahamu dikenal lebih banyak orang. Biarkan produkmu ditemukan, ceritamu didengar, dan dukungan mengalir lewat Teroka.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center bg-gradient-to-r from-[#D9302C] to-[#f04c24] hover:from-[#f04c24] hover:to-[#D9302C] text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Daftarkan Usahamu →
              </Link>
            </div>

            {/* Image - Desktop Only */}
            <div className="hidden lg:block lg:col-span-2 relative">
              <Image
                src="/images/landing/invite-umkm.jpg"
                alt="Pasar UMKM"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
