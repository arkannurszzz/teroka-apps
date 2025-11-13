'use client';
import Link from 'next/link';

export default function HeroCallToAction() {
  return (
    <>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl opacity-90 tracking-wide">
        Temukan dan dukung UMKM lokal dengan platform aman dan efisien – nikmati pengalaman belanja yang cepat dan terpercaya.
      </p>
      <Link
        href="/search"
        aria-label="Mulai jelajahi UMKM"
        className="group relative bg-linear-to-r from-[#D9302C] to-[#f04c24] hover:from-[#f04c24] hover:to-[#D9302C] text-white font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-sm sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <span className="relative z-10">Jelajahi UMKM →</span>
        <span className="absolute inset-0 bg-red-500 rounded-full -z-10 opacity-0 blur-sm scale-95 group-hover:opacity-20 group-hover:scale-105 transition-all duration-300" />
      </Link>
    </>
  );
}