'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { FormProgress } from './components/FormProgress';
import { BasicInfoSection } from './components/BasicInfoSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { AdditionalInfoSection } from './components/AdditionalInfoSection';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { ImportantNotes } from './components/ImportantNotes';
import {
  initialFormData,
  type UmkmFormData,
  type FormErrors,
  type ProductFormErrors,
  validateFormField,
  validateProductField,
  validateForm,
} from './types';

const STEPS = [
  { number: 1, title: 'Informasi Dasar', description: 'Nama & kategori UMKM' },
  { number: 2, title: 'Lokasi', description: 'Alamat lengkap' },
  { number: 3, title: 'Kontak', description: 'Telepon & jam operasional' },
  { number: 4, title: 'Produk Unggulan', description: 'Produk & harga' },
  { number: 5, title: 'Finalisasi UMKM', description: 'Detail & foto usaha' },
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
      const newErrors = { ...prev } as FormErrors;
      if (error) {
        (newErrors as Record<string, string>)[name] = error;
      } else {
        delete (newErrors as Record<string, string>)[name];
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

  const handleProductsChange = (products: typeof formData.featured_products) => {
    setFormData(prev => ({
      ...prev,
      featured_products: products
    }));
  };

  const handleProductError = (index: number, field: string, error: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      // Initialize featured_products array if it doesn't exist
      if (!newErrors.featured_products) {
        newErrors.featured_products = [];
      }
      // Initialize product error object if it doesn't exist
      if (!newErrors.featured_products[index]) {
        newErrors.featured_products[index] = {};
      }
      // Set or clear error
      if (error) {
        (newErrors.featured_products[index] as Record<string, string>)[field] = error;
      } else {
        delete (newErrors.featured_products[index] as Record<string, string>)[field];
        // Remove product error object if it's empty
        if (Object.keys(newErrors.featured_products[index]!).length === 0) {
          newErrors.featured_products.splice(index, 1);
        }
      }
      // Remove featured_products array if it's empty
      if (newErrors.featured_products.length === 0) {
        delete newErrors.featured_products;
      }
      return newErrors;
    });
  };

  const validateCurrentStep = (): boolean => {
    const stepFields: Record<number, (keyof UmkmFormData)[]> = {
      1: ['name', 'category', 'description'],
      2: ['province', 'city', 'district', 'address'],
      3: ['contact', 'operating_hours_start', 'operating_hours_end'],
      4: [], // Products are optional but should be validated if added
      5: ['owner_name'], // established_year and employee_count are optional
    };
    const fieldsToValidate = stepFields[currentStep] || [];
    const stepErrors: FormErrors = {};
    // Validate regular fields
    fieldsToValidate.forEach(field => {
      const value = formData[field];
      const error = validateFormField(field, value);
      if (error) {
        (stepErrors as Record<string, string>)[field] = error;
      }
    });
    // Validate products if on step 4
    if (currentStep === 4 && formData.featured_products.length > 0) {
      const productErrors: typeof errors.featured_products = [];
      formData.featured_products.forEach((product, index) => {
        const productError: ProductFormErrors = {};
        Object.keys(product).forEach((field) => {
          const error = validateProductField(field, product[field as keyof typeof product]);
          if (error) {
            (productError as Record<string, string>)[field] = error;
          }
        });
        if (Object.keys(productError).length > 0) {
          productErrors[index] = productError;
        }
      });
      if (productErrors.length > 0) {
        stepErrors.featured_products = productErrors;
      }
    }
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
      } else if (errors.featured_products && errors.featured_products.length > 0) {
        setCurrentStep(4);
      } else if (errorFields.some(f => ['owner_name', 'established_year', 'employee_count', 'image'].includes(f))) {
        setCurrentStep(5);
      }
      return;
    }
    setLoading(true);
    try {
      // Combine operating hours into single field
      const operatingHours = `${formData.operating_hours_start}-${formData.operating_hours_end}`;
      // Upload image to Supabase Storage if provided (LANGSUNG DI CLIENT)
      let imageUrl = '';
      if (formData.image instanceof File) {
        if (!isSupabaseConfigured || !supabase) {
          toast.error('Supabase tidak dikonfigurasi. Foto tidak dapat diupload.');
          return;
        }
        try {
          console.log('📤 Uploading image via API (bypass RLS):', {
            fileName: formData.image.name,
            fileSize: formData.image.size,
            fileType: formData.image.type
          });
          // Upload via API yang menggunakan service role (bypass RLS)
          const uploadFormData = new FormData();
          uploadFormData.append('file', formData.image);
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData
          });
          const uploadResult = await response.json();
          if (!uploadResult.success) {
            console.error('❌ Upload error:', uploadResult.error);
            toast.error(uploadResult.error || 'Gagal mengupload foto. Silakan coba lagi.');
            return; // Stop submit kalau upload gagal
          }
          console.log('✅ Upload successful:', uploadResult);
          imageUrl = uploadResult.url;
          console.log('🔗 Image URL:', imageUrl);
        } catch (error) {
          console.error('❌ Upload API error:', error);
          toast.error('Gagal mengupload foto. Silakan coba lagi.');
          return;
        }
      }
      // Upload product images
      const productsWithUrls = await Promise.all(
        formData.featured_products.map(async (product) => {
          let productImageUrl = '';
          if (product.image instanceof File) {
            try {
              console.log('📤 Uploading product image:', product.image.name);
              const uploadFormData = new FormData();
              uploadFormData.append('file', product.image);
              const response = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
              });
              const uploadResult = await response.json();
              if (uploadResult.success) {
                productImageUrl = uploadResult.url;
                console.log('✅ Product image uploaded:', productImageUrl);
              } else {
                console.error('❌ Product image upload failed:', uploadResult.error);
                // Continue without image - product can be updated later
              }
            } catch (error) {
              console.error('❌ Product image upload error:', error);
              // Continue without image
            }
          }
          return {
            name: product.name,
            description: product.description,
            price: parseInt(product.price.replace(/\D/g, '')),
            image: productImageUrl,
            is_available: true
          };
        })
      );
      // Prepare data for submission
      const dataToSubmit = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        province_id: formData.province_id || null,
        province: formData.province,
        city_id: formData.city_id || null,
        city: formData.city,
        district: formData.district || null,
        latitude: 0,
        longitude: 0,
        contact: formData.contact,
        operating_hours: operatingHours,
        owner_name: formData.owner_name,
        established_year: formData.established_year ? parseInt(formData.established_year) : null,
        employee_count: formData.employee_count ? parseInt(formData.employee_count) : 0,
        image: imageUrl,
        products: productsWithUrls, // Add products to submission
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
          <FeaturedProductsSection
            products={formData.featured_products}
            errors={errors.featured_products}
            onChange={handleProductsChange}
            onError={handleProductError}
          />
        );
      case 5:
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
    <div className="bg-linear-to-b from-red-50 to-white">
      <Container>
        <div className="max-w-3xl mx-auto pt-24 pb-8 md:pt-28 md:pb-12"> {/* Increased top padding a bit more: pt-24 md:pt-28 */}
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Daftarkan UMKM Anda
            </h1>
            <p className="text-base md:text-lg text-gray-600">
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
                {currentStep !== 5 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                  >
                    {currentStep === 4 ? 'Lanjut ke Info Tambahan' : 'Selanjutnya'}
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
                        <span>Mendaftarkan UMKM...</span>
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