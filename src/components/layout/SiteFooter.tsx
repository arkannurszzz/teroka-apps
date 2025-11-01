// src/components/SiteFooter.tsx
import React from 'react';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-linear-to-r from-yellow-400 via-amber-400 to-orange-500 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Section: Links & Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">King Teroka</h3>
            <p className="text-sm opacity-90">
              Platform eksplorasi UMKM terbaik di Indonesia. Temukan, dukung, dan kembangkan usaha lokalmu!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="hover:underline transition-colors">
                  Cari UMKM
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:underline transition-colors">
                  Daftar
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/kingteroka" // Ganti dengan link real
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:opacity-80 transition-colors"
              >
                📱
              </a>
              <a
                href="https://instagram.com/kingteroka" // Ganti dengan link real
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:opacity-80 transition-colors"
              >
                📸
              </a>
              <a
                href="https://linkedin.com/company/kingteroka" // Ganti dengan link real
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:opacity-80 transition-colors"
              >
                💼
              </a>
            </div>
            <p className="text-sm mt-2 opacity-90">Hubungi: info@kingteroka.com</p>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-white/20 pt-6 text-center text-sm opacity-80">
          <p>&copy; 2025 King Teroka. Semua hak dilindungi. Dibuat dengan ❤️ di Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}