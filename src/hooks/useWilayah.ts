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
