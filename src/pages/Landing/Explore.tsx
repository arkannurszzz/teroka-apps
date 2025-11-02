import Image from "next/image";

export default function Explore() {
  return (
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
  );
}
