import { useCallback, useEffect } from 'react';

import {
  useGeolocation,
  useLocationSearch,
  useLocationStore,
} from '@/features/location';
import { useWeather, useWeatherStore } from '@/features/weather';

export const useWeatherDashboard = () => {
  useGeolocation();
  const { searchCity } = useLocationSearch();
  const coords = useLocationStore((state) => state.coords);
  const cityName = useLocationStore((state) => state.cityName);
  const locationError = useLocationStore((state) => state.error);

  const { fetchByCity, fetchByCoords } = useWeather();
  const currentWeather = useWeatherStore((state) => state.currentWeather);
  const forecast = useWeatherStore((state) => state.forecast);
  const isLoading = useWeatherStore((state) => state.isLoading);
  const weatherError = useWeatherStore((state) => state.error);

  useEffect(() => {
    if (coords) {
      fetchByCoords(coords.lat, coords.lon);
    }
  }, [coords, fetchByCoords]);

  const handleCitySearch = useCallback(
    async (city) => {
      try {
        const validatedCity = searchCity(city);
        await fetchByCity(validatedCity);
      } catch (error) {
        console.error('Erro ao buscar cidade:', error);
      }
    },
    [searchCity, fetchByCity]
  );

  return {
    cityName,
    currentWeather,
    forecast,
    isLoading,
    coords,
    hasError: weatherError || locationError,
    handleCitySearch,
  };
};
