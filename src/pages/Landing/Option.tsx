import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";

export default function Option() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        {/* Title Centered - Tanpa background, tambah garis orange di bawah */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Pilihan Teroka
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></div>{" "}
          {/* Garis orange di bawah tulisan */}
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
              <p className="text-gray-900 font-semibold text-lg">
                Pangkalan Data
              </p>
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
  );
}
