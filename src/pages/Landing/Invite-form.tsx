import Image from "next/image";
import Link from "next/link";

export default function InviteForm() {
  return (
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
              Temukan berbagai UMKM dari makanan, pakaian, hingga jasa di
              sekitarmu.
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
              Saatnya usahamu dikenal lebih banyak orang. Biarkan produkmu
              ditemukan, ceritamu didengar, dan dukungan mengalir lewat Teroka.
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
  );
}
