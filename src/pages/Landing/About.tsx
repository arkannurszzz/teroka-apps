import Image from "next/image";

export default function About() {
  return (
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
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
              alt="Kenapa Teroka Hadir"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg md:rounded-lg shadow-md">
            <p className="text-gray-700 mb-4 leading-relaxed">
              Suit menemukan UMKM di sektor yang sesuai kebutuhan? Atau ingin
              mendukung usaha kecil, tapi bingung harus mulai dari mana?
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like). essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
