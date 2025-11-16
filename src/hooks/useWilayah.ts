import { useState, useEffect } from 'react';

// Types for wilayah.id API
export interface Province {
  id: string;
  name: string;
}

export interface Regency {
  id: string;
  province_id: string;
  name: string;
}

export interface District {
  id: string;
  regency_id: string;
  name: string;
}

// Static fallback data
const STATIC_PROVINCES: Province[] = [
  { id: '11', name: 'Aceh' },
  { id: '12', name: 'Sumatera Utara' },
  { id: '13', name: 'Sumatera Barat' },
  { id: '14', name: 'Riau' },
  { id: '15', name: 'Jambi' },
  { id: '16', name: 'Sumatera Selatan' },
  { id: '17', name: 'Bengkulu' },
  { id: '18', name: 'Lampung' },
  { id: '19', name: 'Kepulauan Bangka Belitung' },
  { id: '21', name: 'Kepulauan Riau' },
  { id: '31', name: 'DKI Jakarta' },
  { id: '32', name: 'Jawa Barat' },
  { id: '33', name: 'Jawa Tengah' },
  { id: '34', name: 'DI Yogyakarta' },
  { id: '35', name: 'Jawa Timur' },
  { id: '36', name: 'Banten' },
  { id: '51', name: 'Bali' },
  { id: '52', name: 'Nusa Tenggara Barat' },
  { id: '53', name: 'Nusa Tenggara Timur' },
  { id: '61', name: 'Kalimantan Barat' },
  { id: '62', name: 'Kalimantan Tengah' },
  { id: '63', name: 'Kalimantan Selatan' },
  { id: '64', name: 'Kalimantan Timur' },
  { id: '65', name: 'Kalimantan Utara' },
  { id: '71', name: 'Sulawesi Utara' },
  { id: '72', name: 'Sulawesi Tengah' },
  { id: '73', name: 'Sulawesi Selatan' },
  { id: '74', name: 'Sulawesi Tenggara' },
  { id: '75', name: 'Gorontalo' },
  { id: '76', name: 'Sulawesi Barat' },
  { id: '81', name: 'Maluku' },
  { id: '82', name: 'Maluku Utara' },
  { id: '91', name: 'Papua Barat' },
  { id: '94', name: 'Papua' }
];

const BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api';

// Hook to fetch provinces
export function useProvinces() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProvinces() {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/provinces.json`);
        if (!response.ok) throw new Error('Failed to fetch provinces');
        const data: Province[] = await response.json();
        setProvinces(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch provinces');
        setProvinces([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProvinces();
  }, []);

  return { provinces, loading, error };
}

// Hook to fetch regencies (cities) by province
export function useRegencies(provinceId: string | null) {
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provinceId) {
      setRegencies([]);
      return;
    }

    async function fetchRegencies() {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/regencies/${provinceId}.json`);
        if (!response.ok) throw new Error('Failed to fetch regencies');
        const data: Regency[] = await response.json();
        setRegencies(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch regencies');
        setRegencies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRegencies();
  }, [provinceId]);

  return { regencies, loading, error };
}

// Hook to fetch districts by regency
export function useDistricts(regencyId: string | null) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!regencyId) {
      setDistricts([]);
      return;
    }

    async function fetchDistricts() {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/districts/${regencyId}.json`);
        if (!response.ok) throw new Error('Failed to fetch districts');
        const data: District[] = await response.json();
        setDistricts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch districts');
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDistricts();
  }, [regencyId]);

  return { districts, loading, error };
}
