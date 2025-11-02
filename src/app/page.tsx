'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[85vh] overflow-hidden">
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
              Platform ini hadir untuk membawa kita lebih dekat dengan UMKM lokal – menemukan rasa, layanan, dan inovasi yang tumbuh di sektor kita.
            </p>
            <Link
              href="/search"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Jelajahi Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Section Deskripsi dengan Efek Scroll ke Kiri */}
      <section className="-mt-2 md:-mt-2 relative py-4 md:py-6 overflow-hidden bg-[#D9302C]">
        <div className="w-full">
          <div className="flex overflow-hidden whitespace-nowrap w-screen">
            <p className="text-lg md:text-xl font-medium text-white tracking-wide animate-scroll-left animate-scroll-left-md px-3 md:px-6 min-w-full">
              Teroka adalah ruang kurasi UMKM lokal — di mana setiap produk punya cerita, setiap usaha punya makna, dan setiap dukungan berarti.
            </p>
            <p className="text-lg md:text-xl font-medium text-white tracking-wide animate-scroll-left animate-scroll-left-md px-3 md:px-6 min-w-full">
              Teroka adalah ruang kurasi UMKM lokal — di mana setiap produk punya cerita, setiap usaha punya makna, dan setiap dukungan berarti.
            </p>
            <p className="text-lg md:text-xl font-medium text-white tracking-wide animate-scroll-left animate-scroll-left-md px-3 md:px-6 min-w-full">
              Teroka adalah ruang kurasi UMKM lokal — di mana setiap produk punya cerita, setiap usaha punya makna, dan setiap dukungan berarti.
            </p>
          </div>
        </div>
      </section>

      {/* Section Kenapa Teroka Hadir */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Kenapa Teroka Hadir?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/page1/page1.jpeg"
                alt="Kenapa Teroka Hadir"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg md:rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Suit menemukan UMKM di sektor yang sesuai kebutuhan? Atau ingin mendukung usaha kecil, tapi bingung harus mulai dari mana?
              </p>
              <p className="text-gray-700 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pilihan Teroka */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          {/* Title Centered - Tanpa background, tambah garis orange di bawah */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pilihan Teroka
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></div> {/* Garis orange di bawah tulisan */}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-shadow text-center h-full">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg mb-4">
                  <Image
                    src="/images/pilihan/pangkalan-data.jpg"
                    alt="Pangkalan Data"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-900 font-semibold text-lg">Pangkalan Data</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow text-center h-full">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg mb-4">
                  <Image
                    src="/images/pilihan/katalog.jpg"
                    alt="Katalog"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-900 font-semibold text-lg">Katalog</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow text-center h-full">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg mb-4">
                  <Image
                    src="/images/pilihan/pencarian.jpg"
                    alt="Pencarian"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-900 font-semibold text-lg">Pencarian</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
        {/* Section Jelajah Segala Rupa Karya Lokal */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Jelajah Segala Rupa Karya Lokal
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Jelajahi segala rupa karya lokal
            </p>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 md:gap-6 min-w-max animate-scroll-left md:animate-scroll-left-md">
              <div className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/jelajah/shop1.jpg"
                  alt="Toko Lokal 1"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/jelajah/shop2.jpg"
                  alt="Toko Lokal 2"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/jelajah/shop3.jpg"
                  alt="Toko Lokal 3"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/jelajah/shop4.jpg"
                  alt="Toko Lokal 4"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/jelajah/shop4.jpg"
                  alt="Toko Lokal 4"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/jelajah/shop4.jpg"
                  alt="Toko Lokal 4"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Cukup Tiga Langkah */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Cukup Tiga Langkah Sederhana
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl mx-auto">
              untuk menemukan, mengenal, dan mendukung UMKM di sekitarmu.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-white text-2xl">📍</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Cari</h3>
              <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed">
                Temukan berbagai UMKM dari makanan, pakaian, hingga jasa di sekitarmu.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden lg:flex flex-col items-center flex-1">
              <div className="w-0.5 h-16 bg-orange-300 dotted-border"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1"></div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-white text-2xl">👆</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Pilih</h3>
              <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed">
                Kenali UMKM melalui profil, cerita, dan ulasan mereka.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden lg:flex flex-col items-center flex-1">
              <div className="w-0.5 h-16 bg-orange-300 dotted-border"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1"></div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Kunjungi</h3>
              <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed">
                Dukung UMKM favorit, kapan saja dan di mana saja.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-orange-50 rounded-2xl p-6 md:p-8 lg:p-12 relative overflow-hidden border border-orange-200">
            <div className="absolute inset-y-0 right-0 w-1/2 lg:w-1/3 opacity-20">
              <Image
                src="/images/cta-market.jpg"
                alt="Pasar UMKM"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 max-w-md lg:max-w-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Apakah Kamu Pemilik Usaha?
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Saatnya usahamu dikenal lebih banyak orang. Biarkan produkmu ditemukan, ceritamu didengar, dan dukungan mengalir lewat Teroka.
              </p>
              <Link
                href="/register"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
              >
                Daftarkan Usahamu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}