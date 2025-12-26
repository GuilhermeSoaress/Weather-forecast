import { useCallback } from 'react';

import {
  getWeatherByCity,
  getWeatherByCoords,
} from '../services/weatherService';
import { useWeatherStore } from '../store/weatherStore';

export const useWeather = () => {
  const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather);
  const setLoading = useWeatherStore((state) => state.setLoading);
  const setError = useWeatherStore((state) => state.setError);

  const fetchByCity = useCallback(
    async (city) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherByCity(city);
        setCurrentWeather(data);
        return data;
      } catch (err) {
        const errorMsg = 'Cidade não encontrada. Tente novamente.';
        setError(errorMsg);
        throw new Error(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setCurrentWeather]
  );

  const fetchByCoords = useCallback(
    async (lat, lon) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherByCoords(lat, lon);
        setCurrentWeather(data);
        return data;
      } catch (err) {
        const errorMsg = 'Falha ao buscar dados do clima';
        setError(errorMsg);
        throw new Error(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setCurrentWeather]
  );

  return { fetchByCity, fetchByCoords };
};
