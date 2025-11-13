// Hero.tsx
'use client'; // Buat client-side animasi
import RotatingHeadline from './RotatingHeadline';
import HeroCallToAction from './HeroCallToAction';
import Marquee from './Marquee';

export default function Hero() {
  return (
    <section className="w-full min-h-screen relative overflow-hidden bg-gray-900"> {/* Ganti h-screen ke min-h-screen biar adaptif di mobile */}
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full" // Pastikan full coverage
        style={{ backgroundImage: 'url(/images/logo/bg-header.jpg)' }}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/30" /> {/* Overlay lebih gelap di mobile buat readability */}
      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white px-4 py-8 md:py-0 min-h-screen"> {/* Tambah py-8 di mobile, flex-col eksplisit */}
        <div className="flex flex-col items-center max-w-4xl md:max-w-6xl mx-auto w-full text-center"> {/* Kurangi max-w di mobile */}
          <RotatingHeadline />
          <HeroCallToAction />
        </div>
      </div>
      {/* Marquee bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <Marquee />
      </div>
    </section>
  );
}