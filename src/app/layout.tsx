import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import SiteHeaderNavbar from '@/components/layout/SiteHeaderNavbar';  
import SiteFooter from '@/components/layout/SiteFooter';  

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'King Teroka - Eksplorasi UMKM Indonesia',
  description: 'Temukan dan dukung UMKM lokal terbaik!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <SiteHeaderNavbar />  {/* Tambahin navbar di atas */}
        <main className="min-h-screen">  {/* Wrapper buat content, biar footer di bawah */}
          {children}
        </main>
        <SiteFooter />  {/* Footer di bawah */}
      </body>
    </html>
  );
}