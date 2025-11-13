"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
});

export default function SiteHeaderNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Jelajahi", href: "/search" },
    { label: "Daftarkan Usaha", href: "/register" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="md:border-b md:border-gray-200 bg-white h-[10dvh] fixed top-0 left-0 right-0 z-50">
      <nav className="container h-full mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        {/* Div logo: responsive align - mobile: kiri (items-start), desktop: tengah (md:items-center) */}
        <div className="w-full flex flex-col items-start md:items-center gap-y-2">
         <Link href="/" className="group flex items-center space-x-1"> {/* Ini udah bener, komentar setelah > */}
  <span className="text-2xl md:text-3xl font-bold tracking-tight leading-none text-gray-900">
    TER
  </span>
  {/* Tambah class animasi di sini */} {/* <-- Dipindah ke sini, sebelum <Image> */}
  <Image
    src="/images/logo/logo.png"
    alt="★"
    width={20}
    height={20}
    className="h-5 w-auto md:h-6 lg:h-7 transition-transform duration-150 ease-in-out group-hover:rotate-360"
  />
  <span className="text-2xl md:text-3xl font-bold tracking-tight leading-none text-gray-900">
    KA
  </span>
</Link>
          {/* Nav desktop: hidden di mobile, dengan animasi underline hover */}
          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "relative pb-1 transition-colors hover:text-gray-900",
                      isActive ? "text-gray-900" : "text-gray-600"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#D9302C]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "block py-2 px-3 text-base font-medium transition-colors hover:text-gray-900 rounded",
                      isActive
                        ? "text-gray-900 border-b-2 border-[#D9302C]"
                        : "text-gray-600"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
