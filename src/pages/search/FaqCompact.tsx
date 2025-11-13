'use client';
import { MessageCircle } from 'lucide-react';

export default function FaqCompact() {
  const faqs = [
    'Apa itu Teroka?',
    'Bagaimana cara menggunakannya?',
    'Apakah produk di Teroka dijual langsung oleh UMKM?',
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
        <div className="flex flex-col md:flex-row items-start gap-8">
          
          {/* Ikon + Balon FAQ */}
          <div className="shrink-0 relative">  {/* ← Diubah di sini! */}
            <div className="w-16 h-16 bg-red-600 rounded-full shadow-md flex items-center justify-center relative z-10">
              <MessageCircle className="w-8 h-8 text-white" fill="white" />
            </div>
            <div className="absolute -top-2 -left-4 bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md z-20">
              FAQ
            </div>
          </div>

          {/* Pertanyaan */}
          <div className="flex-1 space-y-3">
            {faqs.map((question, index) => (
              <div
                key={index}
                className="bg-red-600 text-white px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-sm md:text-base font-medium text-center md:text-left cursor-pointer hover:bg-red-700"
              >
                {question}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}