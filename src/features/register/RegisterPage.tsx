'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FormProgress } from './components/FormProgress';
import { BasicInfoSection } from './components/BasicInfoSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { AdditionalInfoSection } from './components/AdditionalInfoSection';
import { ImportantNotes } from './components/ImportantNotes';
import {
  initialFormData,
  type UmkmFormData,
  type FormErrors,
  validateFormField,
  validateForm,
} from './types';

const STEPS = [
  { number: 1, title: 'Informasi Dasar', description: 'Nama & kategori UMKM' },
  { number: 2, title: 'Lokasi', description: 'Alamat lengkap' },
  { number: 3, title: 'Kontak', description: 'Telepon & jam operasional' },
  { number: 4, title: 'Informasi Tambahan', description: 'Detail & foto UMKM' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleWilayahChange = (field: 'province' | 'city' | 'district', id: string, name: string) => {
    if (field === 'province') {
      setFormData(prev => ({
        ...prev,
        province_id: id,
        province: name,
        // Reset city and district when province changes
        city_id: '',
        city: '',
        district: '',
      }));
    } else if (field === 'city') {
      setFormData(prev => ({
        ...prev,
        city_id: id,
        city: name,
        // Reset district when city changes
        district: '',
      }));
    } else if (field === 'district') {
      setFormData(prev => ({
        ...prev,
        district: name,
      }));
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

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

  const validateCurrentStep = (): boolean => {
    const stepFields: Record<number, (keyof UmkmFormData)[]> = {
      1: ['name', 'category', 'description'],
      2: ['province', 'city', 'district', 'address'],
      3: ['contact', 'operating_hours_start', 'operating_hours_end'],
      4: ['owner_name'], // established_year and employee_count are optional
    };

    const fieldsToValidate = stepFields[currentStep] || [];
    const stepErrors: FormErrors = {};

    fieldsToValidate.forEach(field => {
      const value = formData[field];
      const error = validateFormField(field, value);
      if (error) {
        stepErrors[field as keyof FormErrors] = error;
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Mohon lengkapi semua field yang wajib diisi dengan benar');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate entire form before submission
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Mohon lengkapi semua field yang wajib diisi dengan benar');
      // Jump to first step with errors
      const errorFields = Object.keys(validationErrors);
      if (errorFields.some(f => ['name', 'category', 'description'].includes(f))) {
        setCurrentStep(1);
      } else if (errorFields.some(f => ['province', 'city', 'district', 'address'].includes(f))) {
        setCurrentStep(2);
      } else if (errorFields.some(f => ['contact', 'operating_hours_start', 'operating_hours_end'].includes(f))) {
        setCurrentStep(3);
      }
      return;
    }

    setLoading(true);

    try {
      // Combine operating hours into single field
      const operatingHours = `${formData.operating_hours_start}-${formData.operating_hours_end}`;

      // Prepare data for submission
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
        setFormData(initialFormData);
        setErrors({});
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <LocationSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onWilayahChange={handleWilayahChange}
          />
        );
      case 3:
        return (
          <ContactSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );
      case 4:
        return (
          <AdditionalInfoSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onImageChange={handleImageChange}
          />
        );
      default:
        return null;
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
            {/* Progress Indicator */}
            <FormProgress
              currentStep={currentStep}
              totalSteps={STEPS.length}
              steps={STEPS}
            />

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Step Content */}
              <div className="mt-8 mb-8">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={currentStep === 1 ? () => router.back() : handlePrevious}
                  className="flex items-center gap-2"
                  disabled={loading}
                >
                  <ChevronLeft className="w-4 h-4" />
                  {currentStep === 1 ? 'Batal' : 'Sebelumnya'}
                </Button>

                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="min-w-[150px] bg-red-600 hover:bg-red-700"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Mendaftar...</span>
                      </div>
                    ) : (
                      'Daftarkan UMKM'
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <ImportantNotes />
        </div>
      </Container>
    </div>
  );
}
