import { useEffect } from 'react';

import { CitySuggestions } from './modules/location/components/CitySuggestions';
import { SearchBar } from './modules/location/components/SearchBar';
import {
  getWeatherByCity,
  getWeatherByCoords,
} from './modules/location/service/service';
import { useLocationStore } from './modules/location/store/store';
import { CurrentWeather } from './modules/weather/components/CurrentWeather';
import { useWeatherStore } from './modules/weather/store';
import { useGeolocation } from './shared/hooks/useGeolocation';
import { useUIStore } from './shared/store/ui';

function App() {
  useGeolocation();

  const coords = useLocationStore((state) => state.coords);
  const cityName = useLocationStore((state) => state.cityName);
  const setCityName = useLocationStore((state) => state.setCityName);
  const current = useWeatherStore((state) => state.current);
  const setCurrent = useWeatherStore((state) => state.setCurrent);
  const isLoading = useUIStore((state) => state.isLoading);
  const error = useUIStore((state) => state.error);
  const setLoading = useUIStore((state) => state.setLoading);
  const setError = useUIStore((state) => state.setError);

  const handleCitySearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherByCity(city);
      setCityName(data.name);
      setCurrent(data);
      setLoading(false);
    } catch (err) {
      setError('Cidade não encontrada. Tente novamente.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coords) {
      const fetchWeather = async () => {
        try {
          setLoading(true);
          const data = await getWeatherByCoords(coords.lat, coords.lon);
          setCityName(data.name);
          setCurrent(data);
          setLoading(false);
        } catch (err) {
          setError('Falha ao buscar dados do clima');
          setLoading(false);
        }
      };
      fetchWeather();
    }
  }, [coords, setLoading, setError, setCityName, setCurrent]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-xl font-medium text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error && !coords) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-5xl font-bold text-white drop-shadow-lg">
            SkyCast
          </h1>
          <p className="text-lg text-white/80">
            Previsão do tempo em tempo real
          </p>
        </div>
        <SearchBar onSearch={handleCitySearch} />
        <CitySuggestions onCitySelect={handleCitySearch} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-5xl font-bold text-white drop-shadow-lg">
          SkyCast
        </h1>
        {cityName && (
          <p className="text-xl font-medium text-white/90">{cityName}</p>
        )}
      </div>

      <div className="mb-6 w-full max-w-md">
        <SearchBar onSearch={handleCitySearch} />
      </div>

      {current && <CurrentWeather data={current} />}
    </div>
  );
}

export default App;
