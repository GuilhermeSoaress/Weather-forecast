import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const searchCities = async (query, limit = 5) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit,
        appid: API_KEY,
      },
    });

    return response.data.map((city) => ({
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      displayName: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`,
    }));
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return [];
  }
};
