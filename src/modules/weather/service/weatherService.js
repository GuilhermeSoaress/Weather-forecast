import apiConfig from '@/shared/service/apiConfig';

export const getWeatherByCoords = async (lat, lon) => {
  const response = await apiConfig.get('/weather', {
    params: { lat, lon },
  });
  return response.data;
};

export const getWeatherByCity = async (cityName) => {
  const response = await apiConfig.get('/weather', {
    params: { q: cityName },
  });
  return response.data;
};
