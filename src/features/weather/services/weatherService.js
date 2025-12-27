import apiConfig from '@/shared/config/apiConfig';

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

export const getForecastByCoords = async (lat, lon) => {
  const response = await apiConfig.get('/forecast', {
    params: { lat, lon },
  });
  return response.data;
};

export const getForecastByCity = async (cityName) => {
  const response = await apiConfig.get('/forecast', {
    params: { q: cityName },
  });
  return response.data;
};
