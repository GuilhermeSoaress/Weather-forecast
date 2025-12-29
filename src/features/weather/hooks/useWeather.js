import { useCallback } from 'react';

import {
  getForecastByCity,
  getForecastByCoords,
  getWeatherByCity,
  getWeatherByCoords,
} from '../services/weatherService';
import { useWeatherStore } from '../store/weatherStore';
import { useToastStore } from '@/shared/store/toastStore';

export const useWeather = () => {
  const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather);
  const setForecast = useWeatherStore((state) => state.setForecast);
  const setLoading = useWeatherStore((state) => state.setLoading);
  const setError = useWeatherStore((state) => state.setError);
  const addToast = useToastStore((state) => state.addToast);

  const fetchByCity = useCallback(
    async (city) => {
      try {
        setLoading(true);
        setError(null);
        const [weatherData, forecastData] = await Promise.all([
          getWeatherByCity(city),
          getForecastByCity(city),
        ]);
        setCurrentWeather(weatherData);
        setForecast(forecastData);
        return weatherData;
      } catch (err) {
        const errorMsg = 'Cidade não encontrada. Tente novamente.';
        setError(errorMsg);
        addToast(errorMsg, 'error');
        throw new Error(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setCurrentWeather, setForecast, addToast]
  );

  const fetchByCoords = useCallback(
    async (lat, lon) => {
      try {
        setLoading(true);
        setError(null);
        const [weatherData, forecastData] = await Promise.all([
          getWeatherByCoords(lat, lon),
          getForecastByCoords(lat, lon),
        ]);
        setCurrentWeather(weatherData);
        setForecast(forecastData);
        return weatherData;
      } catch (err) {
        const errorMsg = 'Falha ao buscar dados do clima';
        setError(errorMsg);
        addToast(errorMsg, 'error');
        throw new Error(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setCurrentWeather, setForecast, addToast]
  );

  return { fetchByCity, fetchByCoords };
};
