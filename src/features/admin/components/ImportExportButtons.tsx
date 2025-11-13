'use client';

import { useState, useRef } from 'react';
import { Upload, Download, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImportGuideDialog } from './ImportGuideDialog';
import { toast } from 'sonner';
import { Umkm } from '@/types/umkm';

interface ImportExportButtonsProps {
  data: Umkm[];
  onImport: (data: any[]) => void;
}

export function ImportExportButtons({ data, onImport }: ImportExportButtonsProps) {
  const [showGuide, setShowGuide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      // Define CSV headers
      const headers = [
        'name',
        'category',
        'description',
        'address',
        'city',
        'province',
        'contact',
        'operating_hours',
        'owner_name',
        'established_year',
        'employee_count',
        'image',
      ];

      // Convert data to CSV rows
      const rows = data.map((umkm) => {
        return [
          umkm.name || '',
          umkm.category || '',
          umkm.description || '',
          umkm.address || '',
          umkm.city || '',
          umkm.province || '',
          umkm.contact || '',
          umkm.operating_hours || '',
          umkm.owner_name || '',
          umkm.established_year || '',
          umkm.employee_count || '',
          umkm.image || '',
        ].map((value) => {
          // Escape quotes and wrap in quotes if contains comma or newline
          const stringValue = String(value);
          if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        });
      });

      // Combine headers and rows
      const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');

      // Create blob and download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().split('T')[0];

      link.setAttribute('href', url);
      link.setAttribute('download', `umkm-export-${timestamp}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Berhasil export ${data.length} data UMKM`);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error('Gagal export data');
    }
  };

  const handleDownloadTemplate = () => {
    try {
      // Create template with headers and example data
      const template = `name,category,description,address,city,province,contact,operating_hours,owner_name,established_year,employee_count,image
Warung Nasi Bu Ani,makanan,Warung makan dengan menu nasi campur lengkap,Jl. Merdeka No. 45,Jakarta Selatan,DKI Jakarta,628123456789,08:00-20:00,Ibu Ani,2015,3,https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445
Toko Baju Cantik,fashion,Toko pakaian wanita modern dan trendy,Jl. Sudirman No. 123,Bandung,Jawa Barat,628234567890,09:00-21:00,Ibu Siti,2018,5,https://images.unsplash.com/photo-1445205170230-053b83016050`;

      const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', 'template-import-umkm.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Template CSV berhasil diunduh');
    } catch (error) {
      console.error('Error downloading template:', error);
      toast.error('Gagal mengunduh template');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      toast.error('Format file harus CSV');
      return;
    }

    try {
      const text = await file.text();
      const lines = text.split('\n').filter((line) => line.trim());

      if (lines.length < 2) {
        toast.error('File CSV kosong atau tidak valid');
        return;
      }

      // Parse CSV
      const headers = lines[0].split(',').map((h) => h.trim());
      const requiredHeaders = ['name', 'category', 'address', 'city', 'province', 'contact', 'operating_hours'];

      // Validate headers
      const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));
      if (missingHeaders.length > 0) {
        toast.error(`Header CSV tidak lengkap. Missing: ${missingHeaders.join(', ')}`);
        return;
      }

      // Parse rows
      const parsedData = [];
      const errors = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        try {
          // Simple CSV parsing (handles quoted values)
          const values: string[] = [];
          let currentValue = '';
          let insideQuotes = false;

          for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
              values.push(currentValue.trim());
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          values.push(currentValue.trim()); // Add last value

          // Create object from values
          const row: any = {};
          headers.forEach((header, index) => {
            const value = values[index] || '';
            row[header] = value.replace(/^"|"$/g, '').replace(/""/g, '"'); // Remove surrounding quotes and unescape quotes
          });

          // Validate required fields
          const missingFields = requiredHeaders.filter((field) => !row[field]);
          if (missingFields.length > 0) {
            errors.push(`Baris ${i + 1}: Field wajib kosong (${missingFields.join(', ')})`);
            continue;
          }

          // Convert numeric fields
          if (row.established_year) {
            row.established_year = parseInt(row.established_year);
          }
          if (row.employee_count) {
            row.employee_count = parseInt(row.employee_count);
          }

          parsedData.push(row);
        } catch (error) {
          errors.push(`Baris ${i + 1}: Error parsing data`);
        }
      }

      if (parsedData.length === 0) {
        toast.error('Tidak ada data valid untuk diimport');
        if (errors.length > 0) {
          console.error('Import errors:', errors);
        }
        return;
      }

      // Show summary
      const message = errors.length > 0
        ? `Import ${parsedData.length} data berhasil. ${errors.length} data gagal.`
        : `Berhasil import ${parsedData.length} data`;

      toast.success(message);

      if (errors.length > 0) {
        console.warn('Import errors:', errors);
      }

      // Call onImport callback
      onImport(parsedData);
    } catch (error) {
      console.error('Error importing CSV:', error);
      toast.error('Gagal import data CSV');
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setShowGuide(true)}
          className="flex items-center gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          Panduan Import
        </Button>

        <Button
          variant="outline"
          onClick={handleImportClick}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Import CSV
        </Button>

        <Button
          variant="outline"
          onClick={handleExport}
          disabled={data.length === 0}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <ImportGuideDialog
        open={showGuide}
        onOpenChange={setShowGuide}
        onDownloadTemplate={handleDownloadTemplate}
      />
    </>
  );
}
