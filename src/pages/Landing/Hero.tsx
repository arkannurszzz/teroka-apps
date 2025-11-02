import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <div className="relative h-[85dvh] md:h-[85dvh] overflow-hidden">
        <Image
          src="/images/header.jpeg"
          alt="Pasar UMKM Lokal"
          fill
          className="object-cover object-position-top size-full"
          priority
        />

        <div className="absolute inset-0 top-0 left-0 w-full h-full flex items-center justify-center text-white z-10 bg-black/40">
          <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight whitespace-normal md:whitespace-nowrap text-center">
              Temukan dan Dukung UMKM di Sekitarmu.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 max-w-full sm:max-w-xl md:max-w-2xl opacity-95 text-center">
              Platform ini hadir untuk membawa kita lebih dekat dengan UMKM
              lokal – menemukan rasa, layanan, dan inovasi yang tumbuh di sektor
              kita.
            </p>
            <Link
              href="/search"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Jelajahi Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Section Deskripsi dengan Efek Scroll ke Kiri */}
      <div className="relative py-4 md:py-6 overflow-hidden bg-[#D9302C] h-[5dvh]">
        <div className="w-full">
          <div className="flex overflow-hidden whitespace-nowrap w-screen">
            <p className="text-lg md:text-xl font-medium text-white tracking-wide animate-scroll-left animate-scroll-left-md px-3 md:px-6 min-w-full">
              Teroka adalah ruang kurasi UMKM lokal — di mana setiap produk
              punya cerita, setiap usaha punya makna, dan setiap dukungan
              berarti.
            </p>
            <p className="text-lg md:text-xl font-medium text-white tracking-wide animate-scroll-left animate-scroll-left-md px-3 md:px-6 min-w-full">
              Teroka adalah ruang kurasi UMKM lokal — di mana setiap produk
              punya cerita, setiap usaha punya makna, dan setiap dukungan
              berarti.
            </p>
            <p className="text-lg md:text-xl font-medium text-white tracking-wide animate-scroll-left animate-scroll-left-md px-3 md:px-6 min-w-full">
              Teroka adalah ruang kurasi UMKM lokal — di mana setiap produk
              punya cerita, setiap usaha punya makna, dan setiap dukungan
              berarti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
