'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { toast } from 'sonner';
import { BasicInfoSection } from './components/BasicInfoSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { AdditionalInfoSection } from './components/AdditionalInfoSection';
import { FormActions } from './components/FormActions';
import { ImportantNotes } from './components/ImportantNotes';
import {
  initialFormData,
  type UmkmFormData,
  type FormErrors,
  validateFormField,
  validateForm,
  isFormValid
} from './types';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UmkmFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field in real-time
    const error = validateFormField(name, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name as keyof FormErrors] = error;
      } else {
        delete newErrors[name as keyof FormErrors];
      }
      return newErrors;
    });
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      // Update form data
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Validate image file
      const error = validateFormField('image', file);
      setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
          newErrors.image = error;
        } else {
          delete newErrors.image;
        }
        return newErrors;
      });
    } else {
      // Clear image
      setFormData(prev => ({
        ...prev,
        image: ''
      }));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate entire form before submission
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Mohon lengkapi semua field yang wajib diisi dengan benar');
      return;
    }

    setLoading(true);

    try {
      // Combine operating hours into single field
      const operatingHours = `${formData.operating_hours_start}-${formData.operating_hours_end}`;

      // Prepare data for submission
      // Note: For now, we're not uploading the actual file to Supabase Storage
      // That would require additional implementation with Supabase Storage API
      const dataToSubmit = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        contact: formData.contact,
        operating_hours: operatingHours,
        owner_name: formData.owner_name,
        established_year: formData.established_year ? parseInt(formData.established_year) : null,
        employee_count: formData.employee_count ? parseInt(formData.employee_count) : 0,
        // TODO: Implement file upload to Supabase Storage
        image: typeof formData.image === 'string' ? formData.image : '',
      };

      const response = await fetch('/api/umkm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        // Reset form and errors
        setFormData(initialFormData);
        setErrors({});
        // Redirect to search page after 2 seconds
        setTimeout(() => {
          router.push('/search');
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Daftarkan UMKM Anda
            </h1>
            <p className="text-lg text-gray-600">
              Bergabunglah dengan Teroka dan tingkatkan visibilitas bisnis Anda
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <BasicInfoSection
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
              <LocationSection
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
              <ContactSection
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
              <AdditionalInfoSection
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onImageChange={handleImageChange}
              />
              <FormActions
                loading={loading}
                isValid={isFormValid(formData, errors)}
                onCancel={() => router.back()}
              />
            </form>
          </div>

          <ImportantNotes />
        </div>
      </Container>
    </div>
  );
}
