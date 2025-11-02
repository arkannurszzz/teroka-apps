import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <div className="relative h-[80vh] md:h-[85vh] overflow-hidden">
        <Image
          src="/images/header.jpeg"
          alt="Pasar UMKM Lokal"
          fill
          className="object-cover object-position-top"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-start pt-36 md:pt-44 text-center text-white px-4">
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
      <div className="-mt-2 md:-mt-2 relative py-4 md:py-6 overflow-hidden bg-[#D9302C]">
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
