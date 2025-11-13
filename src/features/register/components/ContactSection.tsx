import { Input } from '@/components/ui/input';
import type { UmkmFormData, FormErrors } from '../types';

interface ContactSectionProps {
  formData: UmkmFormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ContactSection({ formData, errors, onChange }: ContactSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b">
        Informasi Kontak
      </h2>

      <div className="space-y-4">
        {/* Nomor Telepon */}
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
            Nomor Telepon/WhatsApp <span className="text-red-500">*</span>
          </label>
          <Input
            id="contact"
            name="contact"
            type="tel"
            required
            value={formData.contact}
            onChange={onChange}
            placeholder="+62812345678"
            className={`w-full ${errors.contact ? 'border-red-500' : ''}`}
          />
          {errors.contact && (
            <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
          )}
          {!errors.contact && (
            <p className="mt-1 text-xs text-gray-500">
              Format: +62 atau 62 diikuti nomor telepon
            </p>
          )}
        </div>

        {/* Jam Operasional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jam Operasional <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="operating_hours_start" className="block text-xs text-gray-600 mb-1">
                Jam Buka
              </label>
              <input
                id="operating_hours_start"
                name="operating_hours_start"
                type="time"
                required
                value={formData.operating_hours_start}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.operating_hours_start ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.operating_hours_start && (
                <p className="mt-1 text-xs text-red-500">{errors.operating_hours_start}</p>
              )}
            </div>
            <div>
              <label htmlFor="operating_hours_end" className="block text-xs text-gray-600 mb-1">
                Jam Tutup
              </label>
              <input
                id="operating_hours_end"
                name="operating_hours_end"
                type="time"
                required
                value={formData.operating_hours_end}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.operating_hours_end ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.operating_hours_end && (
                <p className="mt-1 text-xs text-red-500">{errors.operating_hours_end}</p>
              )}
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Pilih jam buka dan jam tutup usaha Anda
          </p>
        </div>
      </div>
    </div>
  );
}
