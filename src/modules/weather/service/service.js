import apiClient from '@/core/api/client';

export const getWeatherByCoords = async (lat, lon) => {
  const response = await apiClient.get('/weather', {
    params: { lat, lon },
  });
  return response.data;
};

export const getWeatherByCity = async (cityName) => {
  const response = await apiClient.get('/weather', {
    params: { q: cityName },
  });
  return response.data;
};
