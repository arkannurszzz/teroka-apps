'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqCompact() {
  const faqs: FaqItem[] = [
    {
      question: 'Apa itu Teroka?',
      answer: 'Teroka adalah platform digital yang menghubungkan konsumen dengan UMKM lokal di seluruh Indonesia, memudahkan pencarian, penemuan, dan dukungan langsung terhadap produk serta layanan usaha kecil menengah.',
    },
    {
      question: 'Bagaimana cara menggunakannya?',
      answer: 'Cukup buka aplikasi, aktifkan lokasi Anda, cari UMKM berdasarkan kategori atau nama, jelajahi produk, dan lakukan transaksi aman langsung dengan penjual. Anda juga bisa mendaftarkan UMKM sendiri untuk bergabung.',
    },
    {
      question: 'Apakah produk di Teroka dijual langsung oleh UMKM?',
      answer: 'Ya, 100% produk dan layanan di Teroka dijual langsung oleh pemilik UMKM. Ini memastikan keaslian, harga terjangkau, dan dukungan ekonomi lokal yang nyata tanpa perantara.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number>(-1);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Ikon + Balon FAQ */}
          <div className="shrink-0 relative">
            <div className="w-16 h-16 bg-red-600 rounded-full shadow-md flex items-center justify-center relative z-10">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -left-4 bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md z-20">
              FAQ
            </div>
          </div>
          {/* Pertanyaan & Jawaban */}
          <div className="flex-1 space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full">
                <div
                  className="bg-red-600 text-white px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-sm md:text-base font-medium cursor-pointer flex items-center justify-between group"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="flex-1">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2 w-4 h-4 text-white"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={
                    openIndex === index
                      ? { opacity: 1, height: 'auto', marginTop: 8 }
                      : { opacity: 0, height: 0, marginTop: 0 }
                  }
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden bg-gray-50 rounded-b-xl px-6 pb-4 pt-2"
                >
                  <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}