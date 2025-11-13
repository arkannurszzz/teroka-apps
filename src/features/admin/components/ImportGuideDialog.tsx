'use client';

import { FileDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ImportGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloadTemplate: () => void;
}

export function ImportGuideDialog({ open, onOpenChange, onDownloadTemplate }: ImportGuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="2xl">
        <DialogHeader>
          <DialogTitle>Panduan Import Data UMKM</DialogTitle>
          <DialogDescription>
            Ikuti panduan di bawah ini untuk mengimpor data UMKM menggunakan file CSV
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6 px-6">
          {/* Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Penting!</p>
              <p>
                Pastikan file CSV Anda mengikuti format yang benar untuk menghindari error saat import.
              </p>
            </div>
          </div>

          {/* Format CSV */}
          <div>
            <h3 className="font-semibold text-base mb-3 text-gray-800">Format File CSV</h3>
            <div className="bg-gray-50 border rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs font-mono">
{`name,category,description,address,city,province,contact,operating_hours,owner_name,established_year,employee_count,image
Warung Nasi Bu Ani,makanan,Warung makan dengan menu nasi campur,Jl. Merdeka No. 45,Jakarta Selatan,DKI Jakarta,628123456789,08:00-20:00,Ibu Ani,2015,3,https://example.com/image1.jpg
Toko Baju Cantik,fashion,Toko pakaian wanita modern,Jl. Sudirman No. 123,Bandung,Jawa Barat,628234567890,09:00-21:00,Ibu Siti,2018,5,https://example.com/image2.jpg`}
              </pre>
            </div>
          </div>

          {/* Column Descriptions */}
          <div>
            <h3 className="font-semibold text-base mb-3 text-gray-800">Deskripsi Kolom</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Kolom</th>
                    <th className="px-4 py-2 text-left font-medium">Wajib</th>
                    <th className="px-4 py-2 text-left font-medium">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">name</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600">Ya</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">Nama UMKM (min. 3 karakter)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">category</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600">Ya</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      Kategori: makanan, minuman, jasa, fashion, lainnya
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">description</td>
                    <td className="px-4 py-2">Tidak</td>
                    <td className="px-4 py-2 text-gray-600">Deskripsi singkat UMKM</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">address</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600">Ya</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">Alamat lengkap (min. 10 karakter)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">city</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600">Ya</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">Nama kota/kabupaten</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">province</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600">Ya</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">Nama provinsi</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">contact</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600">Ya</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">Nomor telepon (format: 628xxx)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">operating_hours</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600">Ya</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">Jam operasional (format: 08:00-17:00)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">owner_name</td>
                    <td className="px-4 py-2">Tidak</td>
                    <td className="px-4 py-2 text-gray-600">Nama pemilik UMKM</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">established_year</td>
                    <td className="px-4 py-2">Tidak</td>
                    <td className="px-4 py-2 text-gray-600">Tahun berdiri (angka 4 digit)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">employee_count</td>
                    <td className="px-4 py-2">Tidak</td>
                    <td className="px-4 py-2 text-gray-600">Jumlah karyawan (angka)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">image</td>
                    <td className="px-4 py-2">Tidak</td>
                    <td className="px-4 py-2 text-gray-600">URL gambar UMKM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Notes */}
          <div>
            <h3 className="font-semibold text-base mb-3 text-gray-800">Catatan Penting</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-red-600">•</span>
                <span>File harus dalam format CSV (Comma-Separated Values)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">•</span>
                <span>Baris pertama harus berisi nama kolom (header)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">•</span>
                <span>Gunakan koma (,) sebagai pemisah antar kolom</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">•</span>
                <span>Jika data mengandung koma, apit dengan tanda kutip ganda ("data, dengan koma")</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">•</span>
                <span>Encoding file harus UTF-8 agar karakter Indonesia terbaca dengan benar</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">•</span>
                <span>Data yang tidak valid akan dilewati dan tercatat sebagai error</span>
              </li>
            </ul>
          </div>

          {/* Download Template Button */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Download Template CSV</p>
                <p className="text-xs text-gray-600 mt-1">
                  Unduh template CSV untuk mempermudah proses import
                </p>
              </div>
              <Button
                onClick={() => {
                  onDownloadTemplate();
                  onOpenChange(false);
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
