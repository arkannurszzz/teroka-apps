'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';

import { useFetch } from '@/hooks/useFetch';
import { Umkm } from '@/types/umkm';

import Hero from './Hero';
import CategoryTabs from './CategoryTabs';
import Results from './Results';
import WhyTeroka from './WhyTeroka';
import FaqCompact from './FaqCompact';

type Category = 'semua' | 'makanan' | 'minuman' | 'jasa' | 'fashion';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('semua');
  const [locationEnabled, setLocationEnabled] = useState(false);

  const { data: umkmData, loading, error } = useFetch<Umkm[]>('/api/umkm');

  // Filter UMKM
  const filteredUmkm = useMemo(() => {
    if (!umkmData) return [];

    let filtered = umkmData;

    if (selectedCategory !== 'semua') {
      filtered = filtered.filter(
        (umkm) => umkm.category.toLowerCase() === selectedCategory
      );
    }

    const query = searchQuery.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter(
        (umkm) =>
          umkm.name.toLowerCase().includes(query) ||
          umkm.category.toLowerCase().includes(query) ||
          umkm.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [umkmData, selectedCategory, searchQuery]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Browser Anda tidak mendukung geolokasi');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        toast.success(`Lokasi: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setLocationEnabled(true);
      },
      () => {
        toast.error('Gagal mengakses lokasi');
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen">
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLocationClick={handleUseLocation}
      />
      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Results
        filteredUmkm={filteredUmkm}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        loading={loading}
        error={error}
        locationEnabled={locationEnabled}
      />

      <WhyTeroka />

      <FaqCompact />
    </div>
  );
}