'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function SiteHeaderNavbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Jelajahi', href: '/search' },
    { label: 'Daftarkan Usaha', href: '/register' },
  ];

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        {/* Logo Kiri */}
        <Link href="/" className="flex items-center space-x-1">
          <span className="text-2xl font-bold tracking-tight">
            TER
            <span className="text-red-600">★</span>
            KA
          </span>
        </Link>

        {/* Menu Kanan */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'relative pb-1 transition-colors hover:text-gray-900',
                    isActive ? 'text-gray-900' : 'text-gray-600'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-yellow-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu (Opsional - bisa ditambahkan nanti) */}
        <div className="md:hidden">
          {/* Hamburger icon bisa ditambahkan di sini */}
        </div>
      </nav>
    </header>
  );
}