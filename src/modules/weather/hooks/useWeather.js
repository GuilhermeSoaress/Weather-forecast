import { useCallback } from 'react';

import { useLocationStore } from '@/modules/location/store/locationStore';
import { useWeatherStore } from '../store/weatherStore';
import { useUIStore } from '@/shared/store/ui';
import { getWeatherByCity, getWeatherByCoords } from '../service/weatherService';

export const useWeather = () => {
  const setCityName = useLocationStore((state) => state.setCityName);
  const setCurrentWeather = useWeatherStore((state) => state.setCurrent);
  const setLoading = useUIStore((state) => state.setLoading);
  const setError = useUIStore((state) => state.setError);

  const fetchWeather = useCallback(
    async (data) => {
      setCityName(data.name);
      setCurrentWeather(data);
    },
    [setCityName, setCurrentWeather],
  );

  const fetchByCity = useCallback(
    async (city) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherByCity(city);
        await fetchWeather(data);
      } catch (err) {
        setError('Cidade não encontrada. Tente novamente.');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, fetchWeather],
  );

  const fetchByCoords = useCallback(
    async (lat, lon) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherByCoords(lat, lon);
        await fetchWeather(data);
      } catch (err) {
        setError('Falha ao buscar dados do clima');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, fetchWeather],
  );

  return { fetchByCity, fetchByCoords };
};
