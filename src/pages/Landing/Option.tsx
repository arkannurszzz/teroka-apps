'use client';
import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";

export default function Option() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Title Centered */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pilihan Teroka
          </h2>
          <motion.div 
            className="w-20 h-1 bg-orange-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-300 text-center h-full border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-72 md:h-96 w-full overflow-hidden">
                  <Image
                    src="/images/landing/susuJahe-minuman.webp"
                    alt="Susu Jahe Nakumi"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-900 font-bold text-xl">
                  Jahe Susu Merah <br /> Nakumi
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-300 text-center h-full border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-72 md:h-96 w-full overflow-hidden">
                  <Image
                    src="/images/landing/cuciSepatu.webp"
                    alt="Cuci Sepatu Kumbahcare"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-900 font-bold text-xl">Cuci Sepatu <br /> Kumbahcare</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-300 text-center h-full border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-72 md:h-96 w-full overflow-hidden">
                  <Image
                    src="/images/landing/MieAyam.webp"
                    alt="Mie Ayam dan Bakso"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-900 font-bold text-xl">Mie Ayam dan Bakso <br /> Family WP</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}